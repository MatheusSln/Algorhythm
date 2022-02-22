using System.Collections.Generic;
using static Algorhythm.Api.Dtos.RegisterUserDto;

namespace Algorhythm.Api.Dtos
{
    public class UserTokenDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public IEnumerable<ClaimDto> Claims { get; set; }
    }
}
