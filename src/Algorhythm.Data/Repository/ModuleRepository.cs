using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Data.Context;

namespace Algorhythm.Data.Repository
{
    public class ModuleRepository : Repository<Module>, IModuleRepository
    {
        public ModuleRepository(AlgorhythmDbContext db) : base(db) { }
    }
}
