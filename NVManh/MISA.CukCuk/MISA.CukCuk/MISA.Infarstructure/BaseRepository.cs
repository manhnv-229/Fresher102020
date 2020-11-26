using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace MISA.Infarstructure
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>
    {
        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        string _tableName;
        #endregion

        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(TEntity).Name;
        }
        public int Add(TEntity entity)
        {
            // Khởi tạo kết nối với Db:
            var parameters = MappingDbType(entity);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (số bản ghi thêm mới được)
            return rowAffects;
        }

        public int Delete(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> GetEntities()
        {
            // Kết nối tới CSDL:
            // Khởi tạo các commandText:
            var entities = _dbConnection.Query<TEntity>($"SELECT * FROM {_tableName}", commandType: CommandType.Text);
            // Trả về về dữ liệu:
            return entities;
        }

        public TEntity GetEntityById(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public int Update(TEntity employee)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        private DynamicParameters MappingDbType(TEntity entity)
        {
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
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
    }
}
