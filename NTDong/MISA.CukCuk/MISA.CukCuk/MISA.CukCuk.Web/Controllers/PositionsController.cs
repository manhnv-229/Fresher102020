using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PositionsController : BaseEntityController<Position> 
    {
        IBaseService<Position> _baseService;
        public PositionsController(IBaseService<Position> baseService):base(baseService)
        {
            _baseService = baseService;
        }
    }
}
