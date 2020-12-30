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
        public BaseMemoryCache(IDbConnection dbConnection, IMemoryCache memoryCache)
        {
            _dbConnection = dbConnection ?? throw new ArgumentNullException(nameof(MySqlConnection));
            _memoryCache = memoryCache;
            
        }
        /// <summary>
        /// Thực hiện cache dữ liệu các danh mục phục vụ cho import dữ liệu:
        /// </summary>
        /// CreatedBy dtnga (11/11/2020)
        public void CacheGetOrCreate()
        {
            
        }


        /// <summary>
        ///  Thực hiện cache dữ liệu
        /// </summary>
        /// <param name="key">Key</param>
        /// <param name="data">Dữ liệu cache</param>
        /// CreatedBy dtnga (11/11/2020)
        public void SetCache(string key, object data)
        {
            _memoryCache.Set(key, data, TimeSpan.FromDays(1));
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
        public T GetCache<T>(string key)
        {
            var cacheEntry = _memoryCache.Get<T>(key);
            return cacheEntry;
        }

    }
}
