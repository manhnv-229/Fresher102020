using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService : BaseService<Customer>, ICustomerService
    {

        //IBaseRepository<Customer> _baseRepository;
        ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository) : base(customerRepository)
        {
            //_baseRepository = baseRepository;
            _customerRepository = customerRepository;
        }
        //public override ServiceResult Insert(Customer entity)
        //{
        //    var serviceResult = new ServiceResult();
        //    // validate dữ liệu
        //    var isvalid = true;
        //    var customerDuplicate = _customerRepository.GetCustomerByCode(entity.CustomerCode);
        //    if(customerDuplicate != null)
        //    {
        //        isvalid = false;
        //    }
        //    if (isvalid == true)
        //        return base.Insert(entity);
        //    else
        //    {
        //        serviceResult.Messenger = "Khong the them moi";
        //        serviceResult.Data = base.Insert(entity);
        //        serviceResult.MISACode = MISACode.NotValid;
        //        return serviceResult;
        //    }
        //}

        //public IEnumerable<Customer> GetCustomerByCode(string customerCode)
        //{
        //    throw new NotImplementedException();
        //}

        //public IEnumerable<Customer> GetCustomerByPhoneNumber(string phoneNumber)
        //{
        //    throw new NotImplementedException();
        //}

        Customer ICustomerService.GetCustomerByCode(string customerCode)
        {
            throw new NotImplementedException();
        }

        Customer ICustomerService.GetCustomerByPhoneNumber(string phoneNumber)
        {
            throw new NotImplementedException();
        }
    }
}