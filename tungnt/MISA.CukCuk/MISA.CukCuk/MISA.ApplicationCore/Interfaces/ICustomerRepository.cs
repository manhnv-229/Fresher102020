using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetCustomers();
        Customer GetCustomerById(string customerId);
        int InsertCustomer(Customer customer);
        int UpdateCustomer(Customer customer);
        Customer DeleteCustomer(string customerId);
        Customer GetCustomerByCode(string customerCode);
        Customer GetCustomerByPhoneNumber(string phoneNumber);

    }
}
