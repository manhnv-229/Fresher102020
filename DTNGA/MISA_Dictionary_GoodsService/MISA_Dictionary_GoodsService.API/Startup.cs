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
using MISA_Dictionary_GoodsService.ApplicationCore;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.DatabaseContext;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Repositories;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using MISA_Dictionary_GoodsService.ApplicationCore.Services;
using MISA_Dictionary_GoodsService.Infrastructure;
using MISA_Dictionary_GoodsService.Infrastructure.DatabaseContext.DbContext;
using MySqlConnector;
using Newtonsoft.Json.Serialization;
using SManage.Infrastructure.Repositories.Base;

namespace MISA_Dictionary_GoodsService.API
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
            services.AddCors(options => options.AddPolicy("AllowAll", builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            }));
            services.AddControllers();
            services.AddControllers().AddNewtonsoftJson(Options =>
            {
                Options.SerializerSettings.ContractResolver = new DefaultContractResolver(); Options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MISA_Dictionary_GoodsService.API", Version = "v1" });
                var xmlFile = Path.ChangeExtension(typeof(Startup).Assembly.Location, ".xml");
            });
            services.AddMemoryCache();
            //Khởi tạo kết nối tới MariaDB:
            services.AddScoped<IDbConnection>(_ => new MySqlConnection(Configuration["ConnectionStrings:SManageMariaDB"]));
            // DI
            services.AddScoped<IDatabaseContext, MariaDbContext>();
            services.AddScoped<IBaseMemoryCache, BaseMemoryCache>();
            services.AddScoped<IBaseService, BaseService>();
            services.AddScoped<IBaseRepository, BaseRepository>();

            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICategoryService, CategoryService>();
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
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MISA_Dictionary_GoodsService.API - V1");
                c.RoutePrefix = "swagger";
            });
            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
