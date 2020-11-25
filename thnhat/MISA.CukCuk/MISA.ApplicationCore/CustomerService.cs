using MISA.ApplicationCore.Entity;
using MISA.Entity;
using MISA.Entity.Models;
using MISA.Infarstructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService
    {
        #region Method
        // Lấy toàn bộ danh sách khách hàng

        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: THNhat (25/11/2020)
        public IEnumerable<Customer> GetCustomer()
        {
            var customerContext = new CustomerContext();
            var customers = customerContext.GetCustomer();
            return (customers);
        }

        // Lấy thông tin khách hàng theo mã khách hàng

        /// <summary>
        /// Lấy thông tin khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="CustomerId"></param>
        /// <returns>Thông tin khách hàng</returns>
        /// CreatedBy: THNhat (25/11/2020)
        public Customer GetCustomerById(string CustomerId)
        {
            var customerContext = new CustomerContext();
            var customer = customerContext.GetCustomerById(CustomerId);
            return (customer);
        }
        // Thêm mới khách hàng
        /// <summary>
        /// Thêm khách hàng mới
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>Mã thông báo kết quả, thông báo lỗi</returns>
        /// CreatedBy: THNhat (25/11/2020)
        public ServiceResult InsertCustomer(Customer customer)
        {
            var customerContext = new CustomerContext();
            var serviceResult = new ServiceResult();
            // Validate dữ liệu, khi dữ liệu không hợp lệ trả về mô tả lỗi
            var customerCode = customer.CustomerCode;
                // Kiểm tra Validate trống mã khách hàng
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new {fielname = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
                    userMsg = "Mã khách hàng không được phép để trống",
                    Code = MISACode.Notvalid,
                };
                serviceResult.MISACode = MISACode.Notvalid;
                serviceResult.Data = msg;
                serviceResult.Messenger = "Mã khách hàng không được phép để trống";
                return serviceResult;
            }
                // Kiểm tra Validate trùng mã khách hàng đã có
            var res = customerContext.GetCustomerByCode(customerCode);
            if(res != null)
            {
                var msg = new
                {
                    devMsg = new { fielname = "CustomerCode", msg = "Mã khách hàng đã tồn tại" },
                    userMsg = "Mã khách hàng đã tồn tại",
                    Code = MISACode.Notvalid,
                };
                serviceResult.MISACode = MISACode.Notvalid;
                serviceResult.Data = msg;
                serviceResult.Messenger = "Mã khách hàng đã tồn tại";
                return serviceResult;
            }
            // Thêm mới khi dữ liệu hợp lệ
            var rowsAffected = customerContext.InsertCustomer(customer);
            serviceResult.MISACode = MISACode.Isvalid;
            serviceResult.Data = rowsAffected;
            serviceResult.Messenger = "Thêm thành công";
            return serviceResult;
        }

        // Sửa thông tin khách hàng

        // Xóa khách hàng theo khóa chính
        #endregion
    }
}
