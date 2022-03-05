using Algorhythm.Business.Models;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetUserAndExercisesByEmail(string email);
    }
}
