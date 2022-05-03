using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Algorhythm.Data.Repository
{
    public class ExerciseRepository : Repository<Exercise>, IExerciseRepository
    {
        public ExerciseRepository(AlgorhythmDbContext context) : base(context) { }

        public async Task<Exercise> GetExerciseAndAlternatives(Guid id)
        {
            return await Db.Exercises.AsNoTracking().Where(w  => w.DeletedAt == null).Include(a => a.Alternatives)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Exercise>> GetExerciseAndAlternativesByModule(int moduleId, Guid userId)
        {
            return await Db.Exercises.Where(w => w.ModuleId == moduleId && w.DeletedAt == null)
                .Select(exercise => new Exercise
                {
                    Id = exercise.Id,
                    Question = exercise.Question,
                    CorrectAlternative = exercise.CorrectAlternative,
                    Explanation = exercise.Explanation,
                    Alternatives = exercise.Alternatives.Where(a => a.ExerciseId == exercise.Id).ToList(),
                    Users = exercise.Users.Where(user => user.Id == userId).Select(user => new User
                    {
                        Id = user.Id,
                    })
                    .ToList(),
                }).ToListAsync();
        }

        public async Task<IEnumerable<Exercise>> GetExercisesByModule(int moduleId)
        {
            return await Search(e => e.ModuleId == moduleId && e.DeletedAt == null);
        }

        public async Task<IEnumerable<Exercise>> GetAllExercisesAndAlternatives()
        {
            return await Db.Exercises.AsNoTracking().Where(w => w.DeletedAt == null).Include(a => a.Alternatives)
                .ToListAsync();
        }

        public async Task<Exercise> GetExerciseAndUser(Guid exerciseId, Guid userId)
        {
            return await Db.Exercises.Where(w => w.Id == exerciseId).Select(
                exercise => new Exercise
                {
                    Id = exercise.Id,
                    ModuleId = exercise.ModuleId,
                    Question = exercise.Question,
                    CorrectAlternative = exercise.CorrectAlternative,
                    Explanation = exercise.Explanation,
                    Alternatives = exercise.Alternatives.Where(a => a.ExerciseId == exercise.Id).ToList(),
                    Users = exercise.Users.Where(user => user.Id == userId).Select(user => new User
                    {
                        Id = user.Id,
                    })
                    .ToList(),
                }).FirstOrDefaultAsync();
        }
    }
}
