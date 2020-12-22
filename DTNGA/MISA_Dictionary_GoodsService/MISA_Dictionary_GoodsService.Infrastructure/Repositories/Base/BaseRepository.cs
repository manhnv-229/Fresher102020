using Dapper;
using Microsoft.Extensions.Caching.Memory;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.DatabaseContext;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace SManage.Infrastructure.Repositories.Base
{
    /// <summary>
    /// Base thực hiện tương tác chung với DB
    /// </summary>
    /// Created by DtNga : 03/11/2020
    public class BaseRepository : IBaseRepository
    {
        readonly IDatabaseContext _databaseContext;

        /// <summary>
        /// Khởi tạo
        /// </summary>
        /// <param name="databaseContext"></param>
        public BaseRepository(IDatabaseContext databaseContext, IMemoryCache memoryCache)
        {
            _databaseContext = databaseContext;
        }

        #region Delete
        public async Task<T> DeleteAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            return await _databaseContext.DeleteAsync<T>(sp, parms);
        }

        public async Task<int> DeleteRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text)
        {
            return await _databaseContext.DeleteRangeAsync<T>(sp, entities);
        }
        #endregion

        #region Execute
        public Task<int> ExecuteAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            return _databaseContext.ExecuteAsync(sp, parms);
        }
        #endregion

        #region Get
        public List<T> Get<T>(string queryCommand, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure)
        {
            return _databaseContext.Get<T>(queryCommand);
        }
        public async Task<List<T>> GetAsync<T>(string queryCommand, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure)
        {
            return await _databaseContext.GetAsync<T>(queryCommand, parms);
        }

        public async Task<T> GetByIdAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            return await _databaseContext.GetByIdAsync<T>(sp, parms);
        }
        #endregion

        #region Insert
        public async Task<T> InsertAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            return await _databaseContext.InsertAsync<T>(sp, parms);
        }

        public async Task<int> InsertRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text)
        {
            return await _databaseContext.InsertRangeAsync<T>(sp, entities);
        }
        #endregion

        #region Update
        public Task<T> UpdateAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            return _databaseContext.UpdateAsync<T>(sp, parms);
        }

        public Task<int> UpdateRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text)
        {
            return _databaseContext.UpdateRangeAsync<T>(sp, entities);
        }
        #endregion
        public void Dispose()
        {
        }

        
    }
}
