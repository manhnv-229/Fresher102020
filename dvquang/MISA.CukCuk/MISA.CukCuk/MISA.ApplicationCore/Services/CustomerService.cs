using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.interfaces;
using System;
using System.Collections.Generic;


namespace MISA.ApplicationCore.Services
{
    public class CustomerService: BaseService<Customer>, ICustomerService
    {

        
        ICustomerRepository _customerRepository;
        #region Constructor
        public CustomerService( ICustomerRepository customerRepository):base(customerRepository)
        {
            _customerRepository = customerRepository;
            
        }
  

        public IEnumerable<Customer> GetCustomerByDepartment(Guid departmentId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomerPading(int limit, int offset)
        {
            throw new NotImplementedException();
        }


        #endregion

    }
}
