using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Algorhythm.Business.Models.Validations
{
    public class AlternativeValidation : AbstractValidator<Alternative>
    {
        public AlternativeValidation()
        {
            RuleFor(f => f.Title)
                .NotEmpty().WithMessage("O campo Título precisa ser preenchido")
                .Length(1, 100).WithMessage("O campo Título precisa ter entre {MinLength} e {MaxLength} caracteres");
        }
    }
}
