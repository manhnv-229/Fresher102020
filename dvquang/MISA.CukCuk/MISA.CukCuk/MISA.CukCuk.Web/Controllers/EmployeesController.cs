using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.interfaces;
using MISA.ApplicationCore.Entities;

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : BaseApiController<Employee>
    {
        IEmployeeService _baseService;
        public EmployeesController(IEmployeeService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        [HttpGet("filter")]
        public IActionResult GetEmployeesFilter([FromQuery] string specs, [FromQuery] Guid? departmentId, [FromQuery] Guid? positionId)
        {

            return Ok(_baseService.GetEmployeesFilter(specs, departmentId, positionId));
        }
    }
}
