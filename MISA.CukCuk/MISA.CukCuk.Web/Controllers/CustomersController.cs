using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using Z.Dapper.Plus;
using MySqlConnector;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Interfaces.IModelService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    public class CustomersController : BaseController<ICustomerService, Customer>
    {
        public CustomersController(ICustomerService iCustomerService): base(iCustomerService)
        {

        }       
    }
}
