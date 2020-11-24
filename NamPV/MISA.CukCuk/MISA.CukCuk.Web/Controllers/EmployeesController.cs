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
    public class EmployeesController : ControllerBase
    {
        /// <summary>
        /// Lấy danh sách nhân viên
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                var employees = dbConnection.Query<Employee>("Proc_GetEmployees", commandType: CommandType.StoredProcedure);
                return Ok(employees);
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Lấy thông tin nhân viên theo id
        /// </summary>
        /// <param name="id">id nhân viên</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                var employees = dbConnection.Query<Employee>("Proc_GetEmployeeById", new { EmployeeId = id }, commandType: CommandType.StoredProcedure);
                return Ok(employees);
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            try
            {
                var employeeCode = employee.EmployeeCode;
                if (String.IsNullOrEmpty(employeeCode))
                {
                    var msg = new
                    {
                        devMsg = new { fieldName = "EmployeeCode", msg = "Mã nhân viên không được để trống" },
                        userMsg = "Mã nhân viên không được để trống",
                        Code = 999
                    };
                    return BadRequest(msg);
                };
                var properties = employee.GetType().GetProperties();
                var param = new DynamicParameters();
                foreach (var property in properties)
                {
                    var propertyName = property.Name;
                    var propertyValue = property.GetValue(employee);
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
                dbConnection.Query<Employee>("Proc_InsertEmployee", param, commandType: CommandType.StoredProcedure);
                return CreatedAtAction("Add employee", employee);
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Cập nhât thông tin nhân viên
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        [HttpPut()]
        public IActionResult Put(Employee employee)
        {
            try
            {
                var properties = employee.GetType().GetProperties();
                var param = new DynamicParameters();
                foreach (var property in properties)
                {
                    var propertyName = property.Name;
                    var propertyValue = property.GetValue(employee);
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
                dbConnection.Query<Employee>("Proc_UpdateEmployee", param, commandType: CommandType.StoredProcedure);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Xoá nhân viên theo ID
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public IActionResult Delete(string employeeId)
        {
            try
            {
                var connectionString = "User Id=dev;Host=35.194.135.168; Port=3306; Database=WEB1020_MISACukcuk_PVNam; Password=12345678@Abc; Character Set=utf8";
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                dbConnection.Query<Employee>("Proc_DeleteEmployeeById", new { EmployeeId = employeeId }, commandType: CommandType.StoredProcedure);
                return Ok(1);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
