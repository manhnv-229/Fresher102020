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
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity:BaseEntity
    {
        #region DECLARE
        IConfiguration _configuration;
        string connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _tableName = string.Empty;
        #endregion
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(connectionString);
            _tableName = typeof(TEntity).Name;
        }

        public int Add(TEntity entity)
        {
            // Xử lý các kiểu dữ liệu (mapping dataType):
            var parameters = MappingDbType(entity);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (số bản ghi thêm mới được)
            return rowAffects;
        }

        public int Delete(Guid entityId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> GetEntities()
        {
            // Kết nối CSDL
            var entities = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            return entities;
        }

        public TEntity GetEntityById(Guid entityId)
        {
            throw new NotImplementedException();
        }

        public int Update(TEntity entity)
        {
            throw new NotImplementedException();
        }

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

        public TEntity GetEntityByProperty(TEntity entity, PropertyInfo property)
        {
            var propertyName = property.Name;
            var propertyValue = property.GetValue(entity);
            var query = string.Empty;
            var keyValue = entity.GetType().GetProperty($"{_tableName}Id").GetValue(entity);
            if (entity.EntityStage == EntityStage.Add)
            {
                query = $"Select * from {_tableName} where {propertyName} = '{propertyValue}'";
            }
            else if (entity.EntityStage == EntityStage.Update)
            {
                query = $"Select * from {_tableName} where {propertyName} = '{propertyValue}' and {_tableName}Id <> '{keyValue}'";
            }
            else
                return null;
            return _dbConnection.Query<TEntity>(query, commandType: CommandType.Text).FirstOrDefault();
        }
    }
}
