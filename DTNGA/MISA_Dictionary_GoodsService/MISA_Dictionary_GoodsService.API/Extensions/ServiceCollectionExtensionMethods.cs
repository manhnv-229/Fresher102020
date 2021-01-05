using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.DatabaseContext;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Repositories;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using MISA_Dictionary_GoodsService.ApplicationCore.Services;
using MISA_Dictionary_GoodsService.Infrastructure;
using MISA_Dictionary_GoodsService.Infrastructure.DatabaseContext.DbContext;
using MySqlConnector;
using SManage.Infrastructure.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Extensions
{
    public static class ServiceCollectionExtensionMethods
    {
        public static void AddDI(this IServiceCollection services, IConfiguration configuration)
        {
            //Khởi tạo kết nối tới MariaDB:
            services.AddScoped<IDbConnection>(_ => new MySqlConnection(configuration["ConnectionStrings:MISADictionaryProductMariaDB"]));
            // DI
            services.AddScoped<IDatabaseContext, MariaDbContext>();
            services.AddScoped<IBaseMemoryCache, BaseMemoryCache>();
            services.AddScoped<IBaseService, BaseService>();
            services.AddScoped<IBaseRepository, BaseRepository>();

            services.AddScoped<IGoodsService, GoodsService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IBrandService, BrandService>();
        }
    }
}
