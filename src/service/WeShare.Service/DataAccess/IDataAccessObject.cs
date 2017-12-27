using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WeShare.Service.Models;

namespace WeShare.Service.DataAccess
{
    public interface IDataAccessObject : IDisposable
    {
        Task<TEntity> GetByIdAsync<TEntity>(Guid id)
            where TEntity : IEntity;

        Task<IEnumerable<TEntity>> GetAllAsync<TEntity>()
            where TEntity : IEntity;

        Task AddAsync<TEntity>(TEntity entity)
            where TEntity : IEntity;

        Task UpdateByIdAsync<TEntity>(Guid id, TEntity entity)
            where TEntity : IEntity;

        Task<IEnumerable<TEntity>> FindBySpecificationAsync<TEntity>(Expression<Func<TEntity, bool>> expr)
            where TEntity : IEntity;
    }
}
