using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService: ICustomerService
    {
        ICustomerRepository _customerRepository;

        #region Constructor
        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        #endregion

        #region Method

        //Lấy danh sách khách hàng:
        public IEnumerable<Customer> GetCustomers()
        {
            var customers = _customerRepository.GetCustomers();
            return customers;
        }

        //Lấy khách hàng theo id:
        public Customer GetCustomerById(string customerId)
        {
            var customer = _customerRepository.GetCustomerById(customerId);
            return customer;
        }

        public Customer GetCustomerByCode(string customerId)
        {
            var customer = _customerRepository.GetCustomerById(customerId);
            return customer;
        }

        //Thêm mới khách hàng:
        public ServiceResult AddCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();
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
               
            //Thêm mới khi dữ liệu đã hợp lệ:
            var rowAffects = _customerRepository.AddCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Thêm thành công";
            serviceResult.Data = rowAffects;
            return serviceResult;
        }

        //Sửa thông tin khách hàng:
        public ServiceResult UpdateCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();
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

            //Thêm mới khi dữ liệu đã hợp lệ:
            var rowAffects = _customerRepository.AddCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Thêm thành công";
            serviceResult.Data = rowAffects;
            return serviceResult;
        }

        //Xóa khách hàng:
        public ServiceResult DeleteCustomer(string customerId)
        {
            var serviceResult = new ServiceResult();
            // Kiểm tra id của khách hàng có hợp lệ:
            var customer = _customerRepository.GetCustomerById(customerId);
            if (customer != null)
            {
                var rowAffects = _customerRepository.DeleteCustomer(customerId);

                serviceResult.MISACode = MISACode.IsValid;
                serviceResult.Messenger = "Xóa thành công";
                serviceResult.Data = rowAffects;
            } 
            else
            {
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Không tồn tại khách hàng";
                serviceResult.Data = 0;
            }
            return serviceResult;
        }

        #endregion
    }
}
