using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NamPV (24/11/2020)
        [HttpGet]
        public IActionResult GetCustomers()
        {
            var customers = _customerService.GetEntities();
            if (customers != null)
                return Ok(customers);
            else return NoContent();
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo id
        /// </summary>
        /// <param name="customerId">id khách hàng</param>
        /// <returns>Thông tin khách hàng được lấy theo Id</returns>
        [HttpGet("{customerId}")]
        public IActionResult GetCustomerById(Guid customerId)
        {
            var customers = _customerService.GetEntityById(customerId);
            if (customers != null)
                return Ok(customers);
            else return NoContent();
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer"></param>
        [HttpPost]
        public IActionResult InserCustomer(Customer customer)
        {
            var serviceResult = _customerService.InsertEntity(customer);
            if (serviceResult.MISACode == MISACode.IsValid && (int)serviceResult.Data > 0)
                return Created("Thêm thành công", serviceResult);
            else if (serviceResult.MISACode == MISACode.IsValid && (int)serviceResult.Data == 0)
                return NoContent();
            else return BadRequest(serviceResult);
        }

        /// <summary>
        /// Cập nhật thông tin khách hàng
        /// </summary>
        /// <param name="customer">Khách hàng cần cập nhật thông tin</param>
        /// <returns>Mô tả cụ thể lỗi, thành công... sau khi cập nhật, số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: NamPV (24/11/2020)
        [HttpPut("{customerId}")]
        public IActionResult UpdateCustomer([FromRoute] object customerId, Customer customer)
        {
            customer.CustomerId.GetType().Name
            customer.CustomerId = Guid.Parse(customerId.ToString());
            var serviceResult = _customerService.UpdateEntity(customer);
            if ((int)serviceResult.Data > 0)
                return Ok(serviceResult);
            else return NoContent();
        }

        /// <summary>
        /// Xoá khách hàng theo Id
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        /// CreatedBy: NamPV (24/11/2020)
        [HttpDelete("{customerId}")]
        public IActionResult DeleteCustomerById(Guid customerId)
        {
            var serviceResult = _customerService.DeleteEntityById(customerId);
            if ((int)serviceResult.Data > 0)
                return Ok();
            else return NoContent();
        }
    }
}
