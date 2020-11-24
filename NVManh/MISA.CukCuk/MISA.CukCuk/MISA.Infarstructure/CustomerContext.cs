using Dapper;
using MISA.Infarstructure.Models;
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

        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NVMANH (24/11/2020)
        public IEnumerable<Customer> GetCustomers()
        {
            // Kết nối tới CSDL:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=MISACukCuk; Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            // Khởi tạo các commandText:
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            // Trả về về dữ liệu:
            return customers;
        }

        // Lấy thông tin khách hàng theo mã khách hàng:

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">object khách hàng</param>
        /// <returns>Số bản ghi bị ảnh hưởng (thêm mới được)</returns>
        /// CreatedBy: NVMANH (24/11/2020)
         public int InsertCustomer(Customer customer)
        {
            // Khởi tạo kết nối với Db:
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=MISACukCuk; Password=12345678@Abc;Character Set=utf8";
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

        /// <summary>
        /// Lấy khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>object khách hàng đầu tiên lấy được</returns>
        /// CreatedBy: NVMANH (24/11/2020)
        public Customer GetCustomerByCode(string customerCode)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=MISACukCuk; Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var res = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }

        // Thêm mới khách hàng:

        // Sửa thông tin khách hàng:

        // Xóa khách hàng theo khóa chính:

        #endregion
    }
}
