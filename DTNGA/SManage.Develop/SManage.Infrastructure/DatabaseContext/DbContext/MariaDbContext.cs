using Dapper;
using MySql.Data.MySqlClient;
using SManage.ApplicationCore.Interfaces.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SManage.Infrastructure.DatabaseContext.DbContext
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
        public async Task<int> ExecuteAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            var result = await _dbConnection.ExecuteAsync(sp, parms, commandType: commandType);
            return result;
        }
        #endregion

        #region GET
        public async Task<T> GetAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            var result = await _dbConnection.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: commandType);
            return result;
        }

        public async Task<T> GetByIdAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            var result = await _dbConnection.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: commandType);
            return result;
        }

        public async Task<List<T>> GetAllAsync<T>(string queryCommand, CommandType commandType = CommandType.StoredProcedure)
        {
            List<T> result;
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();
                using (var tran = _dbConnection.BeginTransaction())
                {
                    try
                    {
                        result = (await _dbConnection.QueryAsync<T>(queryCommand, commandType: commandType, transaction: tran)).ToList();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        throw ex;
                    }
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
                using (var tran = _dbConnection.BeginTransaction())
                {
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
                using (var tran = _dbConnection.BeginTransaction())
                {
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
                using (var tran = _dbConnection.BeginTransaction())
                {
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

                using (var tran = _dbConnection.BeginTransaction())
                {
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
        public async Task<T> DeleteAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.Text)
        {
            T result;
            try
            {
                if (_dbConnection.State == ConnectionState.Closed)
                    _dbConnection.Open();
                using (var tran = _dbConnection.BeginTransaction())
                {
                    try
                    {
                        result = (await _dbConnection.QueryAsync<T>(sp, parms, commandType: commandType, transaction: tran)).FirstOrDefault();
                        tran.Commit();
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        throw (e);
                    }
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
                using (var tran = _dbConnection.BeginTransaction())
                {
                    try
                    {
                        result = await _dbConnection.ExecuteAsync(sp, entities, transaction: tran);
                        tran.Commit();
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        throw (e);
                    }
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
        }
    }
}
