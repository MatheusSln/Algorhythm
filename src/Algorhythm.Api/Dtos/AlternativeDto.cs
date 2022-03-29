using System;
using System.ComponentModel.DataAnnotations;

namespace Algorhythm.Api.Dtos
{
    public class AlternativeDto
    {
        [Key]
        public Guid Id { get; set; }

        public Guid ExerciseId { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        [StringLength(100, ErrorMessage = "Este campo precisa ter no entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Title { get; set; }
    }
}
