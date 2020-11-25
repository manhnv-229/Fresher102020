using Dapper;
using MISA.Entity.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infarstructure
{
    public class CustomerContext
    {
        #region Method
        // Lấy toàn bộ danh sách khách hàng

        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: THNhat (25/11/2020)
        public IEnumerable<Customer>   GetCustomer()
        {
            // Kết nối Database
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_TNNhat; Password=12345678@Abc; Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            // Lấy dữ liệu về và return
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            return customers;
        }

        // Lấy thông tin khách hàng theo Id khách hàng

        /// <summary>
        /// Lấy thông tin khách hàng theo Id khách hàng
        /// </summary>
        /// <param name="CustomerId"></param>
        /// <returns>Thông tin khách hàng</returns>
        /// CreatedBy: THNhat (25/11/2020)
        public Customer GetCustomerById(string CustomerId)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_TNNhat; Password=12345678@Abc; Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById",new {CustomerId = CustomerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }

        // Lấy thông tin khách hàng theo mã khách hàng

        /// <summary>
        /// Lấy thông tin khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="CustomerCode"></param>
        /// <returns>Thông tin khách hàng</returns>
        /// CreatedBy: THNhat (25/11/2020)
        public Customer GetCustomerByCode(string CustomerCode)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_TNNhat; Password=12345678@Abc; Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = CustomerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }

        // Thêm mới khách hàng
        public int InsertCustomer(Customer customer)
        {
            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();
            // Format lại dữ liệu chuẩn với Database
            foreach(var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
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
            var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_TNNhat; Password=12345678@Abc; Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var rowsAffected = dbConnection.Execute("InsertCustomer", parameters, commandType: CommandType.StoredProcedure);
            return rowsAffected;
        }

        // Sửa thông tin khách hàng

        // Xóa khách hàng theo khóa chính
        #endregion
    }
}
