using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerRepository: IBaseRepository<Customer>
    {
        ///// <summary>
        ///// Lấy toàn bộ danh sách khách hàng
        ///// </summary>
        ///// <returns>Danh sách khách hàng</returns>
        ///// CreatedBy: HNANH (25/11/2020)
        //IEnumerable<Customer> GetCustomers();
        ///// <summary>
        ///// Lấy dánh sách khách hàng qua Id
        ///// </summary>
        ///// <param name="customerId">Khóa chính</param>
        ///// <returns>Khách hàng có Id = customerId</returns>
        //Customer GetCustomerById(string customerId);
        ///// <summary>
        ///// Thêm mới khách hàng
        ///// </summary>
        ///// <param name="customer">Object khách hàng</param>
        ///// <returns>Số bản ghi thêm mới</returns>
        ///// CreatedBy HNANH (25/11/2020)
        //int InsertCustomer(Customer customer);
        ///// <summary>
        ///// Sửa khách hàng
        ///// </summary>
        ///// <param name="customer">Obj khách hàng</param>
        ///// <returns>Số bản ghi được sửa</returns>
        ///// CreatedBy: HNANH (25/11/2020)
        //int UpdateCustomer(Customer customer);
        ///// <summary>
        ///// Xóa khách hàng
        ///// </summary>
        ///// <param name="customerId">Khóa chính</param>
        ///// <returns>Số bản ghi xóa được</returns>
        ///// CreatedBy: HNANH (25/11/2020)
        //int DeleteCustomer(string customerId);

        /// <summary>
        /// Lấy khách hàng qua mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>Khách hàng</returns>
        /// CreatedBy: HNANH (26/11/2020)
        Customer GetCustomerByCode(string customerCode);
        /// <summary>
        /// Lấy danh sách khách hàng qua mã khách hàng
        /// </summary>
        /// <param name="customer">Object khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: HNANH (26/11/2020)
        Customer GetAllCustomerByCode(Customer customer);
        /// <summary>
        /// Lấy danh sách khách hàng qua số điện thoại
        /// </summary>
        /// <param name="customer">Object khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: HNANH (26/11/2020)
        Customer GetAllCustomerByPhoneNumber(Customer customer);

    }
}
