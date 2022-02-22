using System.ComponentModel.DataAnnotations;

namespace Algorhythm.Api.Dtos
{
    public class LoginUserDto
    {
        [Required(ErrorMessage = "O campo e-mail é obrigatório")]
        [EmailAddress(ErrorMessage = "O campo e-mail está em formato inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [StringLength(100, ErrorMessage = "O campo senha precisa ter entre {2} e {1} caracteres", MinimumLength = 6)]
        public string Password { get; set; }
    }
}

