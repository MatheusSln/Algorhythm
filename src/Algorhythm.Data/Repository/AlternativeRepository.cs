using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Data.Context;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Algorhythm.Data.Repository
{
    public class AlternativeRepository : Repository<Alternative>, IAlternativeRepository
    {
        public AlternativeRepository(AlgorhythmDbContext db) : base(db) { }

        public async Task<IEnumerable<Alternative>> GetAlternativesByExercise(Guid exerciseId)
        {
            return await Search(a => a.ExerciseId == exerciseId);
        }
    }
}
