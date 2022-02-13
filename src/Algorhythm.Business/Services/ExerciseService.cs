using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Business.Models.Validations;
using System;
using System.Threading.Tasks;

namespace Algorhythm.Business.Services
{
    public class ExerciseService : BaseService, IExerciseService
    {
        private readonly IExerciseRepository _exerciseRepository;

        public ExerciseService(IExerciseRepository exerciseRepository, INotificador notificador) : 
            base(notificador)
        {
            _exerciseRepository = exerciseRepository;
        }

        public async Task<bool> Add(Exercise exercise)
        {
            if (!ExecutarValidacao(new ExerciseValidation(), exercise)) 
                return false;

            await _exerciseRepository.Add(exercise);
            return true;
        }

        public async Task<bool> Update(Exercise exercise)
        {
            if (!ExecutarValidacao(new ExerciseValidation(), exercise))
                return false;

            await _exerciseRepository.Update(exercise);
            return true;
        }

        public async Task<bool> Remove(Guid id)
        {
            await _exerciseRepository.Remove(id);
            return true;
        }

        public void Dispose()
        {
            _exerciseRepository?.Dispose();
        }
    }
}
