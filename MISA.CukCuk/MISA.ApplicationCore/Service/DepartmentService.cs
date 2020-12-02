using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces.Base;
using MISA.ApplicationCore.Interfaces.IModelServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Service
{
    public class DepartmentService: BaseService<Department>, IDepartmentService
    {
        public DepartmentService(IBaseRepos<Department> baseRepos) : base(baseRepos) { }
    }
}
