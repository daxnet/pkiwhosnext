using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WeShare.Service.DataAccess;
using WeShare.Service.Models;
using WeShare.Service.Security;

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
        [Authorize(Policy = "Administrator")]
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

        [HttpPatch("{id}")]
        [Authorize(Policy = "RegularUser")]
        public async Task<IActionResult> PatchAsync(Guid id, [FromBody] JsonPatchDocument<Staff> model)
        {
            var instance = (await this.dao.FindBySpecificationAsync<Staff>(x => x.Id.Equals(id))).FirstOrDefault();
            if (instance == null)
            {
                return NotFound();
            }

            model.ApplyTo(instance, this.ModelState);
            if (!this.ModelState.IsValid)
            {
                return new BadRequestObjectResult(this.ModelState);
            }

            await this.dao.UpdateByIdAsync(id, instance);

            return NoContent();
        }

        [HttpDelete]
        [Authorize(Policy = "Administrator")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var instance = (await this.dao.FindBySpecificationAsync<Staff>(x => x.Id.Equals(id))).FirstOrDefault();
            if (instance == null)
            {
                return NotFound();
            }

            await this.dao.DeleteByIdAsync<Staff>(id);

            return NoContent();
        }

        [HttpPost]
        [Route("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] dynamic model)
        {
            var userName = (string)model.userName;
            var password = (string)model.password;
            if (string.IsNullOrEmpty(userName) ||
                string.IsNullOrEmpty(password))
            {
                return BadRequest($"Either user name or password is not specified.");
            }

            var entity = (await this.dao.FindBySpecificationAsync<Staff>(x => 
                x.UserName.Equals(userName) && 
                x.Password.Equals(password))).FirstOrDefault();
            if (entity == null)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                id = entity.Id,
                name = entity.UserName,
                token = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{entity.UserName}:{entity.Password}"))
            });
        }
    }
}
