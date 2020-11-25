using MISA.ApplicationCore.Entities;
using MISA.Entity;
using MISA.Infrastructure;
using MISA.Infrastructure.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService
    {
        #region Method
        // Lấy danh sách khách hàng 
        public IEnumerable<Customer> GetCustomers()
        {
            var customerContext = new CustomerContext();
            var customers = customerContext.GetCustomers();
            return customers;
        }
        // Thêm mới khách hàng 
        public ServiceResult InsertCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();
            var customerContext = new CustomerContext();
            //Validate dữ liệu 
            // Validate bắt buộc nhập dữ liệu , Nếu dữ liệu lỗi thì trả về mô tả thông báo lỗi 
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new
                    {
                        fieldName = "CustomerCode",
                        msg = "Mã khách hàng không được phép để trống"
                    },
                    userMsg = "Mã khách hàng không được phép để trống",
                    Code = MISACode.NotValid
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = " Mã khách hàng không được phép để trống";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // Validate check trùng mã 
            var res = customerContext.GetCustomerByCode(customerCode); 
            if (res != null)
            {
                var msg = new
                {
                    devMsg = new
                    {
                        fieldName = "CustomerCode",
                        msg = "Mã khách hàng đã tồn tại"
                    },
                    userMsg = "Mã khách hàng đã tồn tại",
                    Code = MISACode.NotValid
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = " Mã khách hàng không được phép để trống";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // Thêm mới khi dữ liệu đã hợp lệ 
            var rowAffects = customerContext.InsertCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = " Thêm khách hàng thành công";
            serviceResult.Data = rowAffects;
            return serviceResult;
        }
        // Sửa thông tin khách hàng 



        // Xóa khách hàng 
        #endregion
    }
}
