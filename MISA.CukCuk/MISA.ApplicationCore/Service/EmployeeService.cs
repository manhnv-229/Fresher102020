using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces.Base;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using MISA.ApplicationCore.Interfaces.IModelServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Service
{
    public class EmployeeService: BaseService<Employee>, IEmployeeService
    {
        public EmployeeService(IBaseRepos<Employee> baseRepos): base(baseRepos)
        {

        }
    }
}
