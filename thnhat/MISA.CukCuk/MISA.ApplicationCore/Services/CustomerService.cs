using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    class CustomerService : BaseService<Customer>, ICustomerService
    {
        IBaseRepository<Customer> _baseRepository;
        public CustomerService(IBaseRepository<Customer> baseRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            throw new NotImplementedException();
        }

        public Customer GetCustomerById(Guid customerId)
        {
            throw new NotImplementedException();
        }

        public override ServiceResult Add(Customer entity)
        {
            //validate thông tin
            var seviceResult = new ServiceResult();
            var isValid = true;
            // Logic validate:
            if (isValid == false)
            {
                return base.Add(entity);
            } else
            {
                return seviceResult;
            }
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
