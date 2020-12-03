using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infarstructure
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository  
    {
        public CustomerRepository(IConfiguration iconfiguration) : base(iconfiguration)
        {

        }

        public Customer GetCustomerByCode(string customCode)
        {
            var customer = _dbConnection.Query<Customer>($"Proc_GetCustomerByCode", new { CustomerCode = customCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }

        public Customer GetCustomerById(Guid customerId)
        {
            var customer = _dbConnection.Query<Customer>($"Proc_GetCustomerById", new { CustomerId = customerId.ToString() }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customer;
        }
    }
}
