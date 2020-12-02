using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces.IModelServices;

namespace MISA.CukCuk.Web.Controllers
{

    public class PossitionsController : BaseController<IPossitionService,Possition>
    {
        public PossitionsController(IPossitionService possitionService): base(possitionService) { }
    }
}
