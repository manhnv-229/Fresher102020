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
                product = await _productService.GetByIdAsync<Product>(productId);
                if (product != null)
                    _baseMemoryCache.SetCache(productId.ToString(), product);
            }
            return Ok(product);
        }

        /// <summary>
        /// Lấy danh sách sản phầm dựa theo khóa tìm kiếm (mã/ tên sản phẩm)
        /// </summary>
        /// <param name="shopId"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetByKeyword([FromQuery] Guid shopId, [FromQuery] string keyword)
        {
            if (shopId == Guid.Empty) return StatusCode(400, "Không có dữ liệu đầu vào");
            if (string.IsNullOrEmpty(keyword)) return StatusCode(200);
            // Kiểm tra trong bộ đệm có sản phẩm mã code trùng với key tìm kiếm không, nếu có thì trả về luôn
            var ltProduct = (List<Product>)_baseMemoryCache.GetCache(shopId.ToString());
            if (ltProduct!=null && ltProduct.Count > 0)
            {
                var product = (ltProduct.Where<Product>(p => p.ProductCode == keyword.Trim())).FirstOrDefault();
                var res = new List<Product>
                {
                    product
                };
                if (product != null) return StatusCode(200, res);
            }

            var param = new Dictionary<string, object>
                {
                    {"ShopId", shopId},
                    {"Keyword", keyword }
                };
            var products = await _productService.GetByKeyword<Product>(param);
            if (products.Count > 0) _baseMemoryCache.SetCache(shopId.ToString(), products);
            return StatusCode(200, products);
        }
    }
}
