using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.Infarstructure;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infrastructure
{
    public class CustomerRepository :BaseRepository<Customer> , ICustomerRepository
    {
        public CustomerRepository(IConfiguration configuration):base(configuration)
        {
            
        }
        public Customer GetCustomeByCode(string customerCode)
        {
            var customerDuplicate = _dbConnection.Query<Customer>($"SELECT * FROM Customer WHERE CustomerCode = '{customerCode}'" , commandType: CommandType.Text).FirstOrDefault();
            return customerDuplicate;
        }
    }
}
