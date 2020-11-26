 using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Z.Dapper.Plus;
using Dapper;
using Microsoft.AspNetCore.Mvc;
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
    /// CreatedBy: NTNghia (23/11/2020)
    /// </summary>
    public class CustomersController : BaseApiController<Customer>
    {
        IBaseService<Customer> _baseService;

        #region Constructor
        public CustomersController(IBaseService<Customer> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
