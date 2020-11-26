using MISA.ApplicationCore.Entities;

using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.interfaces
{
    /// <summary>
    /// interface cho CustomerService
    /// </summary>
    /// CreatedBy: DVQuang (25/11/2020)
    public interface ICustomerService
    {
        IEnumerable<Customer> GetCustomers();
        Customer GetCustomerById(Guid CustomerId);
        ServiceResult AddCustomer(Customer customer);
        ServiceResult UpdateCustomer(Customer customer);
        ServiceResult DeleteCustomer(Guid CustomerId);
    }
}
