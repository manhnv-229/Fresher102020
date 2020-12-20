using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using MySqlConnector;
using Newtonsoft.Json.Serialization;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Interfaces.DatabaseContext;
using SManage.ApplicationCore.Interfaces.Repositories;
using SManage.ApplicationCore.Interfaces.Service;
using SManage.ApplicationCore.Interfaces.Service.Base;
using SManage.ApplicationCore.Services;
using SManage.Infrastructure;
using SManage.Infrastructure.DatabaseContext.DbContext;
using SManage.Infrastructure.Repositories.Base;

namespace SManage.API
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
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SManage.API", Version = "v1" });
                var xmlFile = Path.ChangeExtension(typeof(Startup).Assembly.Location, ".xml");
            });
            services.AddControllers().AddNewtonsoftJson(Options =>
            {
                Options.SerializerSettings.ContractResolver = new DefaultContractResolver(); Options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddMemoryCache();
            //Khởi tạo kết nối tới MariaDB:
            services.AddScoped<IDbConnection>(_ => new MySqlConnection(Configuration["ConnectionStrings:SManageMariaDB"]));

            // DI
            services.AddScoped<IEnumUtility, EnumUtility>();
            services.AddScoped<IBaseMemoryCache, BaseMemoryCache>();
            // DBContext
            services.AddScoped<IDatabaseContext, MariaDbContext>();
            // Base
            services.AddScoped<IBaseRepository, BaseRepository>();
            services.AddScoped<IBaseService, BaseService>();

            services.AddScoped<IOrderService, OrderService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "SManage Service - V1");
                c.RoutePrefix = "swagger";
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
