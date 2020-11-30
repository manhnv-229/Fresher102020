using MISA.ApplicationCore.Entites;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerRepository
    {
        public IEnumerable<Entites.Customer> GetCustomers();
        Entites.Customer GetCustomerById(Guid customerId);
        int AddCustomer(Entites.Customer customer);
        int UpdateCustomer(Entites.Customer customer);
        int DeleteCustomer(Guid customerId);
        Entites.Customer GetCustomerByCode(string customerCode);
    }
}
