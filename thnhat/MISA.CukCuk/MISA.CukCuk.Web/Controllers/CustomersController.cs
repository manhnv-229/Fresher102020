using Microsoft.AspNetCore.Mvc;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;
using MISA.ApplicationCore;
using MISA.Entity.Models;
using MISA.Entity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api Danh mục khách hàng
    /// CreatedBy: THNhat (24/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {

        /// <summary>
        /// Lấy toàn bộ khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: THNhat (24/11/2020)
        [HttpGet]
        public IActionResult Get()
        {
            var customerService = new CustomerService();
            var customers = customerService.GetCustomer();
            return Ok(customers);
        }

        /// <summary>
        /// Lấy danh sách khách hàng theo id và tên
        /// </summary>
        /// <param name="CustomerId">id của khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: THNhat (24/11/2020)
        [HttpGet("{CustomerId}")]
        public IActionResult Get(string CustomerId)
        {
            var customerService = new CustomerService();
            var customer = customerService.GetCustomerById(CustomerId);
            return Ok(customer);
        }

        /// <summary>
        ///  Thêm khách hàng mới
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>Các thông báo về kết quả Post</returns>
        /// CreatedBy: THNhat (25/11/2020)
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            var customerService = new CustomerService();
            var serviceResult = customerService.InsertCustomer(customer);
            if(serviceResult.MISACode == MISACode.Notvalid)
                return BadRequest(serviceResult.Data);
            if (serviceResult.MISACode == MISACode.Isvalid)
                return Created("Add thành công", serviceResult.Data);
            else
                return NoContent();
        }
        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            return Ok(1);
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(1);
        }
    }
}
