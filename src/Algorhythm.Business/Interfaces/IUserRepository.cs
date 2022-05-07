using Algorhythm.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IEnumerable<User>> GetAllValidUsers();
        Task<User> GetUserAndExercisesByEmail(string email);

        Task<User> GetValidUser(Guid userId);
    }
}
