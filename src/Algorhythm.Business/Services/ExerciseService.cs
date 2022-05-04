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

        public ExerciseService(IExerciseRepository exerciseRepository, INotifier notifier) : 
            base(notifier)
        {
            _exerciseRepository = exerciseRepository;
        }

        public async Task Add(Exercise exercise)
        {
            if (!ExecuteValidation(new ExerciseValidation(), exercise))
                return;

            await _exerciseRepository.Add(exercise);
        }

        public async Task Update(Exercise exercise)
        {
            if (!ExecuteValidation(new ExerciseValidation(), exercise))
                return;

            await _exerciseRepository.Update(exercise);
        }

        public void Dispose()
        {
            _exerciseRepository?.Dispose();
        }
    }
}
