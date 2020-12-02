using Microsoft.Extensions.DependencyInjection;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Services;
using MISA.Infrastructure.DatabaseContext;
using MISA.Infrastructure.Interfaces;
using MISA.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CucCuk.Web
{
    public class DIConfig
    {
        public static void InjectionConfig(IServiceCollection services)
        {
            //config cho service
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
            //config cho Repository
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            //config cho Database
            services.AddScoped(typeof(IDatabaseContext<>), typeof(DatabaseContext<>));
        }
    }
}