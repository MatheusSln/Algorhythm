using Algorhythm.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IExerciseRepository : IRepository<Exercise>
    {
        Task<Exercise> GetExerciseAndAlternatives(Guid id);
        Task<IEnumerable<Exercise>> GetExercisesByModule(Guid moduleId);
    }
}
