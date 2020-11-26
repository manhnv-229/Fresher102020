using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace MISA.Infarstructure
{
    public class CustomerRepository : ICustomerRepository
    {
        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        #endregion

        public CustomerRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
        }
        #region Method
        public int AddCustomer(Customer customer)
        {
            // Khởi tạo kết nối với Db:
            var parameters = MappingDbType(customer);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute("Proc_InsertCustomer", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (số bản ghi thêm mới được)
            return rowAffects;
        }

        public int DeleteCustomer(Guid customerId)
        {
            var res = _dbConnection.Execute("Proc_DeleteCustomerById", new { CustomerId = customerId.ToString()}, commandType: CommandType.StoredProcedure);
            return res;
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            var res = _dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }

        public Customer GetCustomerById(Guid customerId)
        {
            // Khởi tạo các commandText:
            var customers = _dbConnection.Query<Customer>("Proc_GetCustomerById",new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            // Trả về về dữ liệu:
            return customers;
        }

        public IEnumerable<Customer> GetCustomers()
        {
            // Kết nối tới CSDL:
            // Khởi tạo các commandText:
            var customers = _dbConnection.Query<Customer>("Proc_GetCustomers",commandType:CommandType.StoredProcedure);
            // Trả về về dữ liệu:
            return customers;
        }

        public int UpdateCustomer(Customer customer)
        {
            // Khởi tạo kết nối với Db:
            var parameters = MappingDbType(customer);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute("Proc_UpdateCustomer", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (số bản ghi thêm mới được)
            return rowAffects;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
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
