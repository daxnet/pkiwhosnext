using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.IO;
using WeShare.Service.DataAccess;
using WeShare.Service.Security;

namespace WeShare.Service
{
    public class Startup
    {
        private readonly ILogger logger;

        public Startup(IConfiguration configuration, ILogger<Startup> logger)
        {
            Configuration = configuration;
            this.logger = logger;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Configuration
            var mongoServer = Configuration["mongo:server"];
            var mongoDatabase = Configuration["mongo:database"];
            var mongoPort = Convert.ToInt32(Configuration["mongo:port"]);

            // MVC
            services.AddMvc(options => options.EnableEndpointRouting = false);

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "WeShare API",
                    Version = "v1",
                    Description = "The back-end RESTful APIs for WeShare application."
                });

                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var xml = Path.Combine(basePath, "WeShare.Service.xml");
                if (File.Exists(xml))
                {
                    c.IncludeXmlComments(xml);
                }
            });

            // Authentication
            services.AddAuthentication().AddBasicAuthentication();

            // Authorization
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Administrator", policy =>
                {
                    policy.AuthenticationSchemes.Add(BasicAuthenticationExtension.Scheme);
                    policy.RequireAuthenticatedUser();
                    policy.Requirements.Add(new AdministratorRequirement());
                });

                options.AddPolicy("RegularUser", policy =>
                {
                    policy.AuthenticationSchemes.Add(BasicAuthenticationExtension.Scheme);
                    policy.RequireAuthenticatedUser();
                });
            });

            services.AddSingleton<IAuthorizationHandler, AdministratorRequirementHandler>();

            // Application Services
            services.AddSingleton<IDataAccessObject>(serviceProvider => new MongoDataAccessObject(mongoDatabase, mongoServer, mongoPort));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHostApplicationLifetime appLifetime)
        {
            appLifetime.ApplicationStarted.Register(() =>
            {
                this.logger.LogInformation("WeShare Application started.");
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "WeShare API");
            });

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
