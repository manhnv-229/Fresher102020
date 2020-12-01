using System;
using System.Collections.Generic;
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
using MISA.ApplicationCore;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces.Base;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using MISA.ApplicationCore.Interfaces.IModelService;
using MISA.ApplicationCore.Interfaces.IModelServices;
using MISA.ApplicationCore.Service;
using MISA.Infarstructure;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace MISA.CukCuk.Web
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
            services.AddCors();
            services.AddControllers()
                 .AddNewtonsoftJson(options =>
                 {
                     options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                     options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

                 });
            services.AddControllers();
            services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
            services.AddScoped(typeof(IBaseRepos<>), typeof(BaseRepos<>));
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<ICustomerRepos, CustomerRepos>();
            services.AddScoped<IDepartmentRepos, DepartmentRepos>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IEmployeeRepos, EmployeeRepos>();
            services.AddScoped<IPossitionService, PossitionService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(option => option.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader());
            app.UseAuthorization();
            app.UseStaticFiles();
            app.UseDefaultFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
