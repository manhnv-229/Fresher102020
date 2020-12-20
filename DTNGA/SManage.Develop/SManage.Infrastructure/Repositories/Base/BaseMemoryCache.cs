using Dapper;
using Microsoft.Extensions.Caching.Memory;
using MySqlConnector;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace SManage.Infrastructure
{
    public class BaseMemoryCache : IBaseMemoryCache
    {
        readonly IDbConnection _dbConnection;
        protected readonly IMemoryCache _importMemoryCache;
        protected List<AdministrativeArea> AdministrativeAreas;
        protected List<ShopTransportor> ShopTransportors;
        protected List<Transportor> Transportors;
        public BaseMemoryCache(IDbConnection dbConnection, IMemoryCache importMemoryCache)
        {
            _dbConnection = dbConnection ?? throw new ArgumentNullException(nameof(MySqlConnection));
            _importMemoryCache = importMemoryCache;
            // Lấy dữ liệu:
            AdministrativeAreas = _dbConnection.Query<AdministrativeArea>("Proc_GetAdministrativeArea",commandType: CommandType.StoredProcedure).ToList();
            ShopTransportors = _dbConnection.Query<ShopTransportor>("Proc_GetAllShopTransportor", commandType: CommandType.StoredProcedure).ToList();
            Transportors = _dbConnection.Query<Transportor>("Proc_GetAllTransportor", commandType: CommandType.StoredProcedure).ToList();

            // Cache lại:
            CacheGetOrCreate();
        }
        /// <summary>
        /// Thực hiện cache dữ liệu các danh mục phục vụ cho import dữ liệu:
        /// </summary>
        /// CreatedBy dtnga (11/11/2020)
        public void CacheGetOrCreate()
        {
            SetCache("AdministrativeAreas", AdministrativeAreas);
            SetCache("ShopTransportors", ShopTransportors);
            SetCache("Transportors", Transportors);
        }


        /// <summary>
        ///  Thực hiện cache dữ liệu
        /// </summary>
        /// <param name="key">Key</param>
        /// <param name="data">Dữ liệu cache</param>
        /// CreatedBy dtnga (11/11/2020)
        public void SetCache(string key, object data)
        {
            _importMemoryCache.GetOrCreate(key, entry =>
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
            _importMemoryCache.GetOrCreate(key, entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromSeconds(8);
                return data;
            });
        }

        /// <summary>
        /// Lấy dữu liệu từ cache theo key
        /// </summary>
        /// <param name="key">Key</param>
        /// <returns></returns>
        /// CreatedBy dtnga (11/11/2020)
        public object GetCache(string key)
        {
            var cacheEntry = _importMemoryCache.Get<object>(key);
            return cacheEntry;
        }
    }
}
