using Algorhythm.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Algorhythm.Business.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : BaseEntity
    {
        Task Add(TEntity entity);
        Task<TEntity> GetById(Guid id);
        Task<List<TEntity>> GetAll();
        Task Update(TEntity obj);
        Task<IEnumerable<TEntity>> Search(Expression<Func<TEntity, bool>> predicate);
        Task<int> SaveChanges();
    }
}
