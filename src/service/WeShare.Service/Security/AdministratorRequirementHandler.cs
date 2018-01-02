using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WeShare.Service.Security
{
    public class AdministratorRequirementHandler : AuthorizationHandler<AdministratorRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdministratorRequirement requirement)
        {
            bool predicate(Claim claim) => 
                claim.Type == BasicAuthenticationExtension.IsAdministrator &&
                claim.Issuer == BasicAuthenticationExtension.DefaultIssuer;

            if (!context.User.HasClaim(predicate))
            {
                return Task.CompletedTask;
            }

            var isAdmin = Convert.ToBoolean(context.User.FindFirst(predicate).Value);

            if (isAdmin)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
