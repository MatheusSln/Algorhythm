using Algorhythm.Business.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace Algorhythm.Api.Dtos
{
    public class RegisterUserDto
    {
        [Required(ErrorMessage = "Informe o e-mail")]
        [EmailAddress(ErrorMessage = "E-mail inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        [StringLength(150, ErrorMessage = "O campo nome precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo idade é obrigatório")]
        public DateTime BirthDate { get; set; }

        [Required(ErrorMessage = "Informe a senha")]
        [StringLength(100, ErrorMessage = "O campo senha precisa ter entre {2} e {1} caracteres", MinimumLength = 6)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "As senhas não conferem.")]
        public string ConfirmPassword { get; set; }

        public Level Level { get; set; }
    }
}
