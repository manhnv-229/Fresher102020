using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System.Data;
using System.Linq;

namespace MISA.Infrastructure
{
    public class CustomerRepository :BaseRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(IConfiguration configuration):base(configuration)
        {
            
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            var customerDuplicate = _dbConnection.Query<Customer>($"SELECT * from Customer where CustomerCode = '{customerCode}'", commandType: CommandType.Text).FirstOrDefault();
            return customerDuplicate;
        }
    }
}
