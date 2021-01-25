﻿using Dapper;
using Microsoft.Extensions.Caching.Memory;
using SManage.ApplicationCore.Entities.Base;
using SManage.ApplicationCore.Interfaces.DatabaseContext;
using SManage.ApplicationCore.Interfaces.Repositories;
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
        public async Task<int> ExecuteAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            return await _databaseContext.ExecuteAsync(sp, parms);
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
        public async Task<PagingData<T>> GetPagingAsync<T>(string sp, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure)
        {
            return await _databaseContext.GetPagingAsync<T>(sp, parms);
        }
        public async Task<TransportData> GetTransportData(string sp, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure)
        {
            return await _databaseContext.GetTransportData(sp, parms);
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
        public async Task<T> UpdateAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            return await _databaseContext.UpdateAsync<T>(sp, parms);
        }

        public async Task<int> UpdateRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text)
        {
            return await _databaseContext.UpdateRangeAsync<T>(sp, entities);
        }
        #endregion
        public void Dispose()
        {
            _databaseContext.Dispose();
        }

        
    }
}