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
    public class Staff : IEntity
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string LocalName { get; set; }

        public DateTime? DateModified { get; set; }

        public DateTime? DateLastLogin { get; set; }

        public bool IsActive { get; set; }

        public bool? IsAdmin { get; set; }

        public string AvatarBase64 { get; set; }

        public override string ToString() => this.Name ?? base.ToString();
    }
}