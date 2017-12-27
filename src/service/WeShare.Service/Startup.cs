using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WeShare.Service.DataAccess;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;

namespace WeShare.Service
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // MVC
            services.AddMvc();

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "WeShare API",
                    Version = "v1",
                    Description = "The back-end RESTful APIs for WeShare application.",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "Sunny Chen", Email = "daxnet@live.com", Url = "https://github.com/daxnet" },
                    License = new License { Name = "Apache License 2.0", Url = "https://www.apache.org/licenses/LICENSE-2.0" }
                });

                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var xml = Path.Combine(basePath, "WeShare.Service.xml");
                if (File.Exists(xml))
                {
                    c.IncludeXmlComments(xml);
                }
            });

            // Application Services
            services.AddSingleton<IDataAccessObject>(serviceProvider => new MongoDataAccessObject("WeShare"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "WeShare API");
            });

            app.UseMvc();
        }
    }
}
