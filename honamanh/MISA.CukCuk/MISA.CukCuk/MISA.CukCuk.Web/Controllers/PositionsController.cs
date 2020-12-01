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
    public class PositionsController : ControllerBase
    {
        IBaseService<Position> _baseService;
        public PositionsController(IBaseService<Position> baseService)
        {
            _baseService = baseService;
        }
        // GET: api/<EntitiesController>
        [HttpGet]
        public IActionResult Get()
        {
            var entities = _baseService.GetEntities();
            return Ok(entities);
        }
    }
}
