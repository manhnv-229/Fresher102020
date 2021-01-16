using Dapper;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Repositories;
using SManage.ApplicationCore.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Services
{
    public  class ProductService : BaseService, IProductService
    {
        public ProductService(IBaseMemoryCache baseMemoryCache, IBaseRepository baseRepository) : base(baseMemoryCache, baseRepository)
        {
        }

        public async Task<List<T>> GetByKeyword<T>(Dictionary<string, object> param)
        {
            var parms = new DynamicParameters();
            foreach (KeyValuePair<string, object> item in param)
            {
                var key = item.Key;
                var value = item.Value;
                parms.Add(key, value);
            }
            var entityName = typeof(T).Name;
            var sp = string.Format(MISAConst.Proc_GetByFilter, entityName);
            return await _baseRepository.GetAsync<T>(sp, parms);
        }
    }
}
