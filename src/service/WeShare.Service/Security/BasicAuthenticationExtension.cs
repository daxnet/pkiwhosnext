using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeShare.Service.Security
{
    public static class BasicAuthenticationExtension
    {
        public const string Scheme = "Basic";

        public const string DisplayName = "Basic Authentication";

        public const string IsAdministrator = "IsAdministrator";

        public const string DefaultIssuer = "http://weshare.informatics.perkinelmer.com";

        public static AuthenticationBuilder AddBasicAuthentication(this AuthenticationBuilder builder)
        {
            return builder.AddScheme<BasicAuthenticationSchemeOptions, BasicAuthenticationHandler>(Scheme, DisplayName, o => { });
        }
    }
}
