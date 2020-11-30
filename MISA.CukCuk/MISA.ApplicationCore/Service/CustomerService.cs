using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Enums;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Interfaces.Base;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using MISA.ApplicationCore.Interfaces.IModelService;
using MISA.ApplicationCore.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Service
{
    public class CustomerService: BaseService<Customer>  ,ICustomerService
    {
        ICustomerRepos _customerRepos;
        public CustomerService( ICustomerRepos customerRepos): base(customerRepos)
        {
            _customerRepos = customerRepos;
        }

        public override IMethodResult Insert(Customer TModel)
        {
            string customerCode = _customerRepos.GetCustomerCode(TModel.CustomerCode);
            if(customerCode == null)
            {
                return base.Insert(TModel);
            }
            else
            {
                return MethodResult.ResultWithError(error: "Not found",message: "Mã nhân viên viên bị trùng!", status: MISACode.NotValid);
            }
            
        }
        public MethodResult GetCustomerForDepartment(Guid id)
        {
            throw new NotImplementedException();
        }

        public string GetCustomerCode(string customerCode)
        {
            throw new NotImplementedException();
        }
    }
}
