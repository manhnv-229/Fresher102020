using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.Entity;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace MISA.Infrastructure
{
    public class BaseRepository<T> : IBaseRepository<T> where T: BaseEntity
    {
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _tableName;

        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConectionString");
            _dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(T).Name;
        }

        public int Delete(string entityId)
        {
            var id = new DynamicParameters();
            var tId = _tableName + "Id";
            id.Add($"@{tId}", entityId);
            var rowAffects = _dbConnection.Execute($"Proc_Delete{_tableName}ById",id, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        public IEnumerable<T> Get()
        {
            var res = _dbConnection.Query<T>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            return res;
        }

        public T GetEntityById(string entityId)
        {
            var id = new DynamicParameters();
            var tId = _tableName + "Id";
            id.Add($"@{tId}", entityId);
            var entity = _dbConnection.Query<T>($"Proc_Get{_tableName}ById", id, commandType: CommandType.StoredProcedure).SingleOrDefault();
            return entity;
        }

        public int Insert(T entity)
        {
            var parameters = MappingDbType(entity);
            var rowAffects = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        public int Update(T entity)
        {
            var parameters = MappingDbType(entity);
            var rowAffects = _dbConnection.Execute($"Proc_Update{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        private DynamicParameters MappingDbType(T entity)
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
            if (entity.EntityState == EntityState.AddNew)
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} = '{propertyValue}'";
            else if (entity.EntityState == EntityState.Update)
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} = '{propertyValue}' AND {_tableName}Id <> '{keyValue}'";
            else
                return null;
            var entityReturn = _dbConnection.Query<T>(query, commandType: CommandType.Text).FirstOrDefault();
            return entityReturn;
        }
    }
}
