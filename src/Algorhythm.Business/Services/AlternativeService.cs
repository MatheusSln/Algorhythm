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

        public AlternativeService(INotifier notifier, IAlternativeRepository alternativeRepository) :
            base(notifier)
        {
            _alternativeRepository = alternativeRepository;
        }

        public async Task Add(Alternative alternative)
        {
            if (!ExecuteValidation(new AlternativeValidation(), alternative))
                return;

            await _alternativeRepository.Add(alternative);
        }

        public async Task Update(Alternative alternative)
        {
            if (!ExecuteValidation(new AlternativeValidation(), alternative))
                return;

            await _alternativeRepository.Update(alternative);
        }

        public void Dispose()
        {
            _alternativeRepository?.Dispose();
        }
    }
}
