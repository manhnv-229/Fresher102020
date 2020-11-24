using Dapper;
using MISA.Entity.Model;
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
        /// CreatedByL HNANH (24/11/2020)
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

        //Lấy thông tin khách hàng theo mã khách hàng

        //Thêm mới khách hàng
        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <returns>Số bản ghi thêm mới được</returns>
        /// CreatedByL HNANH (24/11/2020)
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
        /// <summary>
        /// Sửa khách hàng
        /// </summary>
        /// <returns>Số bản ghi được sửa</returns>
        /// CreatedByL HNANH (24/11/2020)
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
            var rowAffected = dbConnection.Execute("Proc_DeleteCustomer", new { CustomerId= customerId}, commandType: CommandType.StoredProcedure);
            return rowAffected;
        }

        /// <summary>
        /// Lấy khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>Object khách hàng đầu tiên lấy được</returns>
        /// CreatedBy: HNANH (25/11/2020)

        public Customer GetCustomerByCode(string customerCode)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var customerByCode = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customerByCode;
        }
        /// <summary>
        /// Lấy danh sách khách hàng có cùng mã khách hàng và có id khác với id khách hàng đang kiểm tra
        /// </summary>
        /// <param name="customer">Đối tượng khách hàng</param>
        /// <returns>Khách hàng đầu tiên thỏa mãn điều kiện</returns>
        /// CreadtedBy HNANH (25/11/2020)
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
        /// <summary>
        /// Lấy danh sách khách hàng có cùng số điện thoại và có id khác với id khách hàng đang kiểm tra
        /// </summary>
        /// <param name="customer">Đối tượng khách hàng</param>
        /// <returns>Khách hàng đầu tiên thỏa mãn điều kiện</returns>
        /// CreadtedBy HNANH (25/11/2020)
        public Customer GetAllCustomerByPhoneNumber(Customer customer)
        {
            var customerId = customer.CustomerId;
            string customerIdString = customerId.ToString("D");
            var phoneNumber = customer.PhoneNumber;
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            var dbConnection = new MySqlConnection(connectionString);
            var customersByPhoneNumber = dbConnection.Query<Customer>("Proc_GetAllCustomerByPhoneNumber", new {CustomerId = customerIdString, PhoneNumber = phoneNumber }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customersByPhoneNumber;
        }

        //Sửa thông tin khách hàng

        // Xóa khách hàng theo khóa chính
#endregion

    }
}
