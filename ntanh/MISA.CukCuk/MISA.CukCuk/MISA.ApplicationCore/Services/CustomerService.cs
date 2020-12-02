using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;

namespace MISA.ApplicationCore
{
    public class CustomerService:BaseService<Customer>, ICustomerService
    {
        IBaseRepository<Customer> _baseRepository;
        ICustomerRepository _customerRepository;
        #region Constructor
        public CustomerService(IBaseRepository<Customer> baseRepository, ICustomerRepository customerRepository) : base(baseRepository)
        {
            _baseRepository = baseRepository;
            _customerRepository = customerRepository;
        }

        public override int AddEntity(Customer entity)
        {
            // Validate thông tin:
            var isValid = true;
            // 1.Check trùng mã khách hàng
            var customerDuplicate = _customerRepository.GetCustomerByCode(entity.CustomerCode);
            if(customerDuplicate != null)
            {
                isValid = false;
            }
            // Logic validate
            if(isValid == true)
            {
                var res = _customerRepository.AddEntity(entity);
                return res;
            }
            else
            {
                return 0;
            }
        }

        public IEnumerable<Customer> GetCustomerByGroup(Guid groupId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomerPaging(int limit, int offset)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region Method



        #endregion
    }
}
