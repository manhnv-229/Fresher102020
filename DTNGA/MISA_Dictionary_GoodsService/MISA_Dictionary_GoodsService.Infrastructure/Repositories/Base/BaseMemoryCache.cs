using Dapper;
using Microsoft.Extensions.Caching.Memory;
using MISA_Dictionary_GoodsService.ApplicationCore;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA_Dictionary_GoodsService.Infrastructure
{
    public class BaseMemoryCache : IBaseMemoryCache
    {
        readonly IDbConnection _dbConnection;
        protected readonly IMemoryCache _memoryCache;
        protected List<Brand> brands;
        protected List<Category> categories;
        protected List<Product> products;
        public BaseMemoryCache(IDbConnection dbConnection, IMemoryCache importMemoryCache)
        {
            _dbConnection = dbConnection ?? throw new ArgumentNullException(nameof(MySqlConnection));
            _memoryCache = importMemoryCache;
            //Lấy dữ liệu:
            brands = _dbConnection.Query<Brand>("Proc_GetAllBrand", commandType: CommandType.StoredProcedure).ToList();
            categories = _dbConnection.Query<Category>("Proc_GetAllCategory", commandType: CommandType.StoredProcedure).ToList();
            products = _dbConnection.Query<Product>("Proc_GetAllProduct", commandType: CommandType.StoredProcedure).ToList();
            // Cache lại:
            CacheGetOrCreate();
        }
        /// <summary>
        /// Thực hiện cache dữ liệu các danh mục phục vụ cho import dữ liệu:
        /// </summary>
        /// CreatedBy dtnga (11/11/2020)
        public void CacheGetOrCreate()
        {
            SetCache("Brands", brands);
            SetCache("Categories", categories);
            SetCache("Products", products);
        }


        /// <summary>
        ///  Thực hiện cache dữ liệu
        /// </summary>
        /// <param name="key">Key</param>
        /// <param name="data">Dữ liệu cache</param>
        /// CreatedBy dtnga (11/11/2020)
        public void SetCache(string key, object data)
        {
            _memoryCache.GetOrCreate(key, entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromMinutes(5);
                return data;
            });
        }

        /// <summary>
        ///  Thực hiện cache dữ liệu thay đổi liên tục
        /// </summary>
        /// <param name="key">Key</param>
        /// <param name="data">Dữ liệu cache</param>
        /// CreatedBy dtnga (11/11/2020)
        public void SetCacheModify(string key, object data)
        {
            _memoryCache.GetOrCreate(key, entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromSeconds(8);
                return data;
            });
        }

        /// <summary>
        /// Lấy dữ liệu từ cache theo key
        /// </summary>
        /// <param name="key">Key</param>
        /// <returns></returns>
        /// CreatedBy dtnga (11/11/2020)
        public List<T> GetCache<T>(string key)
        {
            var cacheEntry = _memoryCache.Get<List<T>>(key);
            if (cacheEntry.Count == 0)
            {
                var typeName = typeof(T).Name;
                var sp = "Proc_GetAll" + typeName;
                cacheEntry =  _dbConnection.Query<T>(sp, commandType: CommandType.StoredProcedure).ToList();
                SetCache(key, cacheEntry);
            }
            return cacheEntry;
        }
    }
}
