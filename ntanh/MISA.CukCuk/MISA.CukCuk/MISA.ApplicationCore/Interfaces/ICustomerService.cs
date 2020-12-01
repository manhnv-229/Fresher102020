using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService
    {
        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns>danh sách khách hàng</returns>
        /// CreatedBy: NTANH 25/11/2020
        IEnumerable<Customer> GetCustomers();

        /// <summary>
        /// Lấy khách hàng qua khóa chính
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns>obj khách hàng</returns>
        /// CreatedBy: NTANH 25/11/2020
        Customer GetCustomerById(string customerId);

        /// <summary>
        /// Lấy khách hàng qua mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>obj khách hàng</returns>
        /// CreatedBy: NTANH 25/11/2020
        Customer GetCustomerByCode(string customerCode);

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">obj khách hàng</param>
        /// <returns>Thông báo</returns>
        /// CreatedBy: NTANH 25/11/2020
        ServiceResult AddCustomer(Customer customer);

        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="customer">obj khách hàng</param>
        /// <returns>Thông báo</returns>
        /// CreatedBy: NTANH 25/11/2020
        ServiceResult UpdateCustomer(Customer customer);

        /// <summary>
        /// Xóa khách hàng
        /// </summary>
        /// <param name="customerId">Khóa chính khách hàng</param>
        /// <returns>Thông báo</returns>
        /// CreatedBy: NTANH 25/11/2020
        int DeleteCustomer(string customerId);
    }
}
