using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities.BaseEntities;
using MISA.ApplicationCore.Interface;
using MISA.ApplicationCore.Interface.BaseInterface;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;

namespace MISA.Infrastructure.BaseRepository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        #region Attribute
        protected readonly IConfiguration _configuration;
        protected readonly string _connectionString = string.Empty;
        protected IDbConnection dbConnection = null;
        string _tableName = string.Empty;
        object fieldName = null;
        #endregion
        #region Contructor  
        public BaseRepository(IConfiguration configuration)
        {
            this._configuration = configuration;
            this._connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            this.dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(TEntity).Name;
            fieldName = new object();
        }
        #endregion

        public int Add(TEntity entity)
        {
            // Chuyển đổi kiểu dữ liệu
            var parameters = MappingDataType(entity);
            // Thực hiện thêm khách hàng
            var rowAffects = dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            // Trả về số lượng bản ghi bị ảnh hưởng
            return rowAffects;
        }

        public int Delete(string entityId)
        {
            string query = $"DELETE FROM {_tableName} WHERE {_tableName}.{_tableName}Id LIKE '{entityId}' LIMIT 1;";
            var rowAffects = dbConnection.Execute(query, commandType: CommandType.Text);
            return rowAffects;
        }

        public TEntity GetByCode(string entityCode)
        {
            string query = $"SELECT * FROM {_tableName} e WHERE e.{_tableName}Code = '{entityCode}' LIMIT 1;";
            var result = dbConnection.Query<TEntity>(query, commandType: CommandType.Text).FirstOrDefault();
            return result;
        }

        public TEntity GetById(string entityId)
        {
            string query = $"SELECT * FROM {_tableName} e WHERE e.{_tableName}Id = '{entityId}' LIMIT 1;";
            var entity = dbConnection.Query<TEntity>(query, commandType: CommandType.Text).FirstOrDefault();
            return entity;
        }

        public TEntity GetEntityByProperty(TEntity entity, PropertyInfo propertyInfo, string id = null)
        {
            
            string query = $"SELECT * FROM {_tableName} WHERE {propertyInfo.Name} = '{propertyInfo.GetValue(entity)}'";
            if (entity.entityState == EntityState.Update)
            {
                var keyValue = entity.GetType().GetProperty($"{propertyInfo.Name}").GetValue(entity);
                query = $"SELECT * FROM {_tableName} WHERE {propertyInfo.Name} = '{propertyInfo.GetValue(entity)}' AND {_tableName}Id != '{id}'";
            }
            var entityResult = dbConnection.Query<TEntity>(query, commandType: CommandType.Text).FirstOrDefault();
            return entityResult;
        }

        public IEnumerable<TEntity> Gets()
        {
            // Khới tạo các commandText
            var entities = dbConnection.Query<TEntity>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            // Trả về
            return entities;
        }

        public int Update(string entityId, TEntity entity)
        {
            var parameters = MappingDataType(entity, entityId);
            var rowAffects = dbConnection.Execute($"Proc_Update{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            // Trả về số lượng bản ghi bị ảnh hưởng
            return rowAffects;
        }


        /// <summary>
        ///  Chuyển đổi kiểu dữ liệu
        /// </summary>
        /// <typeparam name="TEntity">Generic</typeparam>
        /// <param name="entity">Đối tượng chuyển kiểu về đúng định dạng</param>
        /// <param name="id">Khóa chính (có khi cập nhật)</param>
        /// <returns>Một đối tượng có kiểu dữ liệu đã qua xử lý</returns>
        private DynamicParameters MappingDataType(TEntity entity, string id = null)
        {
            // Đổi kiểu Guid thành string nếu có
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid?))
                {
                    parameters.Add(propertyName, propertyValue, DbType.String);
                }
                else if (propertyType == typeof(Guid))
                {
                    if (!string.IsNullOrEmpty(id))
                    {
                        parameters.Add(propertyName, id);
                    }
                    else
                    {
                        parameters.Add(propertyName, Guid.NewGuid(), DbType.String);
                    }

                }
                else
                {
                    parameters.Add(propertyName, propertyValue);
                }
            }
            return parameters;
        }
    }
}
