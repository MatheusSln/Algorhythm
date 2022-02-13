using Algorhythm.Business.Models;
using System;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IAlternativeService : IDisposable
    {
        Task Add(Alternative alternative);
        Task Update(Alternative alternative);
        Task Remove(Guid id);
    }
}
