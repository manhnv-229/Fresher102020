using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerRepository
    {
        /// <summary>
        /// Lấy danh sách toàn bộ khách hàng khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NTANH 25/11/2020
        IEnumerable<Customer> GetCustomers();

        /// <summary>
        ///  Lấy khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>obj khách hàng</returns>
        /// CreatedBy: NTANH 25/11/2020
        Customer GetCustomerByCode(string customerCode);
        
        /// <summary>
        /// Láy thông tin khách hàng qua khóa chính
        /// </summary>
        /// <param name="customerId">Khóa chính khách hàng</param>
        /// <returns>obj khách hàng</returns>
        /// CreatedBy: NTANH 25/11/2020
        Customer GetCustomerById(string customerId);
        
        /// <summary>
        /// Thêm khách hàng
        /// </summary>
        /// <param name="customer">obj khách hàng</param>
        /// <returns>Số bản ghi thay đổi/returns>
        int AddCustomer(Customer customer);

        /// <summary>
        /// Chỉnh sửa thông tin khách hàng
        /// </summary>
        /// <param name="customer">obj khách hàng</param>
        /// <returns>khách hnagf đã thay đổi</returns>
        /// CreatedBy: NTANH 24/11/2020
        /// 
        ServiceResult UpdateCustomer(Customer customer);

        /// <summary>
        /// Xóa khách hàng
        /// </summary>
        /// <param name="customerId">Khóa chính của khách hàng</param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// CreatedBy: NTANH 25/11/2020
        int DeleteCustomer(string customerId);  
    }
}
