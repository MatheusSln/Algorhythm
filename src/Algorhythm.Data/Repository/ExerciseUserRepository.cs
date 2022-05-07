using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Data.Context;
using System;
using System.Threading.Tasks;

namespace Algorhythm.Data.Repository
{
    public class ExerciseUserRepository : Repository<ExerciseUser>, IExerciseUserRepository
    {
        public ExerciseUserRepository(AlgorhythmDbContext db) : base(db)
        {
        }

        public Task DeleteAllExerciseByUser(Guid UserId)
        {
            throw new NotImplementedException();
        }
    }
}
