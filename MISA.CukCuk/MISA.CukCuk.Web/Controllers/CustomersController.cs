using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCuk.Web.Models;
using MySql.Data.MySqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api danh mục khách hàng
    /// CreatedBy: LTHAI(23/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        public readonly string connectionString = @"User Id=dev;Host=35.194.135.168;Port=3306;Database=MISACukCuk;Password=12345678@Abc;Character Set=utf8;";
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        [HttpGet]
        public IActionResult Get()
        {
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customers = dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
            return Ok(customers);
        }

        /// <summary>
        /// Lấy khách hàng theo CustomerId
        /// </summary>
        /// <param name="id">CustomerId</param>
        /// <returns>Khách mới CustomerId tương ứng</returns>
        /// CreatedBy: LTHAI(23/11/2020)
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {   
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var customer = dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = id}, commandType: CommandType.StoredProcedure);
            return Ok(customer);
        }

        /// <summary>
        /// Thêm mới một khách hàng
        /// </summary>
        /// <param name="customer">Khách hàng mới</param>
        /// <returns>
        /// + Thành công : Trả về khách hàng mới
        /// + Không thành công: BadRequest 
        /// </returns>
        /// CreatedBy: LTHAI(23/11/2020)
        [HttpPost]
        public IActionResult Post([FromBody] Customer customer)
        {
            // Validate dữ liệu trường bắt buộc
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            
            {
                var msg = new {
                    devMsg = new { fieldName = "CustomerCode", Msg = "Trường customerCode không được để trống" },
                    userMsg = "Trường customerCode không được để trống",
                    errorCode = 999
                };
                return BadRequest(msg);
            }
            // Validate trùng CustomerCode
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var result = dbConnection.Query("Proc_GetCustomerByCode", new {CustomerCode = customerCode }, commandType: CommandType.StoredProcedure);
            if(result.Count() > 0)
            {
                var msg = new
                {
                    devMsg = new { fieldName = "CustomerCode", Msg = "Trường customerCode đã tồn tại" },
                    userMsg = "Trường customerCode đã tồn tại",
                    errorCode = 400
                };
                return BadRequest(msg);
            }
            // Đổi kiểu Guid thành string nếu có
            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    if(propertyName == "CustomerId")
                    {
                        parameters.Add(propertyName, Guid.NewGuid(), DbType.String);
                    }
                    else
                    {
                        parameters.Add(propertyName, propertyValue, DbType.String);
                    }
                    
                }
                else
                {
                    parameters.Add(propertyName, propertyValue);
                }
            }
            // Thực hiện thêm khách hàng
            var rowAffects = dbConnection.Execute("Proc_InsertCustomer", parameters, commandType: CommandType.StoredProcedure);
            if (rowAffects > 0)
            {
                return Created("Success", parameters);
            }
            return NoContent();
        }

        /// <summary>
        /// Cập nhật một khách hàng
        /// </summary>
        /// <param name="id">CustomerId</param>
        /// <param name="value">Thông tin khách hàng được cập nhật</param>
        /// <returns>
        /// + Thành công : Trả về Ok
        /// + Không thành công: NoContent
        /// </returns>
        /// CreatedBy: LTHAI(23/11/2020)
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Customer customer)
        {
            // Đổi kiểu Guid thành string nếu có
            var properties = customer.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(customer);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid?))
                {
                    parameters.Add(propertyName, propertyValue, DbType.String);
                }
                else if(propertyType == typeof(Guid)){
                    parameters.Add(propertyName, id);
                }
                else if (propertyType == typeof(bool))
                {
                    
                    parameters.Add(propertyName, propertyValue, DbType.SByte);
                }
                else
                {
                    parameters.Add(propertyName, propertyValue);
                }
            }
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            var rowAffects = dbConnection.Execute("Proc_UpdateCustomer", parameters, commandType: CommandType.StoredProcedure);
            if(rowAffects > 0)
            {
                return Ok(rowAffects);
            }
            return NoContent();
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
