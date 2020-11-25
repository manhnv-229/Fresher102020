using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService
    {
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng:
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        IEnumerable<Customer> GetCustomers();

        /// <summary>
        /// Lấy khách hàng theo id:
        /// </summary>
        /// <returns>Khách hàng có id truyền vào</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        Customer GetCustomerById(string customerId);

        /// <summary>
        /// Lấy khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>Object khách hàng đầu tiên lấy được</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        Customer GetCustomerByCode(string customerCode);

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">object khách hàng</param>
        /// <returns>Số bản ghi bị ảnh hưởng (thêm mới được)</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        ServiceResult AddCustomer(Customer customer);

        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="customer">object khách hàng cần sửa</param>
        /// <returns>Số bản ghi bị ảnh hưởng (thêm mới được)</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        ServiceResult UpdateCustomer(Customer customer);

        /// <summary>
        /// Xóa khách hàng
        /// </summary>
        /// <param name="customerId">id khách hàng cần xóa</param>
        /// <returns>Số bản ghi bị ảnh hưởng (thêm mới được)</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        ServiceResult DeleteCustomer(string customerId);
    }
}
