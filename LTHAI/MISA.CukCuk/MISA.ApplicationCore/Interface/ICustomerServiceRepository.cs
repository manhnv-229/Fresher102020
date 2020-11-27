using MISA.ApplicationCore.Entities;
using System.Collections.Generic;

namespace MISA.ApplicationCore.Interface
{
    /// <summary>
    /// Các phương thức thực hiện nghiệp vụ của khách hàng
    /// CreatedBy: LTHAI(25/11/2020)
    /// </summary>
    public interface ICustomerServiceRepository
    {
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: LTHAI(23/11/2020)
        public IEnumerable<Customer> GetCustomers();
        /// <summary>
        ///   Lấy khách hàng theo khóa chính (CustomerId)
        /// </summary>
        /// <param name="id">khóa chính (CustomerId)</param>
        /// <returns>Một khách hàng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public Customer GetCustomerById(string customerId);
        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Thông tin mới khách hàng</param>
        /// <returns>Object thông báo</returns>
        /// CreatedBy: LTHAI(23/11/2020)
        ServiceResult AddCustomer(Customer customer);
        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="id">Khóa chính (CustomerId)</param>
        /// <param name="customer">Thông tin khách hàng cần cập nhật</param>
        /// <returns>Object thông báo</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        ServiceResult UpdateCustomer(string customerId, Customer customer);
        /// <summary>
        /// Xóa khách hàng theo khóa chính
        /// </summary>
        /// <param name="id">Khóa chính (CustomerId)</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        ServiceResult DeleteCustomerById(string customerId);
    }
}
