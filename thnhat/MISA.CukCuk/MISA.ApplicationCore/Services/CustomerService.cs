using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class CustomerService : BaseService<Customer>, ICustomerService
    {
        ICustomerRepository _customerRepository;
        public CustomerService(ICustomerRepository baseRepository) : base(baseRepository)
        {
            _customerRepository = baseRepository;
        }

        public Customer GetCustomerById(Guid customerId)
        {
            var customer = _customerRepository.GetCustomerById(customerId);
            return customer;
        }



        //        var serviceResult = new ServiceResult();
        //        // Validate dữ liệu, khi dữ liệu không hợp lệ trả về mô tả lỗi
        //        var entityCode = entity.CustomerCode;
        //            // Kiểm tra Validate trống mã khách hàng
        //            if (string.IsNullOrEmpty(customerCode))
        //            {
        //                var msg = new
        //                {
        //                    devMsg = new { fielname = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
        //                    userMsg = "Mã khách hàng không được phép để trống",
        //                    Code = MISACode.Notvalid,
        //                };
        //        serviceResult.MISACode = MISACode.Notvalid;
        //                serviceResult.Data = msg;
        //                serviceResult.Messenger = "Mã khách hàng không được phép để trống";
        //                return serviceResult;
        //            }
        //    // Kiểm tra Validate trùng mã khách hàng đã có
        //    var res = _customerRepository.GetCustomerByCode(customerCode);
        //            if (res != null)
        //            {
        //                var msg = new
        //                {
        //                    devMsg = new { fielname = "CustomerCode", msg = "Mã khách hàng đã tồn tại" },
        //                    userMsg = "Mã khách hàng đã tồn tại",
        //                    Code = MISACode.Notvalid,
        //                };
        //    serviceResult.MISACode = MISACode.Notvalid;
        //                serviceResult.Data = msg;
        //                serviceResult.Messenger = "Mã khách hàng đã tồn tại";
        //                return serviceResult;
        //            }
        //// Thêm mới khi dữ liệu hợp lệ
        //var rowsAffected = _customerRepository.AddCustomer(customer);
        //serviceResult.MISACode = MISACode.Isvalid;
        //serviceResult.Data = rowsAffected;
        //serviceResult.Messenger = "Thêm thành công";
        //return serviceResult;

    }
}
