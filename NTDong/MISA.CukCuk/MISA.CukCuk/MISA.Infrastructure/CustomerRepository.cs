using Dapper;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace MISA.Infrastructure
{
    public class CustomerRepository : ICustomerRepository
    {
        public int AddCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }

        public int DeleteCustomer(Guid customerId)
        {
            throw new NotImplementedException();
        }

        public Customer GetCustomeByCode(string customerCode)
        {
            throw new NotImplementedException();
        }

        public Customer GetCustomeById(Guid customerId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomers()
        {
            // Kết nối tới cơ sở dữ liệu
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Password=12345678@Abc;Database=WEB1020_MISACukCuk_NTDong;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            // Khởi tạo các comandText
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu
            return customers;
        }

        public int UpdateCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }
        
    }
}
