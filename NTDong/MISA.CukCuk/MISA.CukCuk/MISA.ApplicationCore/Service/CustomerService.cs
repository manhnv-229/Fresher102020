using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService : BaseService<Employee>, ICustomerService
    {
        ICustomerRepository _customerRepository;
        #region Constructor
        public CustomerService(ICustomerRepository customerRepository) : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }

        protected override bool ValidateCustom(Employee entity)
        {
            return true;
        }

        public IEnumerable<Employee> GetCustomerPaging(int limit, int offset)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetCustomersByGroup(Guid departmentId)
        {
            throw new NotImplementedException();
        }
        // Sửa thông tin khách hàng:

        // Xóa khách hàng:
        #endregion
    }
}