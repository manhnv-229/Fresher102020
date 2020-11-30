using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces.IModelRepos
{
    public interface ICustomerRepos : IBaseRepos<Customer>
    {
        public MethodResult GetCustomerForDepartment(Guid id);

        public string GetCustomerCode(string customerCode);
    }
}
