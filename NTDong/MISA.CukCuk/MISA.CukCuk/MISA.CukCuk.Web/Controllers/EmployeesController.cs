using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api Danh mục khách hàng 
    /// createdBy:NTDong(23/11/2020)
    /// </summary>

    public class EmployeesController : BaseEntityController<Employee>
    {
        /// <summary>
        /// Api quản lí nhân viên 
        /// </summary>
        IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }
        [HttpGet("filter")]
        public IActionResult GetEmployeeFilter([FromQuery] string specs , [FromQuery] Guid? departmentId ,[FromQuery] Guid? positionId)
        {
            return Ok(_employeeService.GetEmployeesFilter(specs, departmentId, positionId));
        }
    } 
}
