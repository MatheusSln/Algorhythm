using Algorhythm.Api.Dtos;
using Algorhythm.Api.Extensions;
using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Algorhythm.Api.Controllers
{
    [Route("api/user")]
    public class UserController : MainController
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly AppSettings _appSettings;
        public UserController(INotifier notifier,
                              SignInManager<IdentityUser> signInManager,
                              UserManager<IdentityUser> userManager,
                              IOptions<AppSettings> appSettings,
                              IUserRepository userRepository,
                              IUserService userService, 
                              IMapper mapper) :
            base(notifier)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPut]
        private async Task<ActionResult> UpdateUser(RegisterUserDto userDto)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);
            
            var identityUser = new IdentityUser
            {
                UserName = userDto.Email,
                Email = userDto.Email,
                EmailConfirmed = true
            };
            var token = await _userManager.GenerateChangeEmailTokenAsync(identityUser, userDto.Email);

            var result = await _userManager.ChangeEmailAsync(identityUser,userDto.Email, token);

            if (result.Succeeded)
            {
                await _userService.Update(_mapper.Map<User>(userDto));

                return CustomResponse(await GerarJwt(userDto.Email));
            }

            foreach (var erro in result.Errors)
            {
                NotifyError(erro.Description);
            }

            return CustomResponse(userDto);
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

            claims.Add(new Claim("level", user.Level.ToString()));

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
                    Id = aspNetUser.Id,
                    Email = aspNetUser.Email,
                    Name = user.Name,
                    Claims = claims.Select(c => new ClaimDto { Type = c.Type, Value = c.Value })
                }
            };

            return response;
        }

        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
    }
}
