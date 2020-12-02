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
        IBaseService<Employee> _baseService;
        public EmployeesController(IBaseService<Employee> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    } 
}
