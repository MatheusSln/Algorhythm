using Algorhythm.Business.Models;
using System;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IExerciseService : IDisposable
    {
        Task<bool> Add(Exercise exercise);
        Task<bool> Update(Exercise exercise);
        Task<bool> Remove(Guid id);
    }
}
