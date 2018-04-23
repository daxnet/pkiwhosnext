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

using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using WeShare.Service.DataAccess;
using WeShare.Service.Models;

namespace WeShare.Service.Security
{
    /// <summary>
    /// Represents the authentication handler which handles the Basic authentication scheme.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Authentication.AuthenticationHandler{WeShare.Service.Security.BasicAuthenticationSchemeOptions}" />
    public class BasicAuthenticationHandler : AuthenticationHandler<BasicAuthenticationSchemeOptions>
    {
        #region Private Fields

        private readonly IDataAccessObject dao;

        #endregion Private Fields

        #region Public Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="BasicAuthenticationHandler"/> class.
        /// </summary>
        /// <param name="options">The options.</param>
        /// <param name="logger">The logger.</param>
        /// <param name="encoder">The encoder.</param>
        /// <param name="dao">The data access object which provides the data access operations.</param>
        /// <param name="clock">The system clock.</param>
        public BasicAuthenticationHandler(IOptionsMonitor<BasicAuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            IDataAccessObject dao,
            ISystemClock clock) : base(options, logger, encoder, clock)
        {
            this.dao = dao;
        }

        #endregion Public Constructors

        #region Protected Methods

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var authorizationHeader = Context.Request.Headers["Authorization"];
            if (!authorizationHeader.Any())
            {
                return AuthenticateResult.NoResult();
            }

            var authorizationHeaderValue = authorizationHeader.ToString();
            if (string.IsNullOrWhiteSpace(authorizationHeaderValue))
            {
                return AuthenticateResult.NoResult();
            }

            var authorizationValue = Encoding.ASCII.GetString(
                Convert.FromBase64String(
                    authorizationHeaderValue.Substring(6, authorizationHeaderValue.Length - 6)));

            var userName = authorizationValue.Substring(0, authorizationValue.IndexOf(':'));
            var password = authorizationValue.Substring(authorizationValue.IndexOf(':') + 1,
                authorizationValue.Length - authorizationValue.IndexOf(':') - 1);
            var encryptedPassword = Utils.EncryptPassword(userName, password);

            var staff = (await this.dao.FindBySpecificationAsync<Staff>(x => x.UserName == userName && x.Password == encryptedPassword)).FirstOrDefault();
            if (staff == null)
            {
                return AuthenticateResult.NoResult();
            }

            var isAdministratorClaim = new Claim(BasicAuthenticationExtension.IsAdministrator,
                (staff.IsAdmin ?? false).ToString(),
                ClaimValueTypes.Boolean,
                BasicAuthenticationExtension.DefaultIssuer);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, staff.Id.ToString()),
                new Claim(ClaimTypes.Name, staff.UserName),
                isAdministratorClaim
            };

            // create a new claims identity and return an AuthenticationTicket
            // with the correct scheme
            var claimsIdentity = new ClaimsIdentity(claims, BasicAuthenticationExtension.Scheme);

            var ticket = new AuthenticationTicket(new ClaimsPrincipal(claimsIdentity), new AuthenticationProperties(), BasicAuthenticationExtension.Scheme);

            return AuthenticateResult.Success(ticket);
        }

        #endregion Protected Methods
    }
}