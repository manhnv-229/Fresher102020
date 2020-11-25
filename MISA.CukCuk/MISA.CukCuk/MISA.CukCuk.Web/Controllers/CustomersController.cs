
using System.Data;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore;
using MISA.CukCuk.Web.Models;
using MySql.Data.MySqlClient;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        // GET: api/<CustomersController>
        [HttpGet]
        public IActionResult Get()

        {
            var customerService = new CustomerService();
            var customers = customerService.GetCustomers();
            return Ok(customers);
        }

        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var connectionString = "User Id=dev;Port=3306;Password=12345678@Abc;Database=MISACukCuk;Host=35.194.135.168;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("Proc_GetCustomersById",new {CustomerId = id }, commandType: CommandType.StoredProcedure);
  
            return Ok(customers);
        }

        // POST api/<CustomersController>
        [HttpPost]
        public IActionResult Post(Customer customer)
            
        {
            var connectionString = "User Id=dev;Port=3306;Password=12345678@Abc;Database=MISACukCuk;Host=35.194.135.168;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var row = dbConnection.Execute("Proc_InsertCustomer", customer, commandType: CommandType.StoredProcedure);

            if (row > 0)
            {
                return Created("addd", customer);
            } else
            {
                return NoContent();
            }
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
