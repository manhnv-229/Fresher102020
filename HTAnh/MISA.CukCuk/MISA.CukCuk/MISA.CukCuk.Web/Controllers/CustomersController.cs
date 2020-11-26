using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySql.Data.MySqlClient;
using MISA.ApplicationCore;
using MISA.Entity.Models;
using MISA.Entity;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
	/// <summary>
	/// Api danh mục khách hàng
	/// CreatedBy: HTAnh (23/11/2020)
	/// </summary>
	[Route("api/v1/[controller]")]
	[ApiController]
	public class CustomersController : ControllerBase
	{
		/// <summary>
		/// Lấy toàn bộ khách hàng
		/// </summary>
		/// <returns>Danh sách khách hàng</returns>
		/// CreatedBy: HTAnh (23/11/2020)
		[HttpGet]
		public IActionResult Get()
		{
			var customerService = new CustomerService();
			var customers = customerService.GetCustomers();
			return Ok(customers);
		}

		// GET api/<CustomersController>/5
		[HttpGet("{id}")]
		public IActionResult Get(String id)
		{
			var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_HTAnh;Password=12345678@Abc; Character Set=utf8";
			IDbConnection dbConnection = new MySqlConnection(connectionString);
			var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure);
			return Ok(customer);
		}

		// POST api/<CustomersController>
		[HttpPost]
		public IActionResult Post( Customer customer)
		{
			var customerService = new CustomerService();
			var serviceResult = customerService.InsertCustomer(customer);
			if (serviceResult.MISACode == MISACode.NotValid)
			{
				return BadRequest(serviceResult.Data);
			}
			if (serviceResult.MISACode == MISACode.IsValid && (int)serviceResult.Data > 0)
			{
				return Created("adfd", customer);
			}
			else
			{
				return NoContent();
			}
			//return Created("Add Customer", customer);
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
