using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;

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
        #endregion

        #region Method
        public IEnumerable<Customer> GetCustomers()
        {
            var customers = _customerRepository.GetCustomers();
            return customers;
        }
        // Thêm mới khách hàng
        public ServiceResult AddCustomer(Customer customer)
        {
            var serviceResult = new ServiceResult();
            // Check trường bắt buộc nhập, nếu dữ liệu chưa hợp lệ thì trả về mô tả lỗi
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
                    userMsg = "Mã khách hàng không được phép để trống",
                    Code = MISACode.NotValid
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng không được phép để trống";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // Check trùng mã
            var res = _customerRepository.GetCustomerByCode(customerCode);
            if(res != null)
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng đã tồn tại" },
                    userMsg = "Mã khách hàng đã tồn tại",
                    Code = MISACode.NotValid
                };
                serviceResult.MISACode = MISACode.NotValid;
                serviceResult.Messenger = "Mã khách hàng đã tồn tại";
                serviceResult.Data = msg;
                return serviceResult;
            }
            // Thêm mới khi dữ liệu đã hợp lệ
            var rowAffects = _customerRepository.AddCustomer(customer);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Thêm thành công";
            serviceResult.Data = rowAffects;
            return serviceResult;
        }

        //public int UpdateCustomer(Customer customer)
        //{
        //    var res = _customerRepository.UpdateCustomer(customer);
        //    return res;
        //}

        public Customer GetCustomerById(string customerId)
        {
            var customer = _customerRepository.GetCustomerById(customerId);
            return customer;
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            var customer = _customerRepository.GetCustomerByCode(customerCode);
            return customer;
        }

        public int DeleteCustomer(string customerId)
        {
            var rowAffects = _customerRepository.DeleteCustomer(customerId);
            return rowAffects;
        }

        public ServiceResult UpdateCustomer(Customer customer)
        {
            var res = _customerRepository.UpdateCustomer(customer);
            return res;
        }

        public IEnumerable<Customer> GetTEntites()
        {
            throw new NotImplementedException();
        }

        public Customer GetEntityById(string entityId)
        {
            throw new NotImplementedException();
        }

        public int AddEntity(Customer entity)
        {
            throw new NotImplementedException();
        }

        public Customer UpdateEntity(Customer entity)
        {
            throw new NotImplementedException();
        }

        public int DeleteEntity(string entityId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
