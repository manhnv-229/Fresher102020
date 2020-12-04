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

namespace MISA.Infarstructure
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>, IDisposable where TEntity:BaseEntity
    {
        #region DECLARE
        IConfiguration _iconfiguration;
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection;
        protected string _tableName;
        #endregion

        #region Method
        public BaseRepository(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            _connectionString = _iconfiguration.GetConnectionString("MISACukcuk");
            _dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(TEntity).Name;
        }
        public int Add(TEntity entity)
        {
            var parameters = MappingDbType(entity);
            var rowsAffected = 0;
            _dbConnection.Open();
            using(var transaction = _dbConnection.BeginTransaction())
            {
                    rowsAffected = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
                    transaction.Commit();
            }
            return rowsAffected;
        }

        public int Delete(Guid entityId)
        {
            var rowsAffected = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var query = $"DELETE FROM {_tableName} WHERE {_tableName}id = '{entityId.ToString()}'";
                    rowsAffected = _dbConnection.Execute(query, commandType: CommandType.Text);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
                
            }
            return rowsAffected;
        }

        public IEnumerable<TEntity> GetEntities()
        {
            // Lấy dữ liệu về và return
            var entities = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            return entities;
        }

        public int Update(TEntity entity)
        {
            var parameters = MappingDbType(entity);
            var rowsAffected = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    rowsAffected = _dbConnection.Execute($"Proc_Update{_tableName}", parameters, commandType: CommandType.StoredProcedure);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
                
            }
            return rowsAffected;
        }

        public TEntity GetEntityByProperty(TEntity entity, PropertyInfo property)
        {
            var propertyName = property.Name;
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"{_tableName}Id").GetValue(entity);
            var query = string.Empty;
            if (entity.EntityState == EntityState.AddNew)
            {
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} = '{propertyValue}'";
            } else if (entity.EntityState == EntityState.Update)
            {
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} = '{propertyValue}' and {_tableName}Id <> '{keyValue.ToString()}'";
            }
            else
            {
                return null;
            }
            var entityRes = _dbConnection.Query<TEntity>(query, commandType: CommandType.Text).FirstOrDefault();
            return entityRes;
        }
        public DynamicParameters MappingDbType(TEntity entity)
        {
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            // Format lại dữ liệu chuẩn với Database
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                // Đổi kiểu Guid và Guid? thành string
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add(propertyName, propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add(propertyName, propertyValue);
                }
            }
            return parameters;
        }

        public void Dispose()
        {
            if(_dbConnection.State == ConnectionState.Open)
            {
                _dbConnection.Close();
            }
        }
        #endregion

    }
}

//asdas

//public Customer GetCustomerByCode(string customerCode)
//{
//    var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_TNNhat; Password=12345678@Abc; Character Set=utf8";
//    var dbConnection = new MySqlConnection(connectionString);
//    var customer = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
//    return customer;

