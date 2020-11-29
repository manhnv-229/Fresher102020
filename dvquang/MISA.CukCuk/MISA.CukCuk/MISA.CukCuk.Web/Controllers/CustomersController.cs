
using System;
using System.Data;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Services;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.interfaces;

using MySql.Data.MySqlClient;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : BaseApiController<Customer>
    {
        ICustomerService _baseService;
        public CustomersController(ICustomerService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
