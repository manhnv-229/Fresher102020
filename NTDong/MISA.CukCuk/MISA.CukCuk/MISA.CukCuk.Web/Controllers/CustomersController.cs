using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;
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
    /// createdBy:NTDong(23/11/2020)
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
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy:NTDong(23/11/2020)
        [HttpGet]
        public IActionResult Get()
        {
            var customers =  _customerService.GetCustomers();
            return Ok(customers);
        }

        /// <summary>
        /// Lấy danh sách khách hàng theo id và tên
        /// </summary>
        /// <param name="id">id cuả khách hàng </param>
        /// <param name="name">tên của khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NTDong(23/11/2020)
        [HttpGet("{Code}")]
        public IActionResult Get(string Code)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Password=12345678@Abc;Database=WEB1020_MISACukCuk_NTDong;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("Proc_GetCustomerByCustomerCode", new { CustomerCode = Code }, commandType: CommandType.StoredProcedure);
            return Ok(customers);
        }

        /// <summary>
        /// Thêm mới một khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <returns>Thông tin khách hàng đã được lưu</returns>
        /// CreatedBy: NTDong(23/11/2020)
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            var serviceResult = _customerService.AddCustomer(customer);
            if (serviceResult.MISACode == MISACode.NotValid)
            {
                return BadRequest(serviceResult.Data);
            }
            if (serviceResult.MISACode == MISACode.IsValid && (int)serviceResult.Data > 0)
            {
                return Created("value", customer);
            }
            else
            {
                return NoContent();
            }

        }

        /// <summary>
        /// Chỉnh sửa thông tin khách hàng
        /// </summary>
        /// <param name="id">Id của khách hàng</param>
        /// <param name="value">Thông tin khách hàng chỉnh sửa</param>
        /// CreatedBy: NTDong(23/11/2020)
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            return Ok(1);
        }

        /// <summary>
        /// Xóa thông tin khách hàng
        /// </summary>
        /// <param name="id">id của khách hàng muốn xóa</param>
        /// CreatedBy : NTDong(23/11/2020)
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(1);
        }
    }
}
