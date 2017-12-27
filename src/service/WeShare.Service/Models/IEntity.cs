using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeShare.Service.Models
{
    public interface IEntity
    {
        Guid Id { get; set; }
    }
}
