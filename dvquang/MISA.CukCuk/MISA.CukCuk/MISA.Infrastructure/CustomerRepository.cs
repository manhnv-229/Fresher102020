using Dapper;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.interfaces;
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

        public int DeleteCustomer(Guid CustomerId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomers()
        {
            // kết nối cơ sở dữ liệu
            var connectionString = "User Id=dev;Port=3306;Password=12345678@Abc;Database=WEB1020_MISACukcuk_DVQuang;Host=35.194.135.168;Character Set=utf8";
            //khởi tạo command text
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            //trả về dữ liệu
            return customers;
        }

        public Customer GetCustomerByCode(string CustomerCode)
        {
            throw new NotImplementedException();
        }

        public Customer GetCustomerById(Guid CustomerId)
        {
            throw new NotImplementedException();
        }

        public int UpdateCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}
