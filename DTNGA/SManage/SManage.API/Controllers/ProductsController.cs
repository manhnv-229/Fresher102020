using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Service;
using SManage.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IProductService _productService;

        public ProductsController(IBaseMemoryCache baseMemoryCache, IProductService productService)
        {
            _baseMemoryCache = baseMemoryCache;
            _productService = productService;
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetById([FromRoute] Guid productId)
        {
            var product = _baseMemoryCache.GetCache<Product>(productId.ToString());
            if (product == null)
            {
                product = (Product)(await _productService.GetByIdAsync<Product>(productId)).Data;
                _baseMemoryCache.SetCache(productId.ToString(), product);
            }
            return Ok(product);
        }
       
    }
}
