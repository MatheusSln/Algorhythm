using Algorhythm.Api.Dtos;
using Algorhythm.Api.Dtos.User;
using Algorhythm.Api.Extensions;
using Algorhythm.Business.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Algorhythm.Api.Controllers
{
    [Route("api/user")]
    public class UserController : MainController
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IEmailSender _emailSender;
        private readonly AppSettings _appSettings;

        public UserController(INotifier notifier,
                              SignInManager<IdentityUser> signInManager,
                              UserManager<IdentityUser> userManager,
                              IOptions<AppSettings> appSettings,
                              IUserRepository userRepository,
                              IUserService userService,
                              IMapper mapper,
                              IEmailSender emailSender) :
            base(notifier)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
            _userService = userService;
            _mapper = mapper;
            _emailSender = emailSender;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDto>> GetAll()
        {
            var users = _mapper.Map<IEnumerable<UserDto>>(await _userRepository.GetAllValidUsers());

            return users;
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<UserDto>> GetById([FromRoute] Guid id)
        {
            var user = _mapper.Map<UserDto>(await _userRepository.GetById(id));

            if (user is null)
                return NotFound();

            user.Birth = user.BirthDate.ToString("yyyy-MM-dd");

            return user;
        }

        [HttpPut("block")]
        public async Task<ActionResult> BlockUser(UpdateUserDto userDto)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            var user = await _userRepository.GetById(userDto.Id);

            if (user == null)
                return NotFound();

            user.BlockedAt = DateTime.Now;

            await _userService.Update(user);

            return CustomResponse(userDto);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(UpdateUserDto userDto)
        {
            if (!ModelState.IsValid) 
                return CustomResponse(ModelState);
            
            var user = await _userRepository.GetById(userDto.Id);

            if (user == null)
                return NotFound();

            if (!user.Email.Equals(userDto.Email))
            {
                var identityUser = await _userManager.FindByEmailAsync(user.Email);

                identityUser.UserName = userDto.Email;

                await _userManager.UpdateAsync(identityUser);

                var token = await _userManager.GenerateChangeEmailTokenAsync(identityUser, userDto.Email);

                var result = await _userManager.ChangeEmailAsync(identityUser, userDto.Email, token);

                if (!result.Succeeded)
                {
                    foreach (var erro in result.Errors)
                    {
                        NotifyError(erro.Description);
                    }

                    return CustomResponse(userDto);
                }
            }

            user.Name = userDto.Name;
            user.Email = userDto.Email;
            user.BirthDate = userDto.BirthDate;

            await _userService.Update(user);

            return CustomResponse(await GerarJwt(userDto.Email));
        }

        [Route("confirm")]
        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            if (token is null || email is null)
            {
                NotifyError("parâmetros inválidos");
                return CustomResponse(false);
            }

            string validToken = GetValidToken(token);

            var user = await _userManager.FindByEmailAsync(email);

            var result = await _userManager.ConfirmEmailAsync(user, validToken);

            if (result.Succeeded)
            {
                return CustomResponse(true);
            }

            foreach (var error in result.Errors)
            {
                NotifyError(error.Description);
            }

            return CustomResponse();
        }
        
        [Route("changepassword")]
        [HttpPost]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordDto dto)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            if (dto.Token is null)
                return BadRequest();

            string validToken = GetValidToken(dto.Token);

            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
                return NotFound("Usuário não encontrado");

            var result = await _userManager.ResetPasswordAsync(user, validToken, dto.Password);

            if (result.Succeeded)
            {
                return CustomResponse(true);
            }

            foreach (var error in result.Errors)
            {
                NotifyError(error.Description);
            }

            return CustomResponse();
        }

        [Route("resetSend")]
        [HttpPost()]
        public async Task<IActionResult> SendPasswordResetEmail([FromBody] string email)
        {
            if (email is null)
            {
                NotifyError("e-mail não pode ser nulo");
                return CustomResponse();
            }

            var user = await _userManager.FindByEmailAsync(email);

            if(user is null)
            {
                NotifyError("Nenhum usuário encontrado com o e-mail informado");
                return CustomResponse();
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var urlToken = HttpUtility.UrlEncode(token);

            var resetPasswordLink = string.Format("http://127.0.0.1:4200/account/reset/{0}/{1}", urlToken, user.Email);

             await _emailSender.SendEmailAsync(user.Email, "Recuperação de senha", "Clique aqui para trocar sua senha: " + resetPasswordLink);

            return CustomResponse();
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

        private string GetValidToken(string token)  => HttpUtility.UrlDecode(token).Replace(" ", "+");

        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
    }
}
