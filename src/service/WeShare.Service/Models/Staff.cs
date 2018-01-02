using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
