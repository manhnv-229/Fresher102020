using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infarstructure
{
    public class DepartmentRepos: BaseRepos<Department>, IDepartmentRepos
    {
        public DepartmentRepos(IConfiguration configuration): base(configuration) { }
    }
}
