using Dapper;
using MISA_Dictionary_GoodsService.ApplicationCore.Entities.Base;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.DatabaseContext;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.Infrastructure.DatabaseContext.DbContext
{
    /// <summary>
    /// Lớp giao tiếp với MariaDB
    /// </summary>
    /// <typeparam name="T">Đối tượng sẽ dùng để thao tác</typeparam>
    /// CreatedBy DtNga : 03/11/2020
    public class MariaDbContext : IDatabaseContext
    {
        readonly IDbConnection _dbConnection;
        /// <summary>
        /// Khởi tạo
        /// </summary>
        /// <param name="dbConnection"></param>
        public MariaDbContext(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection ?? throw new ArgumentNullException(nameof(MySqlConnection));

        }

        #region Execute
        public async Task<int> CountAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            var result = await _dbConnection.QueryFirstAsync<int>(sp, parms, commandType: commandType);
            return result;
        }
        #endregion

        #region GET
        public List<T> Get<T>(string queryCommand, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure)
        {
            return _dbConnection.Query<T>(queryCommand, commandType: commandType).ToList();
        }

        public async Task<T> GetByIdAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            var result = await _dbConnection.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: commandType);
            return result;
        }

        public async Task<List<T>> GetAsync<T>(string queryCommand, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure)
        {
            List<T> result;
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();
                using var tran = _dbConnection.BeginTransaction();
                try
                {
                    result = (await _dbConnection.QueryAsync<T>(queryCommand, param: parms, commandType: commandType, transaction: tran)).ToList();
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();
            }
            return result;
        }



        #endregion

        #region INSERT 
        public async Task<int> InsertRangeAsync<T>(string sp, List<object> parms, CommandType commandType = CommandType.Text)
        {
            var result = 0;
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();
                using var tran = _dbConnection.BeginTransaction();
                try
                {
                    result = (await _dbConnection.ExecuteAsync(sp, parms, transaction: tran));
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();
            }
            return result;

        }

        public async Task<T> InsertAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();
                using var tran = _dbConnection.BeginTransaction();
                try
                {
                    result = (await _dbConnection.QueryAsync<T>(sp, parms, commandType: commandType, transaction: tran)).FirstOrDefault();
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();
            }
            return result;
        }

        #endregion

        #region UPDATE    
        public async Task<T> UpdateAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();
                using var tran = _dbConnection.BeginTransaction();
                try
                {
                    result = (await _dbConnection.QueryAsync<T>(sp, parms, commandType: commandType, transaction: tran)).FirstOrDefault();
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();
            }
            return result;
        }

        public async Task<int> UpdateRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text)
        {
            var result = 0;
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();

                using var tran = _dbConnection.BeginTransaction();
                try
                {
                    result = (await _dbConnection.ExecuteAsync(sp, entities, transaction: tran));
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();
            }
            return result;
        }

        #endregion

        #region DELETE
        public async Task<T> DeleteAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();
                using var trans = _dbConnection.BeginTransaction();
                try
                {
                    result = (await _dbConnection.QueryAsync<T>(sp, parms, commandType: commandType, transaction: trans)).FirstOrDefault();
                    trans.Commit();
                }
                catch (Exception e)
                {
                    trans.Rollback();
                    throw (e);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
            finally
            {
                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();
            }

            return result;
        }

        public async Task<int> DeleteRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text)
        {
            int result;
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();
                using var trans = _dbConnection.BeginTransaction();
                try
                {
                    result = await _dbConnection.ExecuteAsync(sp, entities, transaction: trans);
                    trans.Commit();
                }
                catch (Exception e)
                {
                    trans.Rollback();
                    throw (e);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
            finally
            {
                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();
            }
            return result;
        }
        #endregion
        public void Dispose()
        {
            _dbConnection.Close();
        }

        public async Task<PagingData<T>> GetPagingAsync<T>(string sp, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure)
        {
            PagingData<T> pagingData = new PagingData<T>();
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();
                using var tran = _dbConnection.BeginTransaction();
                try
                {
                    parms.Add("@TotalRecord", dbType: DbType.Int32, direction:ParameterDirection.Output);
                    pagingData.Data = (await _dbConnection.QueryAsync<T>(sp, param: parms, commandType: commandType, transaction: tran)).ToList();
                    pagingData.Total = parms.Get<int>("@TotalRecord");
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (_dbConnection.State == ConnectionState.Open)
                    _dbConnection.Close();
            }
            return pagingData;
        }
    }
}
