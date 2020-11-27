using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService : BaseService<Customer>, ICustomerService
    {
        ICustomerRepository _customerRepository;
        #region Constructor
        public CustomerService( ICustomerRepository customerRepository) : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }
        //public override int Add(Customer entity)
        //{
        //    // validate thông tin:
        //    var isValid = true;
        //    // 1. Check trùng mã khách hàng:
        //    var customerDuplicate = _customerRepository.GetCustomerByCode(entity.CustomerCode);
        //    if (customerDuplicate!=null)
        //    {
        //        isValid = false;
        //    }
        //    // Logic validate:
        //    if (isValid == true)
        //    {
        //        var res = base.Add(entity);
        //        return res;
        //    }
        //    else
        //    {
        //        return 0;
        //    }
           
        //}
        public IEnumerable<Customer> GetCustomerPaging(int limit, int offset)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomersByGroup(Guid departmentId)
        {
            throw new NotImplementedException();
        }
        // Sửa thông tin khách hàng:

        // Xóa khách hàng:
        #endregion
    }
}
