using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface danh mục khách hàng
    /// </summary>
    /// CreatedBy: NVMANH (26/11/2020)
    public interface ICustomerRepository
    {
        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns>Dánh sách khách hàng</returns>
        /// CreatedBy: NVMANH (26/11/2020)
        IEnumerable<Customer> GetCustomers();
        Customer GetCustomerById(Guid customerId);
        int AddCustomer(Customer customer);
        int UpdateCustomer(Customer customer);
        int DeleteCustomer(Guid customerId);
        Customer GetCustomerByCode(string customerCode);
    }
}
