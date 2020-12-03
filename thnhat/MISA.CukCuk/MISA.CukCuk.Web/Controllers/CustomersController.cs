using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api Danh mục khách hàng
    /// CreatedBy: THNhat (24/11/2020)
    /// </summary>
    /// IBaseService<TEntity> _baseService;

    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : BaseController<Customer>
    {
        ICustomerService _baseService;
        public CustomersController(ICustomerService baseService) : base(baseService)
        {
            _baseService = baseService;
        }

        //[HttpGet("{customerCode}")]
        //public IActionResult GetCustomerByCode(string customerCode)
        //{
        //    var customer = _baseService.GetCustomerByCode(customerCode);
        //    return Ok(customer);
        //}
        [HttpGet("{customerId}")]
        public IActionResult GetCustomerById(Guid customerId)
        {
            var customer = _baseService.GetCustomerById(customerId);
            return Ok(customer);
        }
    }
}
