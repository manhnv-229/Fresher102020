using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using MySql.Data.MySqlClient;
using MISA.ApplicationCore;
using MISA.Entity.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api Danh mục Khách hàng
    /// CreatedBy HNANH (24/11/2020)
    /// </summary>
    [Route("api/v1/customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách hàng</returns>
        /// CrearedBy HNANH (24/11/2020)
        // GET: api/<CustomersController>
        [HttpGet]
        public IActionResult Get()
        {
            var customerService = new CustomerService();
            var customers = customerService.GetCustomers();
            return Ok(customers);
        }
        /// <summary>
        /// Lấy danh sách khách hàng theo id
        /// </summary>
        /// <param name="id">Khóa chính</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy HNANH (25/11/2020)
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168; Port= 3306; Database= WEB1020_MISACukcuk_HNAnh; Password= 12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            //var customers = dbConnection.Query<Customer>("SELECT * FROM View_Customer ORDER BY CreatedDate ASC", commandType: CommandType.Text);
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure);
            return Ok(customer);
        }

        // POST api/<CustomersController>
        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Object khách hàng</param>
        /// <returns>Số khách hàng thêm mới</returns>
        /// CreatedBy HNANH (25/11/2020)
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            var customerService = new CustomerService();
            var serviceResult = customerService.InsertCustomer(customer);

            if (serviceResult.MISACode == Entity.MISACode.IsValid && (int)serviceResult.Data > 0)
            {
                return Created("Success", 1);
            }
            if (serviceResult.MISACode == Entity.MISACode.NotValid)
            {
                return BadRequest(serviceResult.Data);
            }
            else
            {
                return NoContent();
            }

        }

        // PUT api/<CustomersController>/5
        /// <summary>
        /// Sửa khách hàng
        /// </summary>
        /// <param name="customer">Object khách hàng</param>
        /// <returns>Kết quả sửa</returns>
        /// CreatedBy HNANH (25/11/2020)
        [HttpPut()]

        //TODO: Cần chỉnh sửa để trả về: Không được quyền sửa
        public IActionResult Put(Customer customer)
        {
            var customerService = new CustomerService();
            var serviceResult = customerService.UpdateCustomer(customer);
            if (serviceResult.MISACode == Entity.MISACode.Success && (int)serviceResult.Data > 0)
            {
                return Ok((int)serviceResult.Data);
            }
            else
            {
                return BadRequest(serviceResult.Data);
            }
        }
        /// <summary>
        /// Xóa bản ghi khách hàng
        /// </summary>
        /// <param name="id">Khóa chính</param>
        /// <returns>Thông điệp sau khi xóa</returns>
        /// CreatedBy: HNANH (25/11/2020)
        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var customerService = new CustomerService();
            var serviceResult = customerService.DeleteCustomer(id);

            if (serviceResult.MISACode == Entity.MISACode.Success)
            {
                return Ok(serviceResult.Data);
            }
            else
            {
                return NotFound(serviceResult.Data);
            }
        }
    }
}
