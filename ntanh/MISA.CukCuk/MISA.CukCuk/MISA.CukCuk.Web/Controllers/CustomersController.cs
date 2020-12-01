using System;
using System.Linq;
using System.Data;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api danh mục khách hàng
    /// CreatedBy: NTANH 24/11/2020
    /// </summary>
    public class CustomersController : BaseEntityController<Customer>
    {
        IBaseService<Customer> _baseService;
        public CustomersController(IBaseService<Customer> baseService):base(baseService)
        {
            _baseService = baseService;
        }
    }
}