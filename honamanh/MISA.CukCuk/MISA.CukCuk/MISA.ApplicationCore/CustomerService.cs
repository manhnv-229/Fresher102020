using MISA.ApplicationCore.Entities;
using MISA.Entity;
using MISA.Entity.Model;
using MISA.Infarstructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService
    {
        #region Method
        //Lấy danh sách khách hàng
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
            // Validate dữ liệu
            // Kiểm tra bắt buộc nhập,  nếu dữ liệu chưa hợp lệ thì trả về mô tả lỗi        
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
                    Code = MISACode.NotValid,
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng không được phép để trống";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // Kiểm tra có bị trùng mã không
            var customerByCode = customerContext.GetCustomerByCode(customerCode);
            if (customerByCode != null)
            {
                var msg = new
                {
                    devMsg = new
                    {
                        fieldName = "CustomerCode",
                        msg = "Mã khách hàng đã tồn tại"
                    },
                    userMsg = "Mã khách hàng đã tồn tại",
                    Code = MISACode.NotValid,
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng đã tồn tại";
                serviceResult.Data = msg;
                return serviceResult;
            }

            // thêm mới khi dữ liệu hợp lệ
            var rowAffected = customerContext.InsertCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Thêm thành công";
            serviceResult.Data = rowAffected;
            return serviceResult;
        }


        //Sửa thông tin khách hàng
        public ServiceResult UpdateCustomer(Customer customer)
        {
            var customerContext = new CustomerContext();
            var serviceResult = new ServiceResult();
            // Validate dữ liệu, nếu không hợp lệ trả về thông báo lỗi
            // kiểm tra CustomerCode có bị trùng không
            var customerByCode = customerContext.GetAllCustomerByCode(customer);
            if (customerByCode != null)
            {
                var msg = new
                {
                    devMsg = new
                    {
                        fieldName = "CustomerCode",
                        msg = "Mã khách hàng đã tồn tại"
                    },
                    userMsg = "Mã khách hàng đã tồn tại",
                    Code = MISACode.NotValid,
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng đã tồn tại";
                serviceResult.Data = msg;
                return serviceResult;
            }

            // kiểm tra số điện thoại có bị trùng
            var customerByPhoneNumber = customerContext.GetAllCustomerByPhoneNumber(customer);
            if (customerByPhoneNumber != null)
            {
                var msg = new
                {
                    devMsg = new
                    {
                        fieldName = "PhoneNumber",
                        msg = "Số điện thoại đã tồn tại"
                    },
                    userMsg = "Số điện thoại đã tồn tại",
                    Code = MISACode.NotValid,
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Số điện thoại đã tồn tại";
                serviceResult.Data = msg;
                return serviceResult;
            }
            var rowAffected = customerContext.UpdateCustomer(customer);
            serviceResult.MISACode = MISACode.Success;
            serviceResult.Messenger = "Sửa thành công";
            serviceResult.Data = rowAffected;
            return serviceResult;

            // nếu dữ liệu hợp lệ, trả về thông báo hợp lệ
        }
        //Xóa khách hàng

        public ServiceResult DeleteCustomer(string customerId)
        {
            var customerContext = new CustomerContext();
            var serviceResult = new ServiceResult();
            var rowAffected = customerContext.DeleteCustomer(customerId);
            if(rowAffected > 0)
            {
                serviceResult.MISACode = MISACode.Success;
                serviceResult.Messenger = "Xóa thành công";
                serviceResult.Data = rowAffected;
               
            }
            else
            {
                var msg = new
                {
                    devMsg = new
                    {
                        fieldName = "CustomerId",
                        msg = "Không tìm thấy đường dẫn"
                    },
                    userMsg = "Không tìm thấy đường dẫn",
                    Code = MISACode.NotFound,
                };
                serviceResult.MISACode = MISACode.NotFound;
                serviceResult.Messenger = "Không tìm thấy đường dẫn";
                serviceResult.Data = msg;
            }
            return serviceResult;
        }
        #endregion

    }
}
