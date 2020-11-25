using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService:ICustomerService
    {
        ICustomerRepository _customerRepository;
        #region Constructor
        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }


        public ServiceResult DeleteCustomer(Guid customerId)
        {
            throw new NotImplementedException();
        }

        public Customer GetCustomeById(Guid customerId)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Method
        // Lấy danh sách khách hàng 
        public IEnumerable<Customer> GetCustomers()
        {
            var customers = _customerRepository.GetCustomers();
            return customers;
        }
        // Thêm mới khách hàng 
        public ServiceResult AddCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();
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
            var res = _customerRepository.GetCustomeByCode(customerCode);
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
            var rowAffects = _customerRepository.AddCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = " Thêm khách hàng thành công";
            serviceResult.Data = rowAffects;
            return serviceResult;
        }


        ServiceResult ICustomerService.DeleteCustomer(Guid customerId)
        {
            throw new NotImplementedException();
        }

        public ServiceResult UpdateCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }


        // Sửa thông tin khách hàng 



        // Xóa khách hàng 
        #endregion
    }
}
