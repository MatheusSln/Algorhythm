using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Data.Context;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Algorhythm.Data.Repository
{
    public class ExerciseUserRepository : Repository<ExerciseUser>, IExerciseUserRepository
    {
        public ExerciseUserRepository(AlgorhythmDbContext db) : base(db)
        {
        }

        public async Task DeleteExerciseUser(List<ExerciseUser> exerciseUser)
        {
            Db.ExerciseUsers.RemoveRange(exerciseUser);
            await SaveChanges();
        }
    }
}
