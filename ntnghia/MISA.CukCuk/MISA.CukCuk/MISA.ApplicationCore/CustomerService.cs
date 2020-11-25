using MISA.ApplicationCore.Entities;
using MISA.Entity;
using MISA.Infrastructure;
using MISA.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService
    {
        #region Method
        //Lấy danh sách khách hàng:
        public IEnumerable<Customer> GetCustomers()
        {
            var customerContext = new CustomerContext();
            var customers = customerContext.GetCustomers();
            return customers;
        }

        //Lấy khách hàng theo id:
        public IEnumerable<Customer> GetCustomerById(string id)
        {
            var customerContext = new CustomerContext();
            var customer = customerContext.GetCustomerById(id);
            return customer;
        }

        //Thêm mới khách hàng:
        public ServiceResult InsertCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();
            var customerContext = new CustomerContext();
            //validate dữ liệu, nếu dữ liệu chưa hợp lệ thì trả về lỗi
            //Check trường bắt buộc nhập
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
                    userMsg = "Mã khách hàng không được phép để trống",
                    Code = MISACode.NotValid,
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng không được phép để trống";
                serviceResult.Data = msg;
                return serviceResult;
            }

            //Check trùng mã
            var res = customerContext.GetCustomerByCode(customerCode);
            if (res != null)
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng đã tồn tại" },
                    userMsg = "Mã khách hàng đã tồn tại",
                    Code = MISACode.NotValid,
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng đã tồn tại";
                serviceResult.Data = msg;
                return serviceResult;
            }
               
            //Thêm mới khi dữ liệu đã hợp lệ:
            var rowAffects = customerContext.InsertCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Thêm thành công";
            serviceResult.Data = rowAffects;
            return serviceResult;
        }

        //Sửa thông tin khách hàng:
        //Xóa khách hàng:
        #endregion
    }
}
