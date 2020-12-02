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
            if (employee.Count() > 0)
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
        [HttpPut]
        public IActionResult Put([FromBody] Employee employee)
        {
            var objResult = _employeeService.Update(employee.EmployeeId.ToString(), employee);
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
        /// <summary>
        /// Lấy danh sách trạng thái làm việc
        /// CreatedBy: LTHAI(1/12/2020)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("employeecodemax")]
        public IActionResult GetEmployeeCodeMax()
        {
            var employeeCodeMax = _employeeService.GetEmployeeCodeMax();
            if (employeeCodeMax != null)
            {
                return Ok(employeeCodeMax);
            }
            return BadRequest();
        }
        /// <summary>
        /// Lấy danh sách nhân viên theo chức vụ
        /// CreatedBy: LTHAI(1/12/2020)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("filterPosition")]
        public IActionResult GetEmployeesByPositionId([FromQuery]string positionId)
        {
            var employees = _employeeService.GetEmployeesByPositionId(positionId);
            if (employees.Count() > 0)
            {
                return Ok(employees);
            }
            return BadRequest();
        }
        /// <summary>
        /// Lấy danh sách nhân viên theo phòng ban
        /// CreatedBy: LTHAI(2/12/2020)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("filterDepartment")]
        public IActionResult GetEmployeesByDepartmentId([FromQuery] string departmentId)
        {
            var employees = _employeeService.GetEmployeesByDepartMentId(departmentId);
            if (employees.Count() > 0)
            {
                return Ok(employees);
            }
            return BadRequest();
        }
        /// <summary>
        /// Lấy danh sách nhân viên theo giá trị nhập
        /// CreatedBy: LTHAI(2/12/2020)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("filter")]
        public IActionResult GetEmployeesByDynamicValue([FromQuery] string value)
        {
            var employees = _employeeService.GetEmployeesByDynamicValue(value);
            if (employees.Count() > 0)
            {
                return Ok(employees);
            }
            return BadRequest();
        }
    }
}
