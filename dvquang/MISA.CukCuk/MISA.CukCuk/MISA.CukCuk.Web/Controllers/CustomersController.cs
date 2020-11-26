
using System.Data;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore;
using MISA.Entity.Models;
using MISA.Infrastructure;
using MySql.Data.MySqlClient;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        /// <summary>
        /// Get api
        /// </summary>
        /// <returns>200</returns>
        /// CreatedBy: DVQuang (24/11/2020)
        [HttpGet]
        public IActionResult Get()

        {
            var customerService = new CustomerService();
            var customers = customerService.GetCustomers();
            return Ok(customers);
        }

        /// <summary>
        /// GET api/<CustomersController>
        /// </summary>
        /// <param name="id"></param>
        /// <returns>200 ok</returns>
        /// CreatedBy: DVQuang (24/11/2020)
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var connectionString = "User Id=dev;Port=3306;Password=12345678@Abc;Database=WEB1020_MISACukcuk_DVQuang;Host=35.194.135.168;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("Proc_GetCustomerById",new {CustomerId = id }, commandType: CommandType.StoredProcedure);
  
            return Ok(customers);
        }

        /// <summary>
        /// POST api/<CustomersController>
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>kết quả trạng thái</returns>
        /// CreatedBy: DVQuang (24/11/2020)
        [HttpPost]
        public IActionResult Post(Customer customer)
            
        {
            var customerService = new CustomerService();
            var serviceResult = customerService.InsertCustomer(customer);
            if(serviceResult.MISACode == MISACode.NotValid)          
                return BadRequest(serviceResult.Data);       
            if (serviceResult.MISACode == MISACode.IsValid && (int) serviceResult.Data > 0)           
                return Created("addd", customer);
            else         
                return NoContent();
            
        }

        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
