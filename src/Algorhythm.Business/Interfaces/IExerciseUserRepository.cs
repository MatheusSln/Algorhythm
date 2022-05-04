using Algorhythm.Business.Models;
using System;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IExerciseUserRepository : IRepository<ExerciseUser>
    {
        Task DeleteAllExerciseByUser(Guid UserId);
    }
}
