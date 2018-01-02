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

namespace WeShare.Service.Models
{
    /// <summary>
    /// Represents that the implemented classes are entities that hold
    /// a <see cref="Guid"/> as its identifier.
    /// </summary>
    public interface IEntity
    {
        /// <summary>
        /// Gets or sets the identifier of the current entity.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        Guid Id { get; set; }
    }
}
