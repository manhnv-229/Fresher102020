using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Z.Dapper.Plus;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api Danh mục khách hàng
    /// CreatedBy: NTNghia (23/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        ICustomerService _customerService;

        #region Constructor
        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }
        #endregion

        /// <summary>
        /// Lấy toàn bộ khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NTNghia (23/11/2020)      
        [HttpGet]
        public IActionResult Get()
        {
            var customers = _customerService.GetCustomers();
            return Ok(customers);
        }

        /// <summary>
        /// Lấy khách hàng theo id
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NTNghia (23/11/2020)      
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var customer = _customerService.GetCustomerById(id); 
            return Ok(customer);
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">object khách hàng</param>
        /// <returns>Số bản ghi bị ảnh hưởng (thêm mới được)</returns>
        /// CreatedBy: NTNghia (25/11/2020)
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            customer.CustomerId = Guid.NewGuid();
            var serviceResult = _customerService.AddCustomer(customer);

            if (serviceResult.MISACode == MISACode.NotValid)
                return BadRequest(serviceResult.Data);
            if (serviceResult.MISACode == MISACode.IsValid && (int)serviceResult.Data > 0)
                return Created("Insert customer", customer);
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
        public IActionResult Delete(string id)
        {
            var serviceResult = _customerService.DeleteCustomer(id);

            if (serviceResult.MISACode == MISACode.NotValid)
                return BadRequest(serviceResult.Messenger);
            if (serviceResult.MISACode == MISACode.IsValid && (int)serviceResult.Data > 0)
                return Delete("Delete customer");
            else
                return NoContent();
        }
    }
}
