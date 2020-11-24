using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Entity.Models;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore;
using MISA.Entity.Models;
using MySql.Data.MySqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api danh mục khách hàng
    /// CreatedBy: LTHAI(23/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        public readonly string connectionString = @"User Id=dev;Host=35.194.135.168;Port=3306;Database=MISACukCuk;Password=12345678@Abc;Character Set=utf8;";
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        [HttpGet]
        public IActionResult Get()
        {
            CustomerService customerService = new CustomerService();
            var customers = customerService.GetCustomers();
            return Ok(customers);
        }

        /// <summary>
        /// Lấy khách hàng theo CustomerId
        /// </summary>
        /// <param name="id">CustomerId</param>
        /// <returns>Khách mới CustomerId tương ứng</returns>
        /// CreatedBy: LTHAI(23/11/2020)
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            CustomerService customerService = new CustomerService();
            var customer = customerService.GetCustomerById(id);
            if(customer != null)
            {
                return Ok(customer);
            }
            return BadRequest();
        }

        /// <summary>
        /// Thêm mới một khách hàng
        /// </summary>
        /// <param name="customer">Khách hàng mới</param>
        /// <returns>
        /// + Thành công : Trả về khách hàng mới
        /// + Không thành công: BadRequest 
        /// </returns>
        /// CreatedBy: LTHAI(23/11/2020)
        [HttpPost]
        public IActionResult Post([FromBody] Customer customer)
        {
            CustomerService customerService = new CustomerService();
            var objResult = customerService.InsertCustomer(customer);
            if(objResult.MisaCode == MISACode.NotValid)
            {
                return BadRequest(objResult);
            }
            else if(objResult.MisaCode == MISACode.IsValid && Convert.ToInt32(objResult.Data) > 0)
            {
                return Ok(objResult);
            }
            return NoContent();
        }

        /// <summary>
        /// Cập nhật một khách hàng
        /// </summary>
        /// <param name="id">CustomerId</param>
        /// <param name="value">Thông tin khách hàng được cập nhật</param>
        /// <returns>
        /// + Thành công : Trả về Ok
        /// + Không thành công: NoContent
        /// </returns>
        /// CreatedBy: LTHAI(23/11/2020)
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Customer customer)
        {
            CustomerService customerService = new CustomerService();
            var objResult = customerService.UpdateCustomer(id, customer);
            if (objResult.MisaCode == MISACode.NotValid)
            {
                return BadRequest(objResult);
            }
            else if (objResult.MisaCode == MISACode.IsValid && Convert.ToInt32(objResult.Data) > 0)
            {
                return Ok(objResult);
            }
            return NoContent();
        }

        /// <summary>
        /// Cập nhật một khách hàng
        /// </summary>
        /// <param name="id">CustomerId</param>
        /// <returns>
        /// + Thành công : Trả về Ok
        /// + Không thành công: NoContent
        /// </returns>
        /// CreatedBy: LTHAI(24/11/2020)
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            CustomerService customerService = new CustomerService();
            var rowAffects = customerService.DeleteCustomerById(id);
            if(rowAffects > 0)
            {
                return Ok();
            }
            return NoContent();
        }
    }
}
