using System;
using System.ComponentModel.DataAnnotations;

namespace Algorhythm.Api.Dtos
{
    public class ExerciseAnswerDto
    {
        public string answer { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public Guid ExerciseId { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public Guid UserId { get; set; }
    }
}
