using Algorhythm.Business.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace Algorhythm.Api.Dtos.User
{
    public class UserDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Informe o e-mail")]
        [EmailAddress(ErrorMessage = "E-mail inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        [StringLength(150, ErrorMessage = "O campo nome precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo idade é obrigatório")]
        public DateTime BirthDate { get; set; }

        public string Birth { get; set; }

        public Level Level { get; set; }
    }
}
