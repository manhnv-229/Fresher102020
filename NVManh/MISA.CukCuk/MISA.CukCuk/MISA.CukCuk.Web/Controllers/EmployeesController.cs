using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    public class EmployeesController : BaseEntityController<Employee>
    {
        IEmployeeService _baseService;
        public EmployeesController(IEmployeeService baseService) : base(baseService)
        {
            _baseService = baseService;
        }

        [HttpGet("filter")]
        public IActionResult GetEmployeeFilter([FromQuery] string specs,[FromQuery] Guid? departmentId, [FromQuery] Guid? positionId)
        {
            return Ok(_baseService.GetEmployeesFilter(specs, departmentId, positionId));
        }
    }
}
