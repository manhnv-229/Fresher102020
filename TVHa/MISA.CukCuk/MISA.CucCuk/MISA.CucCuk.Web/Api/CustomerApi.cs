using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CucCuk.Web.Api
{
    [Route("api/v1/customers")]
    [ApiController]
    public class CustomerApi : BaseApi<Customer>
    {
        #region Property
        ICustomerService _customerService;
        #endregion Property
        #region Constructor
        public CustomerApi(ICustomerService customerService) : base(customerService)
        {
            _customerService = customerService;
        }
        #endregion Constructor
        #region Method

        /// <summary>
        /// Lấy mã khách hàng lớn nhất trong db
        /// </summary>
        /// Author: TVHa (24/11/2020)
        /// <returns></returns>
        [HttpGet("{GetCode}/{maxCode}")]
        public IActionResult GetMaxCustomerCode()
        {
            try
            {
                string rs = _customerService.GetMaxCustomerCode();
                int maxCode = Int32.Parse(rs.Replace("Cus", "")) + 1;
                return Ok("Cus" + maxCode);
            }
            catch (Exception)
            {
                return NoContent();
            }
        }

        //[HttpPost("{fileUpLoad}")]
        //public IActionResult PostImage([FromBody] IFormFile file)
        //{
        //    try
        //    {
        //        string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/content/upload", file.FileName);
        //        using (Stream stream = new FileStream(path, FileMode.Create))
        //        {
        //            file.CopyTo(stream);
        //        }
        //        return StatusCode(StatusCodes.Status201Created);
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError);
        //    }
        //}
        #endregion Method
    }
}