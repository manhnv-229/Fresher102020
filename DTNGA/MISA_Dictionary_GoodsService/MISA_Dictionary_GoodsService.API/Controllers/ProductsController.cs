using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_Dictionary_GoodsService.ApplicationCore;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;


namespace MISA_Dictionary_GoodsService.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IProductService _productService;
        protected List<Product> products;
        public ProductsController(IBaseMemoryCache baseMemoryCache, IProductService productService)
        {
            _baseMemoryCache = baseMemoryCache;
            _productService = productService;
            products = _baseMemoryCache.GetCache<Product>("Products");
            
        }

        /// <summary>
        /// Lấy tất cả sản phẩm
        /// </summary>
        /// <returns></returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet]
        public ActionServiceResult GetAll()
        {
            var response = new ActionServiceResult();
            if (products.Count == 0)
            {
                products = _baseMemoryCache.GetCache<Product>("Products");
            }
            response.Data = products;
            return response;
        }

        /// <summary>
        /// Lấy thông tin sản phẩm theo Id
        /// </summary>
        /// <param name="productId">Id sản phẩm</param>
        /// <returns></returns>
        [HttpGet("{productId}")]
        public ActionServiceResult GetById([FromRoute] Guid productId)
        {
            var response = new ActionServiceResult();
            if (products.Count == 0)
            {
                products = _baseMemoryCache.GetCache<Product>("Products");
            }
            response.Data = products.Where<Product>(b => b.ProductId == productId).FirstOrDefault();
            return response;
        }

        /// <summary>
        /// Thêm sản phẩm mới
        /// </summary>
        /// <param name="newProduct">Thông tin sản phẩm mới</param>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<ActionServiceResult> AddNewAsync([FromBody] Product newProduct)
        {
            var response = await _productService.InsertAsync<Product>(newProduct);
            if (response.MISACode == MISACode.Success && products.Count > 0)
            {
                // Cập nhật lại cache
                products.Add(newProduct);
                _baseMemoryCache.SetCache("Products", products);
            }
            return response;
        }


        /// <summary>
        /// Cập nhật thông tin sản phẩm
        /// </summary>
        /// <param name="newProduct"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<ActionServiceResult> UpdateAsync([FromBody] Product newProduct)
        {
            var response = await _productService.UpdateAsync<Product>(newProduct);
            if (response.MISACode == MISACode.Success && products.Count > 0)
            {
                // Cập nhật lại cache
                products.Remove(products.Where<Product>(p => p.ProductId == newProduct.ProductId).FirstOrDefault());
                products.Add(newProduct);
                _baseMemoryCache.SetCache("Products", products);
            }
            return response;
        }

        /// <summary>
        /// Xóa thông tin sản phẩm theo Id
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpDelete("{productId}")]
        public async Task<ActionServiceResult> DeleteAsync([FromRoute] Guid productId)
        {
            var response = await _productService.DeleteAsync<Product>(productId);
            if(response.MISACode == MISACode.Success && products.Count>0)
            {
                // Xóa cả trong cache
                products.Remove(products.Where<Product>(p=>p.ProductId==productId).FirstOrDefault());
                _baseMemoryCache.SetCache("Products", products);
            }
            return response;
        }
    }
}
