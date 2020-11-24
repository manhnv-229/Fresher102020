using Dapper;
using MISA.Entity.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infrastructure
{
    public class CustomerDbContext
    {
        public readonly string connectionString = @"User Id=dev;Host=35.194.135.168;Port=3306;Database=MISACukCuk;Password=12345678@Abc;Character Set=utf8;";
        #region Method
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public IEnumerable<Customer> GetCustomers()
        {
            // Kết nối cơ sở dữ liệu 
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            // Khới tạo các commandText
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            // Trả về
            return customers;
        }

        /// <summary>
        ///   Lấy khách hàng theo khóa chính (CustomerId)
        /// </summary>
        /// <param name="id">khóa chính (CustomerId)</param>
        /// <returns>Một khách hàng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public Customer GetCustomerById(string id)
        {
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng mới</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public int InsertCustomer(Customer customer)
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
        /// <summary>
        /// Lấy khách hàng theo mã khách hàng (CustomerCode)
        /// </summary>
        /// <param name="customerCode">Mã khách hàng(CustomerCode)</param>
        /// <returns>Trả về một khách hàng đầu tiên nếu có</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public Customer GetCustomerByCode(string customerCode)
        {
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var result = dbConnection.Query("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return result;
        }

        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="id">Khóa chính (CustomerId)</param>
        /// <param name="customer">Thông tin khách hàng cần cập nhật</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
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
        /// <summary>
        ///  Xóa khách hàng theo khóa chính (CustomerId)
        /// </summary>
        /// <param name="id">Khóa chính (CustomerId) </param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public int DeleteCustomerById(string id)
        {
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var rowAffects = dbConnection.Execute("Proc_DeleteCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }
        #endregion

    }
}
