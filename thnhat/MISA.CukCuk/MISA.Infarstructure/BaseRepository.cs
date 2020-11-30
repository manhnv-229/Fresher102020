using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace MISA.Infarstructure
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>
    {
        #region DECLARE
        IConfiguration _iconfiguration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection;
        string _tableName;
        #endregion

        000#region Method
        public BaseRepository(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            _connectionString = _iconfiguration.GetConnectionString("MISACukcuk");
            _dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(TEntity).Name;
        }
        public int Add(TEntity entity)
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
            var rowsAffected = _dbConnection.Execute($"Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            return rowsAffected;
        }

        public int Delete(Guid entityId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> GetEntities()
        {
            // Lấy dữ liệu về và return
            var entities = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            return entities;
        }

        public TEntity GetEntityById(Guid entityId)
        {
            var entity = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}ById", new { CustomerId = entityId.ToString() }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return entity;
        }

        public int Update(TEntity entity)
        {
            throw new NotImplementedException();
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

