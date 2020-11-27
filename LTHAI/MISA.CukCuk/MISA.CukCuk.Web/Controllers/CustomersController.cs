using System;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interface;
using MISA.ApplicationCore.Entities;

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
        #region Attribute
        private readonly ICustomerServiceRepository _customerServiceRepository;
        #endregion

        #region Contructor
        public CustomersController(ICustomerServiceRepository customerServiceRepository)
        {
            this._customerServiceRepository = customerServiceRepository;
        }
        #endregion
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>D:\FresherMisa\AMIS\Fresher102020\LTHAI\MISA.CukCuk\MISA.CukCuk.Web\Controllers\
        [HttpGet]
        public IActionResult Get()
        {
            var customers = _customerServiceRepository.GetCustomers();
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
           
            var customer = _customerServiceRepository.GetCustomerById(id);
            if(customer != null)
            {
                return Ok(customer);
            }
            return BadRequest();
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
            var objResult = _customerServiceRepository.AddCustomer(customer);
            if(objResult.MisaCode == MISACode.NotValid)
            {
                return BadRequest(objResult);
            }
            else if(objResult.MisaCode == MISACode.IsValid && Convert.ToInt32(objResult.Data) > 0)
            {
                return Ok(objResult);
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
           
            var objResult = _customerServiceRepository.UpdateCustomer(id, customer);
            if (objResult.MisaCode == MISACode.NotValid)
            {
                return BadRequest(objResult);
            }
            else if (objResult.MisaCode == MISACode.IsValid && Convert.ToInt32(objResult.Data) > 0)
            {
                return Ok(objResult);
            }
            return NoContent();
        }

        /// <summary>
        /// Cập nhật một khách hàng
        /// </summary>
        /// <param name="id">CustomerId</param>
        /// <returns>
        /// + Thành công : Trả về Ok
        /// + Không thành công: NoContent
        /// </returns>
        /// CreatedBy: LTHAI(24/11/2020)
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            
            var objResult = _customerServiceRepository.DeleteCustomerById(id);
            if(objResult.MisaCode  == MISACode.IsValid && Convert.ToInt32(objResult.Data) > 0)
            {
                return Ok(objResult);
            }
            return NoContent();
        }
    }
}
