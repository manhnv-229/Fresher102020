using Dapper;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace MISA.Infrastructure
{
    /// <summary>
    /// Thực thi các phương thức của ICustomerRepository
    /// </summary>
    public class CustomerRepository : ICustomerRepository
    {
        #region Attribute
        public readonly string connectionString = @"User Id=dev;Host=35.194.135.168;Port=3306;Database=MISACukCuk;Password=12345678@Abc;Character Set=utf8;";
        #endregion

        #region Method
        public IEnumerable<Customer> GetCustomers()
        {
            // Kết nối cơ sở dữ liệu 
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            // Khới tạo các commandText
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            // Trả về
            return customers;
        }
        public Customer GetCustomerById(string id)
        {
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }
        public int AddCustomer(Customer customer)
        {
            // Kết nối cơ sở dữ liệu 
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            // Chuyển đổi kiểu dữ liệu
            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    if (propertyName == "CustomerId")
                    {
                        parameters.Add(propertyName, Guid.NewGuid(), DbType.String);
                    }
                    else
                    {
                        parameters.Add(propertyName, propertyValue, DbType.String);
                    }

                }
                else if (propertyType == typeof(bool))
                {
                    if (propertyValue == null)
                    {
                        parameters.Add(propertyName, propertyValue);
                    }
                    else if (Convert.ToBoolean(propertyValue))
                    {
                        parameters.Add(propertyName, 1);
                    }
                    else
                    {
                        parameters.Add(propertyName, 0);
                    }

                }
                else
                {
                    parameters.Add(propertyName, propertyValue);
                }
            }
            // Thực hiện thêm khách hàng
            var rowAffects = dbConnection.Execute("Proc_InsertCustomer", parameters, commandType: CommandType.StoredProcedure);
            // Trả về số lượng bản ghi bị ảnh hưởng
            return rowAffects;
        }
        public Customer GetCustomerByCode(string customerCode)
        {
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var result = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return result;
        }
        public int UpdateCustomer(string id, Customer customer)
        {
            // Đổi kiểu Guid thành string nếu có
            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid?))
                {
                    parameters.Add(propertyName, propertyValue, DbType.String);
                }
                else if (propertyType == typeof(Guid))
                {
                    parameters.Add(propertyName, id);
                }
                else if (propertyType == typeof(bool))
                {
                    if (propertyValue == null)
                    {
                        parameters.Add(propertyName, propertyValue);
                    }
                    else if (Convert.ToBoolean(propertyValue))
                    {
                        parameters.Add(propertyName, 1);
                    }
                    else
                    {
                        parameters.Add(propertyName, 0);
                    }

                }
                else
                {
                    parameters.Add(propertyName, propertyValue);
                }
            }
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var rowAffects = dbConnection.Execute("Proc_UpdateCustomer", parameters, commandType: CommandType.StoredProcedure);
            // Trả về số lượng bản ghi bị ảnh hưởng
            return rowAffects;
        }
        public int DeleteCustomerById(string id)
        {
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var rowAffects = dbConnection.Execute("Proc_DeleteCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }
        #endregion
    }
}
