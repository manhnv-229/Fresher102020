using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using MySql.Data.MySqlClient;
using MISA.CukCuk.Web.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
                return Ok(customers);
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo id
        /// </summary>
        /// <param name="id">id khách hàng</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                var customers = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = id }, commandType: CommandType.StoredProcedure);
                return Ok(customers);
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer"></param>
        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            try
            {
                var customerCode = customer.CustomerCode;
                if (String.IsNullOrEmpty(customerCode))
                {
                    var msg = new
                    {
                        devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được để trống" },
                        userMsg = "Mã khách hàng không được để trống",
                        Code = 999
                    };
                    return BadRequest(msg);
                };
                var properties = customer.GetType().GetProperties();
                var param = new DynamicParameters();
                foreach (var property in properties)
                {
                    var propertyName = property.Name;
                    var propertyValue = property.GetValue(customer);
                    var propertyType = property.PropertyType;
                    if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                    {
                        param.Add($"@{propertyName}", propertyValue, DbType.String);
                    }
                    else
                    {
                        param.Add($"@{propertyName}", propertyValue);
                    }
                }
                var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                dbConnection.Query<Customer>("Proc_InsertCustomer", param, commandType: CommandType.StoredProcedure);
                return CreatedAtAction("Add customer", customer);
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Cập nhật thông tin khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        [HttpPut()]
        public IActionResult Put(Customer customer)
        {
            try
            {
                var properties = customer.GetType().GetProperties();
                var param = new DynamicParameters();
                foreach (var property in properties)
                {
                    var propertyName = property.Name;
                    var propertyValue = property.GetValue(customer);
                    var propertyType = property.PropertyType;
                    if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                    {
                        param.Add($"@{propertyName}", propertyValue, DbType.String);
                    }
                    else
                    {
                        param.Add($"@{propertyName}", propertyValue);
                    }

                }
                var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                dbConnection.Query<Customer>("Proc_UpdateCustomer", param, commandType: CommandType.StoredProcedure);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Xoá khách hàng
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        [HttpDelete("{customerId}")]
        public IActionResult Delete(string customerId)
        {
            try
            {
                var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                dbConnection.Query<Customer>("Proc_DeleteCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure);
                return Ok(1);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
