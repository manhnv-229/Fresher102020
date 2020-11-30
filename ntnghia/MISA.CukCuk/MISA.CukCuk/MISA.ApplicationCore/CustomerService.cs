using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService: BaseService<Customer>, ICustomerService
    {
        ICustomerRepository _customerRepository;
        #region Constructor
        public CustomerService(ICustomerRepository customerRepository) : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }
        #endregion

        #region Method

        public Customer GetCustomerByCode(string customerId)
        {
            return _customerRepository.GetCustomerByCode(customerId);
        }

        protected override bool CustomValidate(Customer customer)
        {
            //validate riêng tại con:
            return true;
        }
        //public override int Add(Customer entity)
        //{
        //    //validate dữ liệu, nếu dữ liệu chưa hợp lệ thì trả về lỗi
        //    var isValid = true;
        //    //Check trùng mã khách hàng:
        //    var customerDuplicate = _customerRepository.GetCustomerByCode(entity.CustomerCode);
        //    if(customerDuplicate != null)
        //    {
        //        isValid = false;
        //    }
        //    //Check trường bắt buộc nhập

        //    if(isValid == true)
        //    {
        //        var res = base.Add(entity);
        //        return res;
        //    }
        //    else
        //    {
        //        return 0;
        //    }
        //}

        //Thêm mới khách hàng:
        //public ServiceResult AddCustomer(Customer customer)
        //{
        //    var serviceResult = new ServiceResult();
        //    //validate dữ liệu, nếu dữ liệu chưa hợp lệ thì trả về lỗi
        //    //Check trường bắt buộc nhập
        //    var customerCode = customer.CustomerCode;
        //    if (string.IsNullOrEmpty(customerCode))
        //    {
        //        var msg = new
        //        {
        //            devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
        //            userMsg = "Mã khách hàng không được phép để trống",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng không được phép để trống";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    //Check trùng mã
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
        //        serviceResult.Messenger = "Mã khách hàng đã tồn tại";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    //Thêm mới khi dữ liệu đã hợp lệ:
        //    var rowAffects = _customerRepository.AddCustomer(customer);
        //    serviceResult.MISACode = MISACode.IsValid;
        //    serviceResult.Messenger = "Thêm thành công";
        //    serviceResult.Data = rowAffects;
        //    return serviceResult;
        //}

        //Sửa thông tin khách hàng:
        //public ServiceResult UpdateCustomer(Customer customer)
        //{
        //    var serviceResult = new ServiceResult();
        //    //validate dữ liệu, nếu dữ liệu chưa hợp lệ thì trả về lỗi
        //    //Check trường bắt buộc nhập
        //    var customerCode = customer.CustomerCode;
        //    if (string.IsNullOrEmpty(customerCode))
        //    {
        //        var msg = new
        //        {
        //            devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
        //            userMsg = "Mã khách hàng không được phép để trống",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng không được phép để trống";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    //Check trùng mã
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
        //        serviceResult.Messenger = "Mã khách hàng đã tồn tại";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    //Thêm mới khi dữ liệu đã hợp lệ:
        //    var rowAffects = _customerRepository.AddCustomer(customer);
        //    serviceResult.MISACode = MISACode.IsValid;
        //    serviceResult.Messenger = "Thêm thành công";
        //    serviceResult.Data = rowAffects;
        //    return serviceResult;
        //}

        ////Xóa khách hàng:
        //public ServiceResult DeleteCustomer(string customerId)
        //{
        //    var serviceResult = new ServiceResult();
        //    // Kiểm tra id của khách hàng có hợp lệ:
        //    var customer = _customerRepository.GetCustomerById(customerId);
        //    if (customer != null)
        //    {
        //        var rowAffects = _customerRepository.DeleteCustomer(customerId);

        //        serviceResult.MISACode = MISACode.IsValid;
        //        serviceResult.Messenger = "Xóa thành công";
        //        serviceResult.Data = rowAffects;
        //    } 
        //    else
        //    {
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Không tồn tại khách hàng";
        //        serviceResult.Data = 0;
        //    }
        //    return serviceResult;
        //}

        public IEnumerable<Customer> GetCustomerPaging(int limit, int offset)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomersByDepartment(Guid departmentId)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
