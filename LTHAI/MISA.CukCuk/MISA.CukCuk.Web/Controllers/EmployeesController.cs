using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Entities.BaseEntities;
using MISA.ApplicationCore.Interface.ServiceInterface;

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api danh mục nhân viên
    /// CreatedBy: LTHAI(30/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        #region Attribute
        private readonly IEmployeeService _employeeService;
        #endregion
        public EmployeesController(IEmployeeService employeeService)
        {
            this._employeeService = employeeService;
        }
        /// <summary>
        /// Lấy toàn bộ nhân viên
        /// </summary>
        /// <returns>Danh sách nhân viên</returns>
        [HttpGet]
        public IActionResult Get()
        {
            var employee = _employeeService.Gets();
            if (employee != null)
            {
                return Ok(employee);
            }
            return BadRequest();
        }

        /// <summary>
        /// Lấy nhân viên theo khóa chính
        /// </summary>
        /// <param name="id">khóa chính</param>
        /// <returns>Nhân viên tương ứng</returns>
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var employee = _employeeService.GetById(id);
            if (employee != null)
            {
                return Ok(employee);
            }
            return BadRequest();
        }

        /// <summary>
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="employee">Thông tin nhân viên cần thêm</param>
        /// <returns>Đối tượng thông báo</returns>
        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            var objResult = _employeeService.Add(employee);
            if (((ServiceResult)objResult).MisaCode == MISACode.NotValid)
            {
                return BadRequest(objResult);
            }
            else if (((ServiceResult)objResult).MisaCode == MISACode.IsValid && Convert.ToInt32(((ServiceResult)objResult).MisaCode) > 0)
            {
                return Ok(objResult);
            }
            return NoContent();
        }

        /// <summary>
        /// Cập nhật một nhân viên
        /// </summary>
        /// <param name="id">Khóa chính của nhân viên</param>
        /// <param name="employee">Thông tin cần cập nhật</param>
        /// <returns>Đối tượng thông báo lỗi</returns>
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Employee employee)
        {
            var objResult = _employeeService.Update(id, employee);
            if (((ServiceResult)objResult).MisaCode == MISACode.NotValid)
            {
                return BadRequest(objResult);
            }
            else if (((ServiceResult)objResult).MisaCode == MISACode.IsValid && Convert.ToInt32(((ServiceResult)objResult).MisaCode) > 0)
            {
                return Ok(objResult);
            }
            return NoContent();
        }

        /// <summary>
        /// Xóa nhân viên
        /// </summary>
        /// <param name="id">Khóa chính</param>
        /// <returns>Đối tượng thông báo lỗi</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var objResult = _employeeService.Delete(id);
            if (((ServiceResult)objResult).MisaCode == MISACode.IsValid && Convert.ToInt32(((ServiceResult)objResult).MisaCode) > 0)
            {
                return Ok(objResult);
            }
            return NoContent();
        }
    }
}
