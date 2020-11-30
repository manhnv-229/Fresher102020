using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class CustomerService : BaseService<Customer>, ICustomerService
    {
        #region clare
        ICustomerRepository _customerRepository;
        #endregion

        #region constructor
        public CustomerService(ICustomerRepository customerRepository) : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }
        #endregion
        //public override ServiceResult Add(Customer entity)
        //{
        //    var customerDuplicate = _customerRepository.GetCustomerByCode(entity.CustomerCode);
        //    var isValid = true;
        //    if (customerDuplicate == null)
        //        isValid = false;
        //    if (isValid)
        //        return base.Add(entity);
        //    else
        //        return 0;
        //}
        public IEnumerable<Customer> GetCustomerByCode(int limit, int offset)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomerByGroupId(Guid CustomerGroupId)
        {
            throw new NotImplementedException();
        }
    }
}
