using SManage.ApplicationCore.Interfaces.Repositories;
using SManage.ApplicationCore.Interfaces.Service;
using SManage.ApplicationCore.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore.Services
{
    public class CustomerService : BaseService, ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        public CustomerService(ICustomerRepository customerRepository) : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }
    }
}
