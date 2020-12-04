using Microsoft.AspNetCore.Mvc;
using System;
using MISA.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MISA.ApplicationCore.Interfaces;

namespace MISA.CukCuk.Web.Controllers
{
    public class PositionsController : BaseController<Position> {
        public PositionsController(IBaseService<Position> baseService) : base(baseService)
        {
        }
    }
}
