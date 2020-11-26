using MISA.ApplicationCore.Entities;

using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.interfaces
{
    /// <summary>
    /// interface cho CustomerRepository
    /// </summary>
    /// CreatedBy: DVQuang (25/11/2020)
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetCustomers();
        Customer GetCustomerById(Guid CustomerId);
        int AddCustomer(Customer customer);
        int UpdateCustomer(Customer customer);
        int DeleteCustomer(Guid CustomerId);
        Customer GetCustomerByCode(String CustomerCode);
    }
}
