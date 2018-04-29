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
    /// Represents the Staff entity.
    /// </summary>
    /// <seealso cref="WeShare.Service.Models.IEntity" />
    public class Staff : IEntity
    {
        /// <summary>
        /// Gets or sets the identifier of the current entity.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the user name of the current staff.
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Gets or sets the password of the current staff.
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Gets or sets the name of the current staff.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the email of the current staff.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the localized name of the current staff.
        /// </summary>
        public string LocalName { get; set; }

        /// <summary>
        /// Gets or sets the last date on which the current staff has been modified.
        /// </summary>
        public DateTime? DateModified { get; set; }

        /// <summary>
        /// Gets or sets the last date on which the current staff logged in.
        /// </summary>
        public DateTime? DateLastLogin { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this staff is active.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this staff is active; otherwise, <c>false</c>.
        /// </value>
        public bool IsActive { get; set; }

        /// <summary>
        /// Gets or sets a <see cref="bool"/> value which indicates
        /// whether the current staff is an administrator.
        /// </summary>
        public bool? IsAdmin { get; set; }

        /// <summary>
        /// Gets or sets the BASE64 encoded string of the current
        /// staff's avatar.
        /// </summary>
        public string AvatarBase64 { get; set; }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>
        /// A <see cref="System.String" /> that represents this instance.
        /// </returns>
        public override string ToString() => this.Name ?? base.ToString();
    }
}