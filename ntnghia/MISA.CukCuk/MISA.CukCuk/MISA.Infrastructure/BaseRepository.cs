using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace MISA.Infrastructure
{
    public class BaseRepository<T> : IBaseRepository<T>, IDisposable where T : BaseEntity
    {
        #region Declare
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _tableName;
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
            var entity = _dbConnection.Query<T>($"SELECT * FROM {_tableName} WHERE {_tableName}Id = '{id}'", commandType: CommandType.Text).FirstOrDefault();

            // Trả về dữ liệu:
            return entity;
        }

        public int Add(T entity)
        {
            var parameters = MappingDbType<T>(entity);

            var rowAffects = 0;
            _dbConnection.Open();
            using (var transition = _dbConnection.BeginTransaction())
            {
                // Thực thi commandText:
                rowAffects = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
                transition.Commit();
            } 
            // Trả về kết quả (Số bản ghi thêm mới được)
            return rowAffects;
        }

        public int Update(T entity)
        {
            var parameters = MappingDbType<T>(entity);

            var rowAffects = 0;
            _dbConnection.Open();
            using (var transition = _dbConnection.BeginTransaction())
            {
                // Thực thi commandText:
                rowAffects = _dbConnection.Execute($"Proc_Update{_tableName}", parameters, commandType: CommandType.StoredProcedure);
                transition.Commit();
            }
            // Trả về kết quả (Số bản ghi thêm mới được)
            return rowAffects;
        }

        public int Delete(string id)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transition = _dbConnection.BeginTransaction())
            {
                // Thực thi commandText:
                //rowAffects = _dbConnection.Execute($"Proc_Delete{_tableName}ById", id, commandType: CommandType.StoredProcedure);
                rowAffects = _dbConnection.Execute($"DELETE FROM {_tableName} WHERE {_tableName}Id = '{id}'", commandType: CommandType.Text);

                transition.Commit();
            }
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

        public T GetEntityByProperty(T entity, PropertyInfo property)
        {
            var propertyName = property.Name;
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"{_tableName}Id").GetValue(entity);
            var query = string.Empty;

            //Kiểm tra trạng thái
            if (entity.EntityState == EntityState.AddNew)
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} = '{propertyValue}'";
            else if (entity.EntityState == EntityState.Update)
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} = '{propertyValue}' AND {_tableName}Id <> '{keyValue}'";
            else
                return null;
            var entityReturn = _dbConnection.Query<T>(query, commandType: CommandType.Text).FirstOrDefault();
            return entityReturn;
        }

        //Thực thi khi object không sử dụng nữa
        public void Dispose()
        {
            if (_dbConnection.State == ConnectionState.Open)
                _dbConnection.Close();
        }

        #endregion
    }
}
