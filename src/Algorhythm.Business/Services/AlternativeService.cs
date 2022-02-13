using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Business.Models.Validations;
using System;
using System.Threading.Tasks;

namespace Algorhythm.Business.Services
{
    public class AlternativeService : BaseService, IAlternativeService
    {
        private readonly IAlternativeRepository _alternativeRepository;

        protected AlternativeService(INotificador notificador, IAlternativeRepository alternativeRepository) :
            base(notificador)
        {
            _alternativeRepository = alternativeRepository;
        }

        public async Task Add(Alternative alternative)
        {
            if (!ExecutarValidacao(new AlternativeValidation(), alternative))
                return;

            await _alternativeRepository.Add(alternative);
        }

        public async Task Update(Alternative alternative)
        {
            if (!ExecutarValidacao(new AlternativeValidation(), alternative))
                return;

            await _alternativeRepository.Update(alternative);
        }

        public async Task Remove(Guid id)
        {
            await _alternativeRepository.Remove(id);
        }

        public void Dispose()
        {
            _alternativeRepository?.Dispose();
        }
    }
}
