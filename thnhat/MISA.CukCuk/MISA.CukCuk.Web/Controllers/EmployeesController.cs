using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Controllers
{
    public class EmployeesController : BaseController<Employee>
    {
        #region Declare
        IEmployeeService _employeeService;
        #endregion

        #region Constructor
        public EmployeesController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }
        #endregion

        #region Property
        #endregion

        #region Method
        [HttpGet("{employeeId}")]
        public IActionResult GetEmployeeById(Guid employeeId)
        {
            var employee = _employeeService.GetEmployeeById(employeeId);
            return Ok(employee);
        }

        [HttpGet("filter")]
        public IActionResult GetEmployeePaging([FromQuery] string specs, [FromQuery] Guid? DepartmentId, [FromQuery] Guid? PositionId)
        {
            return Ok(_employeeService.GetEmployeePaging(specs, DepartmentId, PositionId));
        }

        [HttpGet("EmployeeCodeMax")]
        public IActionResult GetEmployeeCodeMax()
        {
            return Ok(_employeeService.GetEmployeeCodeMax());
        }
        #endregion
    }
}
