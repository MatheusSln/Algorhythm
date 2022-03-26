using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Algorhythm.Data.Repository
{
    public class ExerciseRepository : Repository<Exercise>, IExerciseRepository
    {
        public ExerciseRepository(AlgorhythmDbContext context) : base(context) { }

        public async Task<Exercise> GetExerciseAndAlternatives(Guid id)
        {
            return await Db.Exercises.AsNoTracking().Include(a => a.Alternatives)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Exercise>> GetExercisesByModule(int moduleId)
        {
            return await Search(e => e.ModuleId == moduleId);
        }

        public async Task<IEnumerable<Exercise>> GetAllExercisesAndAlternatives()
        {
            return await Db.Exercises.AsNoTracking().Include(a => a.Alternatives)
                .ToListAsync();
        }
    }
}
