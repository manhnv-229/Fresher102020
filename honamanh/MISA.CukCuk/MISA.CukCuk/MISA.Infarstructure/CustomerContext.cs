using Dapper;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;


namespace MISA.Infarstructure
{
    public class CustomerContext : ICustomerRepository
    {
        #region Method
        public IEnumerable<Customer> GetCustomers()
        {
            //Kết nối đến CSDL
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            //Khởi tạo các commandtext
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            //Trả về dữ liệu
            return customers;
        }

        public Customer GetCustomerById(string customerId)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }

        public int InsertCustomer(Customer customer)
        {
            //Khởi tạo kết nối với database
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            // Xử lý các kiểu dữ liệu (mapping data type)
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
            }

            //Thực thi các mã lệnh
            //var customers = dbConnection.Query<Customer>("SELECT * FROM View_Customer ORDER BY CreatedDate ASC", commandType: CommandType.Text);
            var rowAffected = dbConnection.Execute("Proc_InsertCustomer", param, commandType: CommandType.StoredProcedure);

            //Trả về số bản ghi thêm mới được            
            return rowAffected;
        }

        public int UpdateCustomer(Customer customer)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            // Xử lý các kiểu dữ liệu (mapping data type)
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
            }
            var rowAffected = dbConnection.Execute("Proc_UpdateCustomer", param, commandType: CommandType.StoredProcedure);
            return rowAffected;
        }

        public int DeleteCustomer(string customerId)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var rowAffected = dbConnection.Execute("Proc_DeleteCustomer", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure);
            return rowAffected;
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var customerByCode = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customerByCode;
        }

        public Customer GetAllCustomerByCode(Customer customer)
        {
            var customerId = customer.CustomerId;
            string customerIdString = customerId.ToString("D");
            var customerCode = customer.CustomerCode;
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var customerByCode = dbConnection.Query<Customer>("Proc_GetAllCustomerByCode", new { CustomerId = customerIdString, CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customerByCode;
        }

        public Customer GetAllCustomerByPhoneNumber(Customer customer)
        {
            var customerId = customer.CustomerId;
            string customerIdString = customerId.ToString("D");
            var phoneNumber = customer.PhoneNumber;
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var customersByPhoneNumber = dbConnection.Query<Customer>("Proc_GetAllCustomerByPhoneNumber", new { CustomerId = customerIdString, PhoneNumber = phoneNumber }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customersByPhoneNumber;
        }

        #endregion

    }
}
