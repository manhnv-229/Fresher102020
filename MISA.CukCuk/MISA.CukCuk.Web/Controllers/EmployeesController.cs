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
    public class EmployeesController : BaseController<IEmployeeService, Employee>
    {
        IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }

        //[Route("search")]
        [HttpGet("search/{propertyValue}")]
        public IActionResult SearchByProperty(string propertyValue)
        {
            var result = _employeeService.GetEmployeeByPropertyValue(propertyValue);
            return Ok(result);
        }
    }
}
