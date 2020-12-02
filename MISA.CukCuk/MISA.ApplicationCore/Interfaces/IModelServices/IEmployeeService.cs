using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces.IModelServices
{
    public interface IEmployeeService: IBaseService<Employee>
    {
        public IMethodResult<List<Employee>> GetEmployeeByPropertyValue(String propertyValue);
    }
}
