using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CucCuk.Web.Api
{
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeeApi : BaseApi<Employee>
    {
        #region Property
        IBaseService<Employee> _employeeService;
        #endregion Property
        #region Constructor
        public EmployeeApi(IBaseService<Employee> employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }
        #endregion Constructor
        #region Method

        #endregion Method
    }
}