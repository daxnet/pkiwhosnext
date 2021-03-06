﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace WeShare.Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddCommandLine(args)
                .Build();

            return WebHost.CreateDefaultBuilder(args)
                .UseConfiguration(config)
                .ConfigureLogging((hostingContext, logging) =>
                {
                    var path = hostingContext.Configuration["LOG_PATH"];
                    if (string.IsNullOrEmpty(path))
                    {
                        path = Path.Combine(Path.GetDirectoryName(typeof(Program).Assembly.Location), "log");
                    }

                    var logFile = Path.Combine(path, "weshare.log");
                    
                    // TODO: Uncomment the following line to enable file logging.
                    // logging.AddFile(logFile);
                    logging.AddConsole();
                })
                .UseStartup<Startup>()
                .Build();
        }
    }
}
