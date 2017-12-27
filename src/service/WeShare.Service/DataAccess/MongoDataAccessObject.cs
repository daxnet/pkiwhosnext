using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeShare.Service.Models;
using System.Linq.Expressions;

namespace WeShare.Service.DataAccess
{
    internal sealed class MongoDataAccessObject : IDataAccessObject
    {
        private readonly IMongoClient client;
        private readonly IMongoDatabase database;

        public MongoDataAccessObject(string databaseName, string server = "localhost", int port = 27017)
        {
            this.client = new MongoClient($"mongodb://{server}:{port}/{databaseName}");
            this.database = this.client.GetDatabase(databaseName);
        }

        public async Task AddAsync<TEntity>(TEntity entity) where TEntity : IEntity
        {
            var collection = GetCollection<TEntity>();
            var options = new InsertOneOptions { BypassDocumentValidation = true };
            await collection.InsertOneAsync(entity, options);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync<TEntity>() where TEntity : IEntity => await FindBySpecificationAsync<TEntity>(_ => true);


        public async Task<TEntity> GetByIdAsync<TEntity>(Guid id) where TEntity : IEntity => (await FindBySpecificationAsync<TEntity>(x => x.Id.Equals(id))).FirstOrDefault();

        public Task UpdateByIdAsync<TEntity>(Guid id, TEntity entity) where TEntity : IEntity
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TEntity>> FindBySpecificationAsync<TEntity>(Expression<Func<TEntity, bool>> expr) where TEntity : IEntity
            => await (await GetCollection<TEntity>().FindAsync(expr)).ToListAsync();

        private IMongoCollection<TEntity> GetCollection<TEntity>() where TEntity : IEntity => this.database.GetCollection<TEntity>(typeof(TEntity).Name);

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~MongoDataAccessObject() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }

        
        #endregion
    }
}
