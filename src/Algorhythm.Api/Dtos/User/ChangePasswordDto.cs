using System.ComponentModel.DataAnnotations;

namespace Algorhythm.Api.Dtos.User
{
    public class ChangePasswordDto
    {
        [Required(ErrorMessage = "Informe o e-mail")]
        [EmailAddress(ErrorMessage = "E-mail inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe a senha")]
        [StringLength(14, ErrorMessage = "O campo senha precisa ter entre {2} e {1} caracteres", MinimumLength = 6)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "As senhas não conferem.")]
        public string ConfirmPassword { get; set; }

        public string Token { get; set; }

    }
}
