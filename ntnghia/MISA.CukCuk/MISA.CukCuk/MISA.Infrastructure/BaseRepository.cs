using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infrastructure
{
    public class BaseRepository<T> : IBaseRepository<T>
    {
        #region Declare
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        string _tableName;
        #endregion

        #region Constructor
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(T).Name;
        }
        #endregion

        #region Method
        public IEnumerable<T> GetEntities()
        {
            // Khởi tạo các commandText:
            var entities = _dbConnection.Query<T>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return entities;
        }

        public T GetEntityById(string id)
        {
            // Khởi tạo các commandText:
            var entity = _dbConnection.Query<T>($"Proc_Get{_tableName}ById", new { CustomerId = id }, commandType: CommandType.StoredProcedure).FirstOrDefault();

            // Trả về dữ liệu:
            return entity;
        }

        public int Add(T entity)
        {
            var parameters = MappingDbType<T>(entity);

            //Insert khách hàng dùng Z.Dapper.Plus
            //customer.CustomerId = Guid.NewGuid();
            //var data = dbConnection.BulkInsert(customer);
            //return Ok(data);

            //Insert dùng stored:

            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (Số bản ghi thêm mới được)
            return rowAffects;
        }

        public int Update(T entity)
        {
            var parameters = MappingDbType<T>(entity);

            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_Update{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (Số bản ghi thêm mới được)
            return rowAffects;
        }

        public int Delete(string id)
        {
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute("Proc_DeleteCustomerById", id, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (Số bản ghi xóa)
            return rowAffects;
        }

        private DynamicParameters MappingDbType<TEntity>(TEntity entity)
        {
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            // Xử lý các kiểu dữ liệu (mapping dataType):
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }
            return parameters;
        }


        #endregion
    }
}
