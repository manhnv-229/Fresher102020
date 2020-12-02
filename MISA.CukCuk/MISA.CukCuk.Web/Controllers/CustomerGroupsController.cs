using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces.Base;
using MISA.ApplicationCore.Interfaces.IModelServices;

namespace MISA.CukCuk.Web.Controllers
{
    public class CustomerGroupsController : BaseController<IBaseService<CustomerGroup>,CustomerGroup>
    {
        public CustomerGroupsController(IBaseService<CustomerGroup> customerGroupService): base(customerGroupService) { }
    }
}
