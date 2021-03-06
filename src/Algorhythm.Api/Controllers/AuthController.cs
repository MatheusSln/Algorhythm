using Algorhythm.Api.Dtos;
using Algorhythm.Api.Extensions;
using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Algorhythm.Api.Controllers
{
    [Authorize]
    [Route("api")]
    public class AuthController : MainController
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IEmailSender _emailSender;
        private readonly AppSettings _appSettings;
        public AuthController(INotifier notifier,
                              SignInManager<IdentityUser> signInManager,
                              UserManager<IdentityUser> userManager,
                              IOptions<AppSettings> appSettings,
                              IUserRepository userRepository,
                              IUserService userService,
                              IMapper mapper,
                              IEmailSender emailSender) :
            base(notifier)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
            _userService = userService;
            _mapper = mapper;
            _emailSender = emailSender;
        }

        [AllowAnonymous]
        [HttpPost("nova-conta")]
        public async Task<ActionResult> Register(RegisterUserDto registerUser)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            var user  = await _userRepository.GetUserAndExercisesByEmail(registerUser.Email);

            if (user is not null)
            {
                NotifyError("E-mail já vinculado a uma conta previamente cadastrada");
                return CustomResponse(registerUser);
            }

            var identityUser = new IdentityUser
            {
                UserName = registerUser.Email,
                Email = registerUser.Email,
            };
            
            var result = await _userManager.CreateAsync(identityUser, registerUser.Password);
           
            if (result.Succeeded)
            {
                registerUser.Level = Business.Enum.Level.Introduction;
                await _userService.Add(_mapper.Map<User>(registerUser));
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
                var tokenHtmlUrlVersion = HttpUtility.UrlEncode(token);
                var confirmationLink = string.Format("http://127.0.0.1:4200/account/confirm/{0}/{1}", tokenHtmlUrlVersion, registerUser.Email);

                await _emailSender.SendEmailAsync(registerUser.Email, "Link de Confirmação", "Clique aqui para confirmar seu e-mail: " + confirmationLink);

                return CustomResponse(registerUser);
            }
            foreach (var erro in result.Errors)
            {
                NotifyError(erro.Description);
            }

            return CustomResponse(registerUser);
        }

        [AllowAnonymous]
        [HttpPost("entrar")]
        public async Task<ActionResult> Login(LoginUserDto loginUser)
        {            

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var user = await _userRepository.GetUserAndExercisesByEmail(loginUser.Email);

            if (user is not null && user.BlockedAt.HasValue)
            {
                NotifyError("Usuário bloqueado por tempo indefinido.");
                return CustomResponse(loginUser);
            }

            var identityUser = await _userManager.FindByEmailAsync(loginUser.Email);

            if (identityUser is null)
            {
                NotifyError("Usuário não encontrado");
                return CustomResponse(loginUser);
            }

            bool emailConfirmed = await _userManager.IsEmailConfirmedAsync(identityUser);

            if (!emailConfirmed)
            {
                NotifyError("Você precisa confirmar seu email antes de entrar");
                return CustomResponse(loginUser);
            }

            var result = await _signInManager.PasswordSignInAsync(identityUser, loginUser.Password, false, true);

            if (result.Succeeded)
                return CustomResponse(await GerarJwt(loginUser.Email));

            if (result.IsLockedOut)
            {
                NotifyError("Usuário temporariamente bloqueado por tentativas inválidas");
                return CustomResponse(loginUser);
            }

            NotifyError("Usuário ou Senha incorretos");
            return CustomResponse(loginUser);
        }

        [HttpGet("refreshtoken")]
        public async Task<ActionResult> RefreshToken(string userEmail, Guid userId)
        {

            if (userEmail == null)
            {
                NotifyError("e-mail não pode ser nulo");
                return CustomResponse();
            }

            var user = await _userRepository.GetUserAndExercisesByEmail(userEmail);

            if (user is null)
            {
                NotifyError("Usuário não encontrado");
                return CustomResponse(userEmail);
            }

            if (userId != user.Id)
                return BadRequest();

            var loginToken = await GerarJwt(userEmail);

            return CustomResponse(loginToken);
        }

        private async Task<LoginResponseDto> GerarJwt(string email)
        {
            var aspNetUser = await _userManager.FindByEmailAsync(email);
            var claims = await _userManager.GetClaimsAsync(aspNetUser);
            var userRoles = await _userManager.GetRolesAsync(aspNetUser);

            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, aspNetUser.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64));

            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim("role", userRole));
            }

            var user = await _userRepository.GetUserAndExercisesByEmail(email);

            claims.Add(new Claim("level", ((int)user.Level).ToString()));

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaims(claims);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _appSettings.Issuer,
                Audience = _appSettings.ValidOn,
                Subject = identityClaims,
                Expires = DateTime.UtcNow.AddHours(_appSettings.ExpirationHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            });

            var encodedToken = tokenHandler.WriteToken(token);

            var response = new LoginResponseDto
            {
                AccessToken = encodedToken,
                ExpiresIn = TimeSpan.FromHours(_appSettings.ExpirationHours).TotalSeconds,
                UserToken = new UserTokenDto
                {
                    Id = user.Id.ToString(),
                    AspNetId = aspNetUser.Id,
                    Email = aspNetUser.Email,
                    Name = user.Name,
                    BirthDate = user.BirthDate.ToString("yyyy-MM-dd"),
                    Claims = claims.Select(c => new ClaimDto { Type = c.Type, Value = c.Value })
                }
            };

            return response;
        }

        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
    }
}
