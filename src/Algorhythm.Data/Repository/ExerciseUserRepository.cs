using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Data.Context;

namespace Algorhythm.Data.Repository
{
    public class ExerciseUserRepository : Repository<ExerciseUser>, IExerciseUserRepository
    {
        public ExerciseUserRepository(AlgorhythmDbContext db) : base(db)
        {
        }
    }
}
