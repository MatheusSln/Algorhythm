using Algorhythm.Business.Models;
using System;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IExerciseService : IDisposable
    {
        Task Add(Exercise exercise);
        Task Update(Exercise exercise);
    }
}
