using FluentValidation;

namespace Algorhythm.Business.Models.Validations
{
    public class UserValidation : AbstractValidator<User>
    {
        public UserValidation()
        {
            RuleFor(f => f.Name)
                .NotEmpty().WithMessage("O campo nome precisa ser preenchido")
                .Length(2, 150).WithMessage("O campo nome precisa ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(e => e.Email)
                .NotEmpty().WithMessage("o campo e-mail precisa ser preenchido");

        }
    }
}
