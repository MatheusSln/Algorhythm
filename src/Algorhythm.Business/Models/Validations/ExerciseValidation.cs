using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Algorhythm.Business.Models.Validations
{
    public class ExerciseValidation : AbstractValidator<Exercise>
    {
        public ExerciseValidation()
        {
            RuleFor(f => f.Question)
                .NotEmpty().WithMessage("O campo Questão precisa ser preenchido")
                .Length(10, 300).WithMessage("O campo Questão precisa ter entre {MinLength} e {MaxLength} caracteres");
        }
    }
}
