using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using WeShare.Service.DataAccess;

namespace WeShare.Service.Security
{
    public class BasicAuthenticationHandler : AuthenticationHandler<BasicAuthenticationSchemeOptions>
    {
        private readonly IDataAccessObject dao;

        public BasicAuthenticationHandler(IOptionsMonitor<BasicAuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            IDataAccessObject dao,
            ISystemClock clock) : base(options, logger, encoder, clock)
        {
            this.dao = dao;
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            //var authorizationHeader = Context.Request.Headers["Authorization"];
            //if (!authorizationHeader.Any())
            //    return Task.FromResult(AuthenticateResult.NoResult());

            //var value = authorizationHeader.ToString();
            //if (string.IsNullOrWhiteSpace(value))
            //    return Task.FromResult(AuthenticateResult.NoResult());

            // place logic here to validate the header value (decrypt, call db etc)

            var isAdministratorClaim = new Claim(BasicAuthenticationExtension.IsAdministrator, 
                "true", 
                ClaimValueTypes.Boolean, 
                BasicAuthenticationExtension.DefaultIssuer);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, "Bob"),
                //isAdministratorClaim,
            };

            // create a new claims identity and return an AuthenticationTicket 
            // with the correct scheme
            var claimsIdentity = new ClaimsIdentity(claims, BasicAuthenticationExtension.Scheme);

            var ticket = new AuthenticationTicket(new ClaimsPrincipal(claimsIdentity), new AuthenticationProperties(), BasicAuthenticationExtension.Scheme);

            return Task.FromResult(AuthenticateResult.Success(ticket));
        }
    }
}
