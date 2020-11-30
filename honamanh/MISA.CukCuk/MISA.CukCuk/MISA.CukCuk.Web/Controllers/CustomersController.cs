using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;
using MySql.Data.MySqlClient;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api Danh mục Khách hàng
    /// CreatedBy HNANH (24/11/2020)
    /// </summary>
    [Route("api/v1/customers")]
    [ApiController]
    public class CustomersController: EntitiesController<Customer>
    {
        //IBaseService<Customer> _baseService;
        ICustomerService _customerService;
        public CustomersController(ICustomerService customerService) :base(customerService)
        {
            //_baseService = baseService;
            _customerService = customerService;
        }
        //ICustomerService _customerService;
        //#region Construtor
        //public CustomersController(ICustomerService customerService)
        //{
        //    _customerService = customerService;
        //}
        //#endregion

        //#region Method
        ///// <summary>
        ///// Lấy toàn bộ danh sách khách hàng
        ///// </summary>
        ///// <returns>Danh sách khách hàng</returns>
        ///// CrearedBy HNANH (24/11/2020)
        //[HttpGet]
        //// GET: api/<CustomersController>
        //public IActionResult Get()
        //{
        //    var customers = _customerService.GetCustomers();
        //    return Ok(customers);
        //}

        ///// <summary>
        ///// Lấy thông tin khách hàng theo id
        ///// </summary>
        ///// <param name="customerId">Khóa chính</param>
        ///// <returns>Khách hàng</returns>
        ///// CreatedBy HNANH (25/11/2020)
        //[HttpGet("{customerId}")]
        //public IActionResult Get(string customerId)
        //{
        //    var customer = _customerService.GetCustomerById(customerId);
        //    if(customer != null)
        //    {
        //        return Ok(customer);
        //    }
        //    return NotFound("Không tìm thấy");
        //}

        ///// <summary>
        ///// Thêm mới khách hàng
        ///// </summary>
        ///// <param name="customer">Object khách hàng</param>
        ///// <returns>Số khách hàng thêm mới</returns>
        ///// CreatedBy HNANH (25/11/2020)
        //[HttpPost]
        //// POST api/<CustomersController>
        //public IActionResult Post(Customer customer)
        //{
        //    var serviceResult = _customerService.InsertCustomer(customer);

        //    if (serviceResult.MISACode == MISACode.IsValid && (int)serviceResult.Data > 0)
        //    {
        //        return Created("Success", 1);
        //    }
        //    if (serviceResult.MISACode == MISACode.NotValid)
        //    {
        //        return BadRequest(serviceResult.Data);
        //    }
        //    else
        //    {
        //        return NoContent();
        //    }

        //}

        ///// <summary>
        ///// Sửa khách hàng
        ///// </summary>
        ///// <param name="customer">Object khách hàng</param>
        ///// <returns>Kết quả sửa</returns>
        ///// CreatedBy HNANH (25/11/2020)
        //[HttpPut()]
        //// PUT api/<CustomersController>/5
        ////TODO: Cần chỉnh sửa để trả về: Không được quyền sửa
        //public IActionResult Put(Customer customer)
        //{
        //    var serviceResult = _customerService.UpdateCustomer(customer);
        //    if (serviceResult.MISACode == MISACode.Success && (int)serviceResult.Data > 0)
        //    {
        //        return Ok((int)serviceResult.Data);
        //    }
        //    else
        //    {
        //        return BadRequest(serviceResult.Data);
        //    }
        //}

        ///// <summary>
        ///// Xóa bản ghi khách hàng
        ///// </summary>
        ///// <param name="id">Khóa chính</param>
        ///// <returns>Thông điệp sau khi xóa</returns>
        ///// CreatedBy: HNANH (25/11/2020)
        //[HttpDelete("{id}")]
        //// DELETE api/<CustomersController>/5
        //public IActionResult Delete(string id)
        //{
        //    var serviceResult = _customerService.DeleteCustomer(id);

        //    if (serviceResult.MISACode == MISACode.Success)
        //    {
        //        return Ok(serviceResult.Data);
        //    }
        //    else
        //    {
        //        return NotFound(serviceResult.Data);
        //    }
        //}

        //#endregion
    }
}
