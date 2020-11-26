using Dapper;

using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infrastructure
{
    public class CustomerContext
    {
        #region Method
        /// <summary>
        /// lấy toànn bộ danh sách khách hàng
        /// </summary>
        /// <returns>danh sách khách hàng</returns>
        /// CreatedBy: DVQuang (25/11/2020)
        public IEnumerable<Customer> GetCustomers(){
            // kết nối cơ sở dữ liệu
            var connectionString = "User Id=dev;Port=3306;Password=12345678@Abc;Database=WEB1020_MISACukcuk_DVQuang;Host=35.194.135.168;Character Set=utf8";
            //khởi tạo command text
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            //trả về dữ liệu
            return customers;
            
            
        }
        /// <summary>
        /// thêm mới khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>số bản ghi thêm được</returns>
        /// CreatedBy: DVQuang(25/11/2020)
        // thêm mới khách hàng
        public int InsertCustomer(Customer customer)
        {
            // kết nối cơ sở dữ liệu
            var connectionString = "User Id=dev;Port=3306;Password=12345678@Abc;Database=WEB1020_MISACukcuk_DVQuang;Host=35.194.135.168;Character Set=utf8";
            //khởi tạo command text
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();
            // xử lí các kiểu dữ liệu
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid)||propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{ propertyName}", propertyValue, DbType.String);

                } else
                {
                    parameters.Add($"@{ propertyName}", propertyValue);
                }
            }
            // thực thi câu kệnh thêm mới khách
            var row = dbConnection.Execute("Proc_InsertCustomer",parameters, commandType: CommandType.StoredProcedure);
            //trả về số bản ghi thêm mới được
            return row;
        } 
        /// <summary>
        /// lấy khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>object khách hàng lấy được</returns>
        /// CreatedBy: DVQuang (25/11/2020)
        public Customer GetCustomerByCode(string customerCode)
        {
            var connectionString = "User Id=dev;Port=3306;Password=12345678@Abc;Database=WEB1020_MISACukcuk_DVQuang;Host=35.194.135.168;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var res = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }
        //sửa khách hàng
        //xóa khách hàng
        #endregion
    }
}
