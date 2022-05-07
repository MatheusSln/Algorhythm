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
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AlgorhythmDbContext db) : base(db)
        {
        }

        public async Task<IEnumerable<User>> GetAllValidUsers()
        {
            return await Db.Users.AsNoTracking().Where(w => w.BlockedAt == null).ToListAsync();
        }

        public async Task<User> GetUserAndExercisesByEmail(string email)
        {
            return await Db.Users.AsNoTracking().Include(e => e.ExerciseUser)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetValidUser(Guid userId)
        {
            return await Db.Users.AsNoTracking().Where(w => w.Id == userId && w.BlockedAt == null).FirstOrDefaultAsync();
        }
    }
}
