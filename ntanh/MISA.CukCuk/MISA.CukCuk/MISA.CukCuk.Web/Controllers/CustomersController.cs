using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Dapper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCuk.Web.Modals;
using MySql.Data.MySqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api danh mục khách hàng
    /// CreatedBy: NTANH 24/11/2020
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NTANH 24/11/2020
        // GET: api/<CustomersController>
        [HttpGet]
        public IActionResult Get()
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTAnh;Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("PROC_GetCustomers", commandType: CommandType.StoredProcedure);
            return Ok(customers);
        }

        /// <summary>
        /// Lấy danh sách khách hàng theo id và tên
        /// </summary>
        /// <param name="id">id của khách hàng</param>
        /// <param name="name">tên của khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NTANH 24/11/2020
        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTAnh;Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("PROC_GetCustomerById",new {CustomerId = id} ,commandType: CommandType.StoredProcedure);
            return Ok(customers);
        }

        // POST api/<CustomersController>
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            // Validate dữ liệu:
            // Check trường bắt buộc nhập
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được phép để trống" },
                    userMsg = "Mã khách hàng không được phép để trống",
                    Code = 999
                };
                return BadRequest(msg);
            }
            // Check trùng mã
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTAnh;Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var res = dbConnection.Query("PROC_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure);
            if(res.Count() > 0)
            {
                return BadRequest("Mã khách hàng đã tồn tại");
            }
            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }

            }
            
            var rowAffects = dbConnection.Execute("PROC_InsertCustomer", parameters, commandType: CommandType.StoredProcedure);
            if (rowAffects > 0)
                return Created("adfd", customer);
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
            var connectionString = "User Id=dev;Host=35.194.135.168;Port=3306;Database=WEB1020_MISACukcuk_NTAnh;Password=12345678@Abc;Character Set=utf8";
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("PROC_DeleteCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure);
            return Ok(customers);
        }
    }
}
