using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using MySql.Data.MySqlClient;
//using MISA.CukCuk.Web.Model;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Entities;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api danh mục khách hàng
    /// CreatedBy: NTTUNG (23/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        ICustomerService _customerService;
        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }
        /// <summary>
        /// Lấy toàn bộ khách hàng
        /// createdby nttung (23/11/2020)
        /// </summary>
        /// <returns></returns>
        // GET: api/<CustomersController>
        [HttpGet]
        public IActionResult Get()
        {
            var customers = _customerService.GetCustomers();
            return Ok(customers);
        }
        /// <summary>
        /// Lấy danh sách khách hàng theo id 
        /// </summary>
        /// <param name="id">id của khách hàng</param>
        /// <returns></returns>
        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var customer = _customerService.GetCustomerById(id);
            return Ok(customer);
        }
        /// <summary>
        /// validate va thmem oi du lieu cho bang khach hang
        /// CreatedBy: NTTUNG (23/11/2020)
        /// </summary>
        /// <param Customers="customers">Một object thông tin khách hàng</param>
        /// <returns>Thông báo khi gặp lỗi, thành công trả về 201</returns>
        // POST api/<CustomersController>
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            var serviceResult = _customerService.InsertCustomer(customer);
            if (serviceResult.MISACode == Entity.MISACode.NotValid)
                return BadRequest(serviceResult.Data);
            if (serviceResult.MISACode == Entity.MISACode.IsValid && (int)serviceResult.Data > 0)
                return Created("adfd", customer);
            else
                return NoContent();
        }

        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(string id,[FromBody] Customer customer)
        {
            var serviceResult = _customerService.UpdateCustomer(customer);
            return Ok(serviceResult);

        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var serviceResult = _customerService.DeleteCustomer(id);
            return Ok(serviceResult);
        }
    }
}
