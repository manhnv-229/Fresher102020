using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interface.ServiceInterface;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api danh mục phòng ban
    /// CreatedBy: LTHAI(23/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        #region Attribute
        private readonly IDepartmentService _departmentService;
        #endregion

        #region Contructor
        public DepartmentsController(IDepartmentService departmentService)
        {
            this._departmentService = departmentService;
        }
        #endregion
        /// <summary>
        /// Lấy toàn bộ thôn tin phòng ban
        /// </summary>
        /// <returns>Danh sách phòng ban</returns>
        /// CreatedBy: LTHAI(3/12/2020)
        [HttpGet]
        public IActionResult Get()
        {
            var departments = _departmentService.Gets();
            return Ok(departments);
        }
    }
}
