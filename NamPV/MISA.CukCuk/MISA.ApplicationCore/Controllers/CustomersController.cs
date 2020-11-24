using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using MySql.Data.MySqlClient;
using MISA.Entity;
using MISA.Infrastructure;
using MISA.Entity.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.ApplicationCore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NamPV (24/11/2020)
        [HttpGet]
        public IActionResult GetCustomers()
        {
            try
            {
                var customerDbContext = new CustomerDbContext();
                var customers = customerDbContext.GetCustomers();
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
        /// <param name="customerId">id khách hàng</param>
        /// <returns>Thông tin khách hàng được lấy theo Id</returns>
        [HttpGet("{customerId}")]
        public IActionResult GetCustomerById(string customerId)
        {
            try
            {
                var customerDbContext = new CustomerDbContext();
                var customers = customerDbContext.GetCustomerById(customerId);
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
        public ServiceResult Post(Customer customer)
        {
            try
            {
                // Validate dữ liệu
                // Check trường không được để trống, trả về mô tả nếu dữ liệu chưa hợp lệ
                var serviceResult = new ServiceResult();
                var customerDbContext = new CustomerDbContext();
                var customerCode = customer.CustomerCode;
                if (String.IsNullOrEmpty(customerCode))
                {
                    var msg = new
                    {
                        devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được để trống" },
                        userMsg = "Mã khách hàng không được để trống",
                        Code = MISACode.NotValid
                    };
                    serviceResult.MISACode = MISACode.NotValid;
                    serviceResult.Messenger = "Mã khách hàng không được để trống";
                    serviceResult.Data = msg;
                    return serviceResult;
                };

                // Check trùng mã
                var res = customerDbContext.GetCustomerByCode(customerCode);
                if (res != null)
                {
                    var msg = new
                    {
                        devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng đã tồn tại" },
                        userMsg = "Mã khách hàng đã tồn tại",
                        Code = MISACode.NotValid,
                    };
                    serviceResult.MISACode = MISACode.NotValid;
                    serviceResult.Messenger = "Mã khách hàng đã tồn tại";
                    serviceResult.Data = msg;
                    return serviceResult;
                }

                // Thêm mới khi dữ liệu đã hợp lệ:
                var rowAffects = customerDbContext.InsertCustomer(customer);
                serviceResult.MISACode = MISACode.IsValid;
                serviceResult.Messenger = "Thêm thành công";
                serviceResult.Data = rowAffects;
                return serviceResult;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Cập nhật thông tin khách hàng
        /// </summary>
        /// <param name="customer">Khách hàng cần cập nhật thông tin</param>
        /// <returns>Mô tả cụ thể lỗi, thành công... sau khi cập nhật, số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: NamPV (24/11/2020)
        [HttpPut()]
        public ServiceResult Put(Customer customer)
        {
            try
            {
                // Validate dữ liệu
                // Check trường không được để trống, trả về mô tả nếu dữ liệu chưa hợp lệ
                var serviceResult = new ServiceResult();
                var customerDbContext = new CustomerDbContext();
                var customerCode = customer.CustomerCode;
                if (String.IsNullOrEmpty(customerCode))
                {
                    var msg = new
                    {
                        devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng không được để trống" },
                        userMsg = "Mã khách hàng không được để trống",
                        Code = MISACode.NotValid
                    };
                    serviceResult.MISACode = MISACode.NotValid;
                    serviceResult.Messenger = "Mã khách hàng không được để trống";
                    serviceResult.Data = msg;
                    return serviceResult;
                };

                // Check trùng mã
                var res = customerDbContext.GetCustomerByCode(customerCode);
                if (res != null)
                {
                    var msg = new
                    {
                        devMsg = new { fieldName = "CustomerCode", msg = "Mã khách hàng đã tồn tại" },
                        userMsg = "Mã khách hàng đã tồn tại",
                        Code = MISACode.NotValid,
                    };
                    serviceResult.MISACode = MISACode.NotValid;
                    serviceResult.Messenger = "Mã khách hàng đã tồn tại";
                    serviceResult.Data = msg;
                    return serviceResult;
                }

                // Thêm mới khi dữ liệu đã hợp lệ:
                var rowAffects = customerDbContext.UpdateCustomer(customer);
                serviceResult.MISACode = MISACode.IsValid;
                serviceResult.Messenger = "Thêm thành công";
                serviceResult.Data = rowAffects;
                return serviceResult;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Xoá khách hàng theo Id
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        /// CreatedBy: NamPV (24/11/2020)
        [HttpDelete("{customerId}")]
        public IActionResult Delete(string customerId)
        {
            try
            {
                var customerDbContext = new CustomerDbContext();
                customerDbContext.DeleteCustomerById(customerId);
                return Ok(1);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
