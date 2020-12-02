using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CucCuk.Web.Api
{
    [Route("api/v1/departments")]
    [ApiController]
    public class DepartmentApi : BaseApi<Department>
    {
        public IBaseService<Department> _departmentService;
        public DepartmentApi(IBaseService<Department> departmentService) : base(departmentService)
        {
            _departmentService = departmentService;
        }
    }
}