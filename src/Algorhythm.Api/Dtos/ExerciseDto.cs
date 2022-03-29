using Algorhythm.Business.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Algorhythm.Api.Dtos
{
    public class ExerciseDto
    {
        [Key]
        public string Id { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public int ModuleId { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        [StringLength(300, ErrorMessage = "Este campo precisa ter no entre {2} e {1} caracteres", MinimumLength = 10)]
        public string Question { get; set; }

        public List<string> Alternatives { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public string CorrectAlternative { get; set; }

        public int Level { get; set; }

        public List<AlternativeDto> AlternativesUpdate { get; set; }
    }
}
