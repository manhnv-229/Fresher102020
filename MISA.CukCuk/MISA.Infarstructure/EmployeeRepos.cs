using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infarstructure
{
    public class EmployeeRepos: BaseRepos<Employee>,IEmployeeRepos
    {
        public EmployeeRepos(IConfiguration configuration): base(configuration)
        {

        }
    }
}
