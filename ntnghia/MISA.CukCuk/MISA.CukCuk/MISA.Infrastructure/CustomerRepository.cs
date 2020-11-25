using Dapper;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infrastructure
{
    public class CustomerRepository : ICustomerRepository
    {

        public IEnumerable<Customer> GetCustomers()
        {
            // Kết nối tới csdl:
            string connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTNghia; Password=12345678@Abc; Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // Khởi tạo các commandText:
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return customers;
        }

        public Customer GetCustomerById(string customerId)
        {
            // Kết nối tới csdl:
            string connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTNghia; Password=12345678@Abc; Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // Khởi tạo các commandText:
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();

            // Trả về dữ liệu:
            return customer;
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTNghia; Password=12345678@Abc; Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var res = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }

        public int AddCustomer(Customer customer)
        {
            //Khởi tạo kết nối với DB:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTNghia; Password=12345678@Abc; Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();

            //Insert khách hàng dùng Z.Dapper.Plus
            //customer.CustomerId = Guid.NewGuid();
            //var data = dbConnection.BulkInsert(customer);
            //return Ok(data);

            //Insert dùng stored:
            // Xử lý các kiểu dữ liệu (mapping dataType):
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
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

            // Thực thi commandText:
            var rowAffects = dbConnection.Execute("Proc_InsertCustomer", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (Số bản ghi thêm mới được)
            return rowAffects;
        }

        public int UpdateCustomer(Customer customer)
        {
            //Khởi tạo kết nối với DB:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTNghia; Password=12345678@Abc; Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();

            // Xử lý các kiểu dữ liệu (mapping dataType):
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
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

            // Thực thi commandText:
            var rowAffects = dbConnection.Execute("Proc_UpdateCustomer", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (Số bản ghi thêm mới được)
            return rowAffects;
        }

        public int DeleteCustomer(string customerId)
        {
            //Khởi tạo kết nối với DB:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTNghia; Password=12345678@Abc; Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);

            // Khởi tạo các commandText:
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();

            // Thực thi commandText:
            var rowAffects = dbConnection.Execute("Proc_DeleteCustomerById", customer, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (Số bản ghi xóa)
            return rowAffects;
        }
    }
}
