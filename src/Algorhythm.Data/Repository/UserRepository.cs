using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Algorhythm.Data.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AlgorhythmDbContext db) : base(db)
        {
        }

        public async Task<User> GetUserAndExercisesByEmail(string email)
        {
            return await Db.Users.AsNoTracking().Include(e => e.Exercises)
                .FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
