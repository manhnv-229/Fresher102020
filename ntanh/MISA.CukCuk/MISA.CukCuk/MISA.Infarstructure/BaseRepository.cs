using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using System.Linq;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;

namespace MISA.Infarstructure
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>
    {
        #region declare
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection;
        string _tableName = typeof(TEntity).Name;
        #endregion

        #region constructor
        public BaseRepository(IConfiguration configuration){
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
        }
        #endregion

        #region method
       
        public int AddEntity(TEntity entity)
        {
            var parameters = MappingDbType(entity);
            var rowAffects = _dbConnection.Execute($"PROC_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        public int DeleteEntity(string entityId)
        {
            var rowAffects = _dbConnection.Execute($"PROC_Delete{_tableName}ById", new { EntityId = entityId }, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        public TEntity GetEntityById(string entityId)
        {
            var entity = _dbConnection.Query<TEntity>($"PROC_Get{_tableName}ById", new { TEntityId = entityId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return entity;
        }

        public IEnumerable<TEntity> GetTEntites()
        {
            var entities = _dbConnection.Query<TEntity>($"PROC_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            return entities;
        }

        public TEntity UpdateEntity(TEntity entity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Mapping database type
        /// </summary>
        /// <typeparam name="TEntity">Kiểu dữ liệu</typeparam>
        /// <param name="entity">Dữ liệu</param>
        /// <returns>Dữ liệu được chuẩn hóa</returns>
        /// CreatedBy: NTANH 27/11/2020
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

        //private ServiceResult CheckExistCode(TEntity entityCode)
        //{
        //    var serviceResult = new ServiceResult();
        //    var res = _customerRepository.GetCustomerByCode(customerCode);
        //    if (res != null)
        //    {
        //        var msg = new
        //        {
        //            devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng đã tồn tại" },
        //            userMsg = "Mã khách hàng đã tồn tại",
        //            Code = MISACode.NotValid
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng đã tồn tại";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }
        //}

        #endregion
    }
}
