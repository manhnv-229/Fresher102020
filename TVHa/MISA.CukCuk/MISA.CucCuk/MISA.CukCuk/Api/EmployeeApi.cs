using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.Common.Models;

namespace MISA.CukCuk.Api
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeeApi : BaseApi<Employee>
    {
        IEmployeeService _employeeService;
        public EmployeeApi(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }

        /// <summary>
        /// Lấy mã nhân viên lớn nhất trong database
        /// </summary>
        /// Author: TVHa (17/10/2020)
        /// <returns></returns>
        [HttpGet("{getcode}/{maxcode}")]
        public IActionResult GetMaxEmployeeCode()
        {
            try
            {
                string rs = _employeeService.GetMaxEmployeeCode();
                int maxCode = Int32.Parse(rs.Replace("NV", "")) + 1;
                return Ok("NV" + maxCode);
            }
            catch (Exception)
            {
                return NoContent();
            }
        }

        //[HttpPost("{fileUpLoad}")]
        //public IActionResult PostImage([FromBody] IFormFile file)
        //{
        //    try
        //    {
        //        string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/content/upload", file.FileName);
        //        using (Stream stream = new FileStream(path, FileMode.Create))
        //        {
        //            file.CopyTo(stream);
        //        }
        //        return StatusCode(StatusCodes.Status201Created);
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError);
        //    }
        //}
    }
}