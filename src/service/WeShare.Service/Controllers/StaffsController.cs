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

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WeShare.Service.DataAccess;
using WeShare.Service.Models;

namespace WeShare.Service.Controllers
{
    /// <summary>
    /// Represents the controller for staff operations.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class StaffsController : Controller
    {
        #region Private Fields

        private readonly IDataAccessObject dao;
        private readonly ILogger logger;

        #endregion Private Fields

        #region Public Constructors

        public StaffsController(IDataAccessObject dao, ILogger<StaffsController> logger)
        {
            this.dao = dao;
            this.logger = logger;
        }

        #endregion Public Constructors

        #region Public Methods

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
                x.UserName.Equals(userName))).FirstOrDefault();
            if (entity == null)
            {
                return NotFound();
            }

            if (!entity.Password.Equals(Utils.EncryptPassword(userName, password)))
            {
                return Unauthorized();
            }

            logger.LogInformation($"'{userName}' authenticated successfully.");

            return Ok(new
            {
                id = entity.Id,
                name = entity.UserName,
                token = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{userName}:{password}"))
            });
        }

        [HttpPost("pwd/change")]
        [Authorize(Policy = "RegularUser")]
        public async Task<IActionResult> ChangePassword([FromBody] dynamic model)
        {
            var userName = this.User?.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized();
            }

            var oldPassword = (string)model.oldPassword;
            var newPassword = (string)model.newPassword;

            if (string.IsNullOrEmpty(oldPassword) || string.IsNullOrEmpty(newPassword))
            {
                return BadRequest($"Both {nameof(oldPassword)} and {nameof(newPassword)} must be specified.");
            }

            var staff = (await this.dao.FindBySpecificationAsync<Staff>(x => x.UserName.Equals(userName))).FirstOrDefault();
            if (staff == null)
            {
                return NotFound();
            }

            var encryptedOldPassword = Utils.EncryptPassword(userName, oldPassword);
            if (!staff.Password.Equals(encryptedOldPassword))
            {
                return Unauthorized();
            }

            staff.Password = Utils.EncryptPassword(userName, newPassword);
            await this.dao.UpdateByIdAsync(staff.Id, staff);

            logger.LogInformation($"'{userName}' has changed the password.");

            return NoContent();
        }

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
            var isAdmin = (bool?)model.isAdmin;

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
                IsAdmin = isAdmin,
                Name = name,
                Password = Utils.EncryptPassword(userName, password),
                UserName = userName
            };

            await this.dao.AddAsync(staff);

            logger.LogInformation($"User '{userName}' created successfully.");

            return Created(Url.Action("GetByIdAsync", new { id = staff.Id }), staff.Id);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var staff = (await this.dao.FindBySpecificationAsync<Staff>(x => x.Id.Equals(id))).FirstOrDefault();
            if (staff == null)
            {
                return NotFound();
            }

            await this.dao.DeleteByIdAsync<Staff>(id);

            logger.LogInformation($"User '{staff.UserName}' deleted successfully.");

            return NoContent();
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
        [Route("disorganize")]
        public async Task<IActionResult> DisorganizeStaffs()
            => Ok((await this.dao.FindBySpecificationAsync<Staff>(s => s.IsActive))
                .Disorganize()
                .Select((x, i) => new { index = i, id = x.Id }));

        [HttpPatch]
        [Authorize(Policy = "RegularUser")]
        public async Task<IActionResult> PatchAsync([FromBody] JsonPatchDocument<Staff> model)
        {
            var userName = this.User?.Identity.Name;
            var staff = (await this.dao.FindBySpecificationAsync<Staff>(x => x.UserName.Equals(userName))).FirstOrDefault();
            if (staff == null)
            {
                return NotFound();
            }

            model.ApplyTo(staff, this.ModelState);
            if (!this.ModelState.IsValid)
            {
                return new BadRequestObjectResult(this.ModelState);
            }

            await this.dao.UpdateByIdAsync(staff.Id, staff);

            logger.LogInformation($"'{userName}' has been updated successfully.");

            return NoContent();
        }

        #endregion Public Methods
    }
}