using static Algorhythm.Api.Dtos.RegisterUserDto;

namespace Algorhythm.Api.Dtos
{
    public class LoginResponseDto
    {
        public string AccessToken { get; set; }
        public double ExpiresIn { get; set; }
        public UserTokenDto UserToken { get; set; }
    }
}
