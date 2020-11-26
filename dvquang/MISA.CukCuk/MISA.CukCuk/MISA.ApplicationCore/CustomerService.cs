using MISA.ApplicationCore.Entities;
using MISA.Entity.Models;
using MISA.Infrastructure;
using System.Collections.Generic;


namespace MISA.ApplicationCore
{
    public class CustomerService
    {
        #region Method
        /// <summary>
        /// lấy danh sách khách hàng
        /// </summary>
        /// <returns>customers danh sách</returns>
        /// CreatedBy: DVQuang (25/11/2020)
        public IEnumerable<Customer> GetCustomers()
        {
            var customerContext = new CustomerContext();
            var customers = customerContext.GetCustomers();
            return customers;
        }
        /// <summary>
        /// thêm mới khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>serviceResult thêm mới thành công</returns>
        /// CreatedBy: DVQuang (25/11/2020)
        public ServiceResult InsertCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();

            var customerContext = new CustomerContext();

            // validate dữ liệu
            // kiểm tra trường dữ liệu không hợp lệ
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "mã khách hàng không được để trống" },
                    userMsg = "mã khách hàng không được phép để trống",
                    code = MISACode.NotValid,

                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "mã khách hàng không được phép để trống";
                serviceResult.Data = msg;
               
                return serviceResult;
            }
            // check trùng mã
            var res = customerContext.GetCustomerByCode(customerCode);
            if (res != null)
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "mã khách hàng đã tồn tại" },
                    userMsg = "mã khách hàng đã tồn tại",
                    code = MISACode.NotValid,

                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "mã khách hàng đã tồn tại";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // thêm mới nếu dữ liệu nếu ok
            var row = customerContext.InsertCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "thêm mới khách hàng thành công";
            serviceResult.Data = row;
            return serviceResult;
        }
        // sửa khách hàng
        // xóa khách hàng
        #endregion
    }
}
