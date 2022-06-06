using System.ComponentModel.DataAnnotations;

namespace Algorhythm.Api.Dtos
{
    public class LoginUserDto
    {
        [Required(ErrorMessage = "Informe o e-mail")]
        [EmailAddress(ErrorMessage = "E-mail inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe a senha")]
        [StringLength(100, ErrorMessage = "O campo senha precisa ter entre {2} e {1} caracteres", MinimumLength = 6)]
        public string Password { get; set; }
    }
}

