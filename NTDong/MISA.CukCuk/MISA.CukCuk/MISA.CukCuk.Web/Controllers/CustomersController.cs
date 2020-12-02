using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
    /// Api Danh mục khách hàng 
    /// createdBy:NTDong(23/11/2020)
    /// </summary>
    
    public class CustomersController : BaseEntityController<Employee>
    {
        ICustomerService _customerService;
        public CustomersController(ICustomerService customerService) : base(customerService)
        {
            _customerService = customerService;
        }
    }
}
