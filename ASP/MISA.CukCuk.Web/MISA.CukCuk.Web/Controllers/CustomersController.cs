using Dapper;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCuk.Web.Models;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Linq;
using Z.Dapper.Plus;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// API danh mục khách hàng
    /// createdby ngochtb(26/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// createdby ngochtb(26/11/2020)
        [HttpGet]
        public IActionResult Get()
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_HBNgoc;Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("select * from Customer", commandType: CommandType.Text);

            return Ok(customers);
        }

        /// <summary>
        /// Lấy danh sách khách hàng theo tên và theo id
        /// </summary>
        /// <param name="id">id của khách hàng</param>
        /// <param name="name">Tên của khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// createdby ngochtb(26/11/2020)
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_HBNgoc;Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure);

            return Ok(customers);
        }

        // POST api/<CustomersController>
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            //validate dữ liệu
            //Check trường bắt buộc nhập
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
                    useMsg = "Mã khách hàng không được phép để trống",
                    Code = 999,
                };
                return BadRequest(msg);
            }

            //Check trùng mã
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_HBNgoc;Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var res = dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode=customerCode }, commandType: CommandType.StoredProcedure);
            if (res.Count() > 0)
            {
                return BadRequest("Mã đã tồn tại");
            }
            else
            {
                customer.CustomerId = Guid.NewGuid();
                var data = dbConnection.BulkInsert(customer);
                return Ok(data);
            }
      /*      var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_HBNgoc;Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);*/
           
        }

        // PUT api/<CustomersController>/5

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, Customer customer)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_HBNgoc;Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            /*            customer.CustomerId = Guid.NewGuid();*/
            customer.CustomerId = id;
            var data = dbConnection.BulkUpdate(customer);
            return Ok(data);
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok();
        }
    }
}
