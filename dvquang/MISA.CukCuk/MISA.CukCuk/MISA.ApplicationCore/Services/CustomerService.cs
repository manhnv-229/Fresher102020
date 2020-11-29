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
        //public override int Add(Customer entityId)
        //{
        //    var isValid = true;
        //    var customerDuplicate = _customerRepository.GetCustomerByCode(entityId.CustomerCode);
        //    if(customerDuplicate != null)
        //    {
        //        isValid = false;
        //    }
        //    if(isValid == true)
        //    {
        //        var res = base.Add(entityId);
        //        return res;
        //    }
        //    else
        //    {
        //        return 0;
        //    }
        //}

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
