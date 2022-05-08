using Algorhythm.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IExerciseUserRepository : IRepository<ExerciseUser>
    {
        Task DeleteExerciseUser(List<ExerciseUser> exerciseUser);
    }
}
