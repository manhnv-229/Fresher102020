using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.interfaces;
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
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _tableName = null;
        #endregion
        #region Constructor
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(TEntity).Name;
        }

        #endregion
        public int Add(TEntity entity)
        {
            var parameters = MappingDbType(entity);

            // thực thi câu kệnh thêm mới khách
            var row = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            //trả về số bản ghi thêm mới được
            return row;
        }

        public int Delete(Guid customerId)
        {
            var res = _dbConnection.Execute($"Proc_Delete{_tableName}ById", new { CustomerId = customerId.ToString() }, commandType: CommandType.StoredProcedure);
            return res;
        }

        public TEntity GetEntityById(Guid customerId)
        {
            var res = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}ById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }

        public IEnumerable<TEntity> GetEntitis()
        {
            var entitis = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            return entitis;
        }

        public int Update(TEntity entity)
        {
            // Khởi tạo kết nối với Db:
            var parameters = MappingDbType(entity);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_Update{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (số bản ghi thêm mới được)
            return rowAffects;
        }
        /// <summary>
        /// mapping dữ liệu
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: DVQuang (29/11/2020)
        private DynamicParameters MappingDbType(TEntity entity)
        {
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            // xử lí các kiểu dữ liệu
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{ propertyName}", propertyValue, DbType.String);

                }
                else
                {
                    parameters.Add($"@{ propertyName}", propertyValue);
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
            if (entity.EntityState == EntityState.Addnew)
            {
                query = $"SELECT * FROM {_tableName} WHERE {propertyName}='{propertyValue}'";
            }
            else if (entity.EntityState == EntityState.Update)
                query = $"SELECT * FROM {_tableName} WHERE {propertyName}='{propertyValue}' AND {_tableName}Id <> '{keyValue}'";
            else
                return null;
            var entityReturn = _dbConnection.Query<TEntity>(query, commandType: CommandType.Text).FirstOrDefault();
            return entityReturn;
        }
    }
}
