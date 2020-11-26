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
        IBaseService<Employee> _baseService;

        #region Constructor
        public EmployeesController(IBaseService<Employee> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}