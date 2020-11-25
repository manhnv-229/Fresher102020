using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
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
            var connectionString = "User Id=dev;Port=3306;Password=12345678@Abc;Database=MISACukCuk;Host=35.194.135.168;Character Set=utf8";
            //khởi tạo command text
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            //trả về dữ liệu
            return customers;
            
            
        }
        // lấy thông tin khách hàng theo mã khách
        // thêm mới khách hàng
        //sửa khách hàng
        //xóa khách hàng
        #endregion
    }
}
