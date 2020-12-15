using System;
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
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IBaseService _baseService;

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
            var result = new ActionServiceResult();
            var customers = await _baseService.GetAllAsync<Customer>();
            if (customers.Count == 0)
            {
                result.Success = false;
                result.MISACode = MISACode.NotFound;
                result.Message = ApplicationCore.Properties.Resources.Empty_Entity;
            }
            result.Data = customers;
            return result;
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo Id
        /// </summary>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga (15/12/2020)
        [HttpGet("{customerId}")]
        public async Task<ActionServiceResult> GetCustomerByIdAsync([FromRoute] Guid customerId)
        {
            var result = new ActionServiceResult();
            if (customerId == null)
            {
                result.Success = false;
                result.MISACode = MISACode.NotFound;
                result.Message = ApplicationCore.Properties.Resources.NotFound;
                return result;
            }
            var customer = await _baseService.GetByIdAsync<Customer>(customerId);
            if (customer == null)
            {
                result.Success = false;
                result.MISACode = MISACode.NotFound;
                result.Message = ApplicationCore.Properties.Resources.Empty_Entity;
                return result;
            }
            result.Data = customer;
            return result;
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo số điện thoại
        /// </summary>
        /// <param name="phoneNumber">Số điện thoại</param>
        /// <returns></returns>
        /// CreateBy dtnga (15/12/2020)
        [HttpGet("PhoneNumber/")]
        public async Task<ActionServiceResult> GetCustomerByPhoneNumber ([FromQuery] string phoneNumber)
        {
            var result = new ActionServiceResult();
            if (string.IsNullOrWhiteSpace(phoneNumber))
            {
                result.Success = false;
                result.MISACode = MISACode.NotFound;
                result.Message = ApplicationCore.Properties.Resources.NotFound;
                return result;
            }
            var customer = await  _baseService.GetByPropertyAsync<Customer>("PhoneNumber", phoneNumber);
            if (customer == null)
            {
                result.Success = false;
                result.MISACode = MISACode.NotFound;
                result.Message = ApplicationCore.Properties.Resources.Empty_Entity;
                return result;
            }
            result.Data = customer;
            return result;
        }

    }
}
