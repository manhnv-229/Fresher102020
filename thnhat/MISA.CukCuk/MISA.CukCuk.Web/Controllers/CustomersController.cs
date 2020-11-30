using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entites;
using MISA.ApplicationCore.Interfaces;

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
    public class CustomersController : BaseController<ApplicationCore.Entites.Customer>
    {
        IBaseService<ApplicationCore.Entites.Customer> _baseService;
        public CustomersController(IBaseService<ApplicationCore.Entites.Customer> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
