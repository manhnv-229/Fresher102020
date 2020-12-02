using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces.Base;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using MISA.ApplicationCore.Interfaces.IModelServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Service
{
    public class PossitionService: BaseService<Possition>, IPossitionService
    {
        public PossitionService(IBaseRepos<Possition> baseRepos): base(baseRepos) { }
    }
}
