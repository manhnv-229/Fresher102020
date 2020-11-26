﻿using MISA.ApplicationCore.Entities;
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
        IBaseRepository<Customer> _customerRepository;
        #region Constructor
        public CustomerService(IBaseRepository<Customer> customerRepository) : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }



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
