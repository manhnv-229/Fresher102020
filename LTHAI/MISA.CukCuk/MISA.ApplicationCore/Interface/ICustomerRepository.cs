using MISA.ApplicationCore.Entities;
using System.Collections.Generic;


namespace MISA.ApplicationCore.Interface
{
    public interface ICustomerRepository
    {
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public IEnumerable<Customer> GetCustomers();

        /// <summary>
        ///   Lấy khách hàng theo khóa chính (CustomerId)
        /// </summary>
        /// <param name="id">khóa chính (CustomerId)</param>
        /// <returns>Một khách hàng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public Customer GetCustomerById(string customerId);
        /// <summary>
        /// Lấy khách hàng theo mã khách hàng (CustomerCode)
        /// </summary>
        /// <param name="customerCode">Mã khách hàng(CustomerCode)</param>
        /// <returns>Trả về một khách hàng đầu tiên nếu có</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public Customer GetCustomerByCode(string customerCode);
        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng mới</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        int AddCustomer(Customer customer);
        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="id">Khóa chính (CustomerId)</param>
        /// <param name="customer">Thông tin khách hàng cần cập nhật</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        int UpdateCustomer(string customerId, Customer customer);
        /// <summary>
        ///  Xóa khách hàng theo khóa chính (CustomerId)
        /// </summary>
        /// <param name="id">Khóa chính (CustomerId) </param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        int DeleteCustomerById(string customerId);
    }
}
