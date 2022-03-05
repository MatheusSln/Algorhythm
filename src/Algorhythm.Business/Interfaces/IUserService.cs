using Algorhythm.Business.Models;
using System;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IUserService : IDisposable
    {
        Task Add(User user);
        Task Update(User user);
        Task Remove(Guid id);
    }
}
