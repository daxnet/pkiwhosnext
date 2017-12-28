using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WeShare.Service.DataAccess;
using WeShare.Service.Models;

namespace WeShare.Service.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class StaffsController : Controller
    {
        private readonly IDataAccessObject dao;
        private readonly ILogger logger;

        public StaffsController(IDataAccessObject dao, ILogger<StaffsController> logger)
        {
            this.dao = dao;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync() => Ok(await this.dao.FindBySpecificationAsync<Staff>(s => s.IsActive));

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            var entity = await this.dao.GetByIdAsync<Staff>(id);
            if (entity == null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        [HttpGet]
        [Route("randomize")]
        public async Task<IActionResult> GetRandomizedAsync()
            => Ok((await this.dao.FindBySpecificationAsync<Staff>(s => s.IsActive))
                .RandomizeOrder()
                .Select((x, i) => new { index = i, id = x.Id }));

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] dynamic model)
        {
            var name = (string)model.name;
            var localName = (string)model.localName;
            var email = (string)model.email;
            var userName = (string)model.userName;
            var password = (string)model.password;
            var avatarBase64 = (string)model.avatarBase64;

            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(localName) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(avatarBase64))
            {
                return BadRequest($"Missing {nameof(name)}, {nameof(localName)}, {nameof(email)} or {nameof(avatarBase64)} from the request body.");
            }

            if (string.IsNullOrEmpty(userName))
            {
                userName = name.ToLower().Replace(" ", ".");
            }

            if (string.IsNullOrEmpty(password))
            {
                password = "Perkinelmer123";
            }

            var existing = await this.dao.FindBySpecificationAsync<Staff>(x => x.Name.Equals(name) || x.Email.Equals(email) || x.UserName.Equals(userName));
            if (existing.FirstOrDefault() != null)
            {
                return StatusCode((int)HttpStatusCode.Conflict, "Either Name, UserName or Email does exist.");
            }

            var staff = new Staff
            {
                Id = Guid.NewGuid(),
                AvatarBase64 = avatarBase64,
                LocalName = localName,
                Email = email,
                IsActive = true,
                Name = name,
                Password = password,
                UserName = userName
            };

            await this.dao.AddAsync(staff);

            return Created(Url.Action("GetByIdAsync", new { id = staff.Id }), staff.Id);
        }
    }
}
