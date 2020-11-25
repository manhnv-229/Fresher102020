using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService
    {
        /// <summary>
        /// Lấy toàn bộ khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: HNANH (26/11/2020)
        IEnumerable<Customer> GetCustomers();

        /// <summary>
        /// Lấy thông tin khách hàng qua khóa chính
        /// </summary>
        /// <param name="customerId">Khóa chính trong bảng khách hàng</param>
        /// <returns>Thông tin khách hàng</returns>
        /// CreatedBy: HNANH (26/11/2020)
        Customer GetCustomerById(string customerId);

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Object khách hàng</param>
        /// <returns>Số bản ghi thêm mới</returns>
        /// CreatedBy: HNANH (26/11/2020)
        ServiceResult InsertCustomer(Customer customer);

        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="customer">Object khách hàng</param>
        /// <returns>Số bản ghi sửa được</returns>
        /// CreatedBy: HNANH (26/11/2020)
        ServiceResult UpdateCustomer(Customer customer);

        /// <summary>
        /// Xóa bản ghi khách hàng
        /// </summary>
        /// <param name="customerId">Khóa chính trong bảng khách hàng</param>
        /// <returns>Số bản ghi xóa được</returns>
        /// CreatedBy: HNANH (26/11/2020)
        ServiceResult DeleteCustomer(string customerId);
    }
}
