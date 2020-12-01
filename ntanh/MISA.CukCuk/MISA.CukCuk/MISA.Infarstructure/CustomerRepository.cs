using Dapper;
using Microsoft.AspNetCore.Mvc;
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
    public class CustomerRepository : ICustomerRepository
    {

        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        #endregion

        #region Constructor
        public CustomerRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
        }
        #endregion

        #region Method
        public int AddCustomer(Customer customer)
        {
            var parameters = MappingDbType(customer);
            var rowAffects = _dbConnection.Execute("PROC_InsertCustomer", parameters, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        public int DeleteCustomer(string customerId)
        {
            var rowAffects = _dbConnection.Execute("PROC_DeleteCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            var res = _dbConnection.Query("PROC_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }

        public IEnumerable<Customer> GetCustomers()
        {
            var customers = _dbConnection.Query<Customer>("PROC_GetCustomers", commandType: CommandType.StoredProcedure);
            return customers;
        }

        public ServiceResult UpdateCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();
            // Check trường bắt buộc nhập, nếu dữ liệu chưa hợp lệ thì trả về mô tả lỗi
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
                    userMsg = "Mã khách hàng không được phép để trống",
                    Code = MISACode.NotValid
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng không được phép để trống";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // Check trùng mã
            var res = GetCustomerByCode(customerCode);
            if (res != null)
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng đã tồn tại" },
                    userMsg = "Mã khách hàng đã tồn tại",
                    Code = MISACode.NotValid
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng đã tồn tại";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // Thêm mới khi dữ liệu đã hợp lệ
            var parameters = MappingDbType(customer);
            var rowAffects = _dbConnection.Execute("PROC_UpdateCustomer", parameters,commandType:CommandType.StoredProcedure);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Thêm thành công";
            serviceResult.Data = rowAffects;
            return serviceResult;
        }

        public Customer GetCustomerById(string customerId)
        {
            var customers = _dbConnection.Query<Customer>("PROC_GetCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customers;
        }

        /// <summary>
        /// Mapping database type
        /// </summary>
        /// <typeparam name="TEntity">Kiểu dữ liệu</typeparam>
        /// <param name="entity">Dữ liệu</param>
        /// <returns>Dữ liệu được chuẩn hóa</returns>
        /// CreatedBy: NTANH 27/11/2020
        private DynamicParameters MappingDbType<TEntity>(TEntity entity)
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

#endregion
    }
}
