using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerServiceOld
    {
        //public Customer GetCustomerById(Guid customerId)
        //{
        //    throw new NotImplementedException();
        //}
        //#region Method
        //// Lấy danh sách khách hàng
        ///// <summary>
        ///// Lấy toàn bộ danh sách khách hàng
        ///// </summary>
        ///// <returns>List danh sách khách hàng</returns>
        ///// CreatedBy: TuongNC (24/11/2020)
        //public void GetCustomers()
        //{
        //    //var customerContext = new CustomerContext();
        //    //var customers = _customerRepository.GetCustomers();
        //    return OK("1");
        //}
        //// Lấy thông tin khách hàng theo mã khách hàng:
        //public ServiceResult AddCustomer(Customer customer)
        //{
        //    var serviceResult = new ServiceResult();
        //    // Validate dữ liệu:
        //    // Check trường bắt buộc nhập,nếu dữ liệu chưa hợp lệ thì trả về mô tả lỗi::
        //    var customerCode = customer.CustomerCode;
        //    if (string.IsNullOrEmpty(customerCode))
        //    {
        //        var msg = new
        //        {
        //            devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống," },
        //            userMsg = "Mã khách hàng không được phép để trống",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng không được phép để trống.";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    // Check trùng mã:

        //    var res = _customerRepository.GetCustomerByCode(customerCode);
        //    if (res != null)
        //    {
        //        var msg = new
        //        {
        //            devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng đã tồn tại" },
        //            userMsg = "Mã khách hàng đã tồn tại",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng không được phép để trống.";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    // Thêm mới khi dữ liệu đã hợp lệ:
        //    var rowAffects = _customerRepository.AddCustomer(customer);
        //    serviceResult.MISACode = MISACode.IsValid;
        //    serviceResult.Messenger = "Thêm thành công";
        //    serviceResult.Data = rowAffects;
        //    return serviceResult;
        //}

        //public ServiceResult UpdateCustomer(Guid customerId)
        //{
        //    throw new NotImplementedException();
        //}

        // Thêm mới khách hàng

        // Sửa thông tin khách hàng

        // Xóa khách hàng
    }
}
