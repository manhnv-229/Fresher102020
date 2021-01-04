﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Interfaces.Service;
using SManage.ApplicationCore.Interfaces.Service.Base;

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        protected readonly IBaseService _baseService;

        public CustomersController(IBaseService baseService)
        {
            _baseService = baseService;
        }

        /// <summary>
        /// Lấy thông tin tất cả khách hàng
        /// </summary>
        /// <returns></returns>
        /// CreatedBy dtnga (15/12/2020)
        [HttpGet]
        public async Task<ActionServiceResult> GetAllCustomer()
        {
            return await _baseService.GetAllAsync<Customer>();
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo Id
        /// </summary>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>Thông tin khách hàng có Id mô tả</returns>
        /// CreatedBy dtnga (15/12/2020)
        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetCustomerByIdAsync([FromRoute] Guid customerId)
        {
            var customer = (await _baseService.GetByIdAsync<Customer>(customerId)).Data;
            return Ok(customer);
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo số điện thoại
        /// </summary>
        /// <param name="phoneNumber">Số điện thoại</param>
        /// <returns></returns>
        /// CreateBy dtnga (15/12/2020)
        [HttpGet("PhoneNumber/{phoneNumber}")]
        public async Task<IActionResult> GetCustomerByPhoneNumber ([FromRoute] string phoneNumber)
        {
            var customer = ((List<Customer>)(await _baseService.GetByPropertyAsync<Customer>("PhoneNumber", phoneNumber)).Data).FirstOrDefault();
            return Ok(customer);
        }

    }
}
