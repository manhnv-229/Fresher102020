using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using MySql.Data.MySqlClient;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Entities;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{

    public class CustomersController : BaseEntityController<Customer>
    {
        ICustomerService _baseService;
        public CustomersController(ICustomerService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
