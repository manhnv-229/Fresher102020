using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api Danh mục nhân viên
    /// CreatedBy: NTNghia (23/11/2020)
    /// </summary>
    public class EmployeesController : BaseApiController<Employee>
    {
        IEmployeeService _employeeService;

        #region Constructor
        public EmployeesController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }
        #endregion
    }
}