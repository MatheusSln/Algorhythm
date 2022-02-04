using Algorhythm.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IAlternativeRepository : IRepository<Alternative>
    {
        Task<IEnumerable<Alternative>> GetAlternativesByExercise(Guid exerciseId);
    }
}
