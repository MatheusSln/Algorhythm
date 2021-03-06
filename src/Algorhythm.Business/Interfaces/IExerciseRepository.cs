using Algorhythm.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IExerciseRepository : IRepository<Exercise>
    {
        Task<Exercise> GetExerciseAndAlternatives(Guid id);
        Task<IEnumerable<Exercise>> GetExercisesByModule(int moduleId);
        Task<IEnumerable<Exercise>> GetExerciseAndAlternativesByModule(int moduleId, Guid userId);
        Task<IEnumerable<Exercise>> GetAllExercisesAndAlternatives();
        Task<Exercise> GetExerciseAndUser(Guid exerciseId, Guid userId);

        Task<int> GetAmountOfExercisesByModule(int moduleId);

        Task<IEnumerable<Exercise>> GetExercisesPerformedByUser(Guid userId);
    }
}
