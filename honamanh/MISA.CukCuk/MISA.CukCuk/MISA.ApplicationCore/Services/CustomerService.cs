using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class CustomerService : BaseService<Customer>, ICustomerService
    {
        ICustomerRepository _customerRepository;
        #region Constructor
        public CustomerService(ICustomerRepository customerRepository) : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }
        #endregion

        #region Method
        protected override bool ValidateCustom(Customer entity)
        {
            return true;
        }
        //public override int Insert(Customer customer)
        //{
        //    // Validate dữ liệu
        //    var isValid = true;

        //    //1. Check trùng mã
        //    var customerDuplicate = _customerRepository.GetCustomerByCode(customer.CustomerCode);
        //    if (customerDuplicate != null)
        //    {
        //        isValid = false;
        //    }
        //    if (isValid)
        //    {
        //        return _customerRepository.Insert(customer); //gọi thẳng lên để thêm vào db
        //        //return base.Insert(customer); // gọi qua cha để thêm

        //    }
        //    return 0;
        //}
        public IEnumerable<Customer> GetCustomersByGroup(Guid customerGroupId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomerPaging(int limit, int offset)
        {
            throw new NotImplementedException();
        }
        #endregion

        //#region Method
        //public IEnumerable<Customer> GetCustomers()
        //{
        //    var customers = _customerReponsitory.GetCustomers();
        //    // var customerContext = new CustomerContext();
        //    // var customers = customerContext.GetCustomers();
        //    return customers;
        //}

        //public Customer GetCustomerById(string customerId)
        //{
        //    //var customerContext = new CustomerContext();
        //    //var customer = customerContext.GetCustomerById(customerId);
        //    var customer = _customerReponsitory.GetCustomerById(customerId);
        //    return customer;
        //}

        //public ServiceResult InsertCustomer(Customer customer)
        //{
        //    var serviceResult = new ServiceResult();
        //    //var customerContext = new CustomerContext();
        //    // Validate dữ liệu
        //    // Kiểm tra bắt buộc nhập,  nếu dữ liệu chưa hợp lệ thì trả về mô tả lỗi        
        //    var customerCode = customer.CustomerCode;
        //    if (string.IsNullOrEmpty(customerCode))
        //    {
        //        var msg = new
        //        {
        //            devMsg = new
        //            {
        //                fieldName = "CustomerCode",
        //                msg = "Mã khách hàng không được phép để trống"
        //            },
        //            userMsg = "Mã khách hàng không được phép để trống",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng không được phép để trống";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }
        //    // Kiểm tra có bị trùng mã không
        //    var customerByCode = _customerReponsitory.GetCustomerByCode(customerCode);
        //    if (customerByCode != null)
        //    {
        //        var msg = new
        //        {
        //            devMsg = new
        //            {
        //                fieldName = "CustomerCode",
        //                msg = "Mã khách hàng đã tồn tại"
        //            },
        //            userMsg = "Mã khách hàng đã tồn tại",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng đã tồn tại";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }
        //    // Kiểm tra có bị trùng sô điện thoại không
        //    var phoneNumber = customer.PhoneNumber;
        //    var customerByPhoneNumber = _customerReponsitory.GetAllCustomerByPhoneNumber(customer);
        //    if (customerByPhoneNumber != null)
        //    {
        //        var msg = new
        //        {
        //            devMsg = new
        //            {
        //                fieldName = "PhoneNumber",
        //                msg = "Số điện thoại khách hàng đã tồn tại"
        //            },
        //            userMsg = "Số điện thoại khách hàng đã tồn tại",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Số điện thoại khách hàng đã tồn tại";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }
        //    // thêm mới khi dữ liệu hợp lệ
        //    var rowAffected = _customerReponsitory.InsertCustomer(customer);
        //    serviceResult.MISACode = MISACode.IsValid;
        //    serviceResult.Messenger = "Thêm thành công";
        //    serviceResult.Data = rowAffected;
        //    return serviceResult;
        //}

        //public ServiceResult UpdateCustomer(Customer customer)
        //{
        //    //var customerContext = new CustomerContext();
        //    var serviceResult = new ServiceResult();
        //    // Validate dữ liệu, nếu không hợp lệ trả về thông báo lỗi
        //    // kiểm tra CustomerCode có bị trùng không
        //    var customerByCode = _customerReponsitory.GetAllCustomerByCode(customer);
        //    if (customerByCode != null)
        //    {
        //        var msg = new
        //        {
        //            devMsg = new
        //            {
        //                fieldName = "CustomerCode",
        //                msg = "Mã khách hàng đã tồn tại"
        //            },
        //            userMsg = "Mã khách hàng đã tồn tại",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng đã tồn tại";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    // kiểm tra số điện thoại có bị trùng
        //    var customerByPhoneNumber = _customerReponsitory.GetAllCustomerByPhoneNumber(customer);
        //    if (customerByPhoneNumber != null)
        //    {
        //        var msg = new
        //        {
        //            devMsg = new
        //            {
        //                fieldName = "PhoneNumber",
        //                msg = "Số điện thoại đã tồn tại"
        //            },
        //            userMsg = "Số điện thoại đã tồn tại",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Số điện thoại đã tồn tại";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }
        //    var rowAffected = _customerReponsitory.UpdateCustomer(customer);
        //    serviceResult.MISACode = MISACode.Success;
        //    serviceResult.Messenger = "Sửa thành công";
        //    serviceResult.Data = rowAffected;
        //    return serviceResult;

        //    // nếu dữ liệu hợp lệ, trả về thông báo hợp lệ
        //}

        //public ServiceResult DeleteCustomer(string customerId)
        //{
        //    //var customerContext = new CustomerContext();
        //    var serviceResult = new ServiceResult();
        //    var rowAffected = _customerReponsitory.DeleteCustomer(customerId);
        //    if (rowAffected > 0)
        //    {
        //        serviceResult.MISACode = MISACode.Success;
        //        serviceResult.Messenger = "Xóa thành công";
        //        serviceResult.Data = rowAffected;

        //    }
        //    else
        //    {
        //        var msg = new
        //        {
        //            devMsg = new
        //            {
        //                fieldName = "CustomerId",
        //                msg = "Không tìm thấy đường dẫn"
        //            },
        //            userMsg = "Không tìm thấy đường dẫn",
        //            Code = MISACode.NotFound,
        //        };
        //        serviceResult.MISACode = MISACode.NotFound;
        //        serviceResult.Messenger = "Không tìm thấy đường dẫn";
        //        serviceResult.Data = msg;
        //    }
        //    return serviceResult;
        //}
        //#endregion

    }
}
