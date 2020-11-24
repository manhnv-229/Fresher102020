using Dapper;
using MISA.Entity.Entities;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
namespace MISA.Infrastructure
{
    public class CustomerDbContext
    {
        #region
        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NamPV (24/11/2020)
        public IEnumerable<Customer> GetCustomers()
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            return customers;
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo ID
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns>Thông tin khách hàng được lấy theo ID</returns>
        /// CreatedBy: NamPV (24/11/2020)
        public Customer GetCustomerById(string customerId)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>Thông tin khách hàng đầu tiên lấy được</returns>
        /// CreatedBy: NamPV (24/11/2020)
        public Customer GetCustomerByCode(string customerCode)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: NamPV (24/11/2020)
        public int InsertCustomer(Customer customer)
        {
            var properties = customer.GetType().GetProperties();
            var param = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    param.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    param.Add($"@{propertyName}", propertyValue);
                }
                if (propertyType == typeof(Boolean) || propertyType == typeof(Boolean?))
                {
                    if (propertyValue == "true")
                    {
                        param.Add($"@{propertyName}", 1);
                    }
                    else if (propertyValue == "false")
                    {
                        param.Add($"@{propertyName}", 0);
                    }
                    else
                    {
                        param.Add($"@{propertyName}", null);
                    }
                }
            }
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var rowEffects = dbConnection.Execute("Proc_InsertCustomer", param, commandType: CommandType.StoredProcedure);
            return rowEffects;
        }

        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="customer">Khách hàng cần sửa thông tin</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: NamPV (24/11/2020)
        public int UpdateCustomer(Customer customer)
        {
            var properties = customer.GetType().GetProperties();
            var param = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    param.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    param.Add($"@{propertyName}", propertyValue);
                }
                if (propertyType == typeof(Boolean) || propertyType == typeof(Boolean?))
                {
                    if (propertyValue == "true")
                    {
                        param.Add($"@{propertyName}", 1);
                    }
                    else if (propertyValue == "false")
                    {
                        param.Add($"@{propertyName}", 0);
                    }
                    else
                    {
                        param.Add($"@{propertyName}", null);
                    }
                }
            }
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var rowEffects = dbConnection.Execute("Proc_UpdateCustomer", param, commandType: CommandType.StoredProcedure);
            return rowEffects;
        }

        /// <summary>
        /// Xoá khách hàng theo ID
        /// </summary>
        /// <param name="customerId">ID khách hàng</param>
        /// CreatedBy: NamPV (24/11/2020)
        public void DeleteCustomerById(string customerId)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            dbConnection.Query<Customer>("Proc_DeleteCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure);
        }
        #endregion
    }
}
