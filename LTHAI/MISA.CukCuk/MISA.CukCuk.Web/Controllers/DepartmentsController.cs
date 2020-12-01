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
        [HttpGet]
        public IActionResult Get()
        {
            var departments = _departmentService.Gets();
            return Ok(departments);
        }

        // GET api/<DepartmentsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<DepartmentsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DepartmentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DepartmentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
