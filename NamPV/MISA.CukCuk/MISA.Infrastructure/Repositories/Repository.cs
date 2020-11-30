using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Entities.Base;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace MISA.Infrastructure.Repositories
{
    public class Repository<TEntity> : IDisposable, IRepository<TEntity> where TEntity : BaseEntity
    {
        #region DECLARE
        private readonly IConfiguration _configuration;
        protected readonly IDbConnection _dbConnection;
        protected readonly string _entityName;
        protected readonly string _entityId;
        //private readonly DynamicParameters parameters;
        #endregion
        public Repository(IConfiguration configuration)
        {
            _configuration = configuration;
            var connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(connectionString);
            _entityName = typeof(TEntity).Name;
            _entityId = _entityName + "Id";
        }

        public int DeleteEntityById(Guid entityId)
        {
            var param = new DynamicParameters();
            param.Add($"@{_entityId}", entityId.ToString());
            var rowEffects = _dbConnection.Execute($"Proc_Delete{_entityName}ById", param, commandType: CommandType.StoredProcedure);
            return rowEffects;
        }

        public IEnumerable<TEntity> GetEntities()
        {
            var entities = _dbConnection.Query<TEntity>($"Proc_Get{_entityName}s", commandType: CommandType.StoredProcedure);
            return entities;
        }

        public TEntity GetEntityById(Guid entityId)
        {
            var param = new DynamicParameters();
            param.Add($"@{_entityId}", entityId.ToString());
            var entity = _dbConnection.Query<TEntity>($"Proc_Get{_entityName}ById", param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return entity;
        }

        public int InsertEntity(TEntity entity)
        {
            var param = MappingDbType(entity);
            var rowEffects = _dbConnection.Execute($"Proc_Insert{_entityName}", param, commandType: CommandType.StoredProcedure);
            return rowEffects;
        }

        public int UpdateEntity(TEntity entity)
        {
            var param = MappingDbType(entity);
            var rowEffects = _dbConnection.Execute($"Proc_Update{_entityName}", param, commandType: CommandType.StoredProcedure);
            return rowEffects;
        }

        public DynamicParameters MappingDbType(TEntity entity)
        {
            var properties = entity.GetType().GetProperties();
            var param = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    param.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else if (propertyType == typeof(Boolean) || propertyType == typeof(Boolean?))
                {
                    var value = ((bool)propertyValue == true ? 1 : 0);
                    param.Add($"@{propertyName}", value, DbType.Int32);
                }
                else
                {
                    param.Add($"@{propertyName}", propertyValue);
                }
            }
            return param;
        }

        public TEntity GetEntityByProperty(TEntity entity, PropertyInfo property)
        {
            var propertyName = property.Name;
            var propertyValue = property.GetValue(entity);
            var query = string.Empty;
            if (entity.EntityState == EntityState.AddNew)
                query = $"SELECT * FROM {_entityName} where {propertyName} = '{propertyValue}'";
            else if (entity.EntityState == EntityState.Update)
                query = $"SELECT * FROM {_entityName} where {propertyName} = '{propertyValue}' " +
                    $"AND {_entityId} <> '${entity.GetType().GetProperty($"{_entityId}").GetValue(entity)}'";
            else return null;
            return _dbConnection.Query<TEntity>(query, commandType: CommandType.Text).FirstOrDefault();
        }

        public void Dispose()
        {
            if (_dbConnection.State == ConnectionState.Open)
                _dbConnection.Close();
        }
    }
}
