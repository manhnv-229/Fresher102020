using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Dapper;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;

namespace MISA.Infrastructure
{
    public class CustomerRepository : ICustomerRepository
    {
        public Customer DeleteCustomer(string customerId)
        {
            // Kết nối tới CSDL:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=Web1020_MISACukcuk_NTTung; Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            // Khởi tạo các commandText:
            var del = dbConnection.Query<Customer>("Proc_DeleteCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            // Trả về về dữ liệu:
            return del;
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=Web1020_MISACukcuk_NTTung; Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var res = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }

        public Customer GetCustomerById(string customerId)
        {
            // Kết nối tới CSDL:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=Web1020_MISACukcuk_NTTung; Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            // Khởi tạo các commandText:
            var customers = dbConnection.Query<Customer>("Proc_GetCustomerById",new {CustomerId = customerId }, commandType: CommandType.StoredProcedure).SingleOrDefault();
            // Trả về về dữ liệu:
            return customers;
        }

        public Customer GetCustomerByPhoneNumber(string phoneNumber)
        {
            // Kết nối tới CSDL:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=Web1020_MISACukcuk_NTTung; Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            // Khởi tạo các commandText:
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerByPhoneNumber", new { PhoneNumber = phoneNumber }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            // Trả về về dữ liệu:
            return customer;
        }

        public IEnumerable<Customer> GetCustomers()
        {
            // Kết nối tới CSDL:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=Web1020_MISACukcuk_NTTung; Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            // Khởi tạo các commandText:
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            // Trả về về dữ liệu:
            return customers;
        }

        public int InsertCustomer(Customer customer)
        {
            // Kết nối tới CSDL:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=Web1020_MISACukcuk_NTTung; Password=12345678@Abc;Character Set=utf8";
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
            var rowAffects = dbConnection.Execute("Proc_InsertCustomer", parameters, commandType: CommandType.StoredProcedure);
            // Trả về kết quả (số bản ghi thêm mới được)
            return rowAffects;
        }

        public int UpdateCustomer(Customer customer)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=Web1020_MISACukcuk_NTTung; Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            //var customerId = customer.CustomerId;
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
            var res = dbConnection.Execute("Proc_UpdateCustomer", parameters, commandType: CommandType.StoredProcedure);
            return res;
        }
    }
}
