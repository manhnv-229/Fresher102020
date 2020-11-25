using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    #region Method
    public class CustomerService:ICustomerService
    {
        ICustomerRepository _customerRepository;
        #region Constructor
        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        public Customer GetCustomerById(string customerId)
        {
            var customer = _customerRepository.GetCustomerById(customerId);
            return customer;
        }
        #endregion
        #region Method
        //Lấy khách hàng theo id
        //Them moi
        public ServiceResult InsertCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();
            // Validate dữ liệu:
            // Check trường bắt buộc nhập,nếu dữ liệu chưa hợp lệ thì trả về mô tả lỗi::
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống," },
                    userMsg = "Mã khách hàng không được phép để trống",
                    Code = MISACode.NotValid,
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng không được phép để trống.";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // Check trùng mã 
            var res = _customerRepository.GetCustomerByCode(customerCode);
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
            // check trùng số điện thoại
            var phoneNumber = customer.PhoneNumber;
            var ress = _customerRepository.GetCustomerByPhoneNumber(phoneNumber);
            if (ress != null)
            {
                var msg = new
                {
                    devMsg = new { fieldName = "PhoneNumber", msg = "Số điện thoại đã tồn tại" },
                    userMsg = "Số điện thoại đã tồn tại",
                    Code = MISACode.NotValid,
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Số điện thoại đã tồn tại";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // Thêm mới khi dữ liệu đã hợp lệ:
            var rowAffects = _customerRepository.InsertCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Thêm thành công";
            serviceResult.Data = rowAffects;
            return serviceResult;
        }
        //Xoa khach hang
        public ServiceResult DeleteCustomer(string id)
        {
            var serviceResult = new ServiceResult();
            var del = _customerRepository.DeleteCustomer(id);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Xóa thành công";
            serviceResult.Data = del;
            return serviceResult;
        }

        public ServiceResult UpdateCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();
            var update = _customerRepository.UpdateCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Sửa thành công";
            serviceResult.Data = update;
            return serviceResult;
        }

        public IEnumerable<Customer> GetCustomers()
        {
            var customers = _customerRepository.GetCustomers();
            return customers;
        }

        public Customer GetCustomerByPhoneNumber(string phoneNumber)
        {
            var customer = _customerRepository.GetCustomerByPhoneNumber(phoneNumber);
            return customer;
        }

        #endregion
    }
}
#endregion