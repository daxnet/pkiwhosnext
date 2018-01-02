// ============================================================================
// __          ________  _____ _    _          _____  ______ 
// \ \        / /  ____|/ ____| |  | |   /\   |  __ \|  ____|
//  \ \  /\  / /| |__  | (___ | |__| |  /  \  | |__) | |__   
//   \ \/  \/ / |  __|  \___ \|  __  | / /\ \ |  _  /|  __|  
//    \  /\  /  | |____ ____) | |  | |/ ____ \| | \ \| |____ 
//     \/  \/   |______|_____/|_|  |_/_/    \_\_|  \_\______|
//                                                           
// WeShare - A simple lottery application built for internal group meeting.
//
// Copyright (C) 2017-2018, PerkinElmer Inc. Informatics
// All rights reserved.
// Program by Sunny Chen (daxnet)
//
// ============================================================================

using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WeShare.Service.Models;

namespace WeShare.Service.DataAccess
{
    /// <summary>
    /// Represents that the implemented classes are data access objects that perform
    /// CRUD operations on the given entity type.
    /// </summary>
    /// <seealso cref="System.IDisposable" />
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

        Task DeleteByIdAsync<TEntity>(Guid id)
            where TEntity : IEntity;
    }
}
