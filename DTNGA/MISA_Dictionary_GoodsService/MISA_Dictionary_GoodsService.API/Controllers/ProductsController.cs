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
        /// Lấy thông tin theo phân trang
        /// </summary>
        /// <param name="limit">Số bản ghi trên 1 trang</param>
        /// <param name="offset">số thứ thự trang</param>
        /// <returns></returns>
        /// CreatedBy dtnga (22/12/2020)
        [HttpGet("paging")]
        public async Task<ActionServiceResult> GetByPagingAsync([FromQuery] int limit, [FromQuery] int offset)
        {
            var _actionServiceResult = new ActionServiceResult();
            var products = await _productService.GetByPaging<Product>(limit, offset);
            products.ForEach(p =>
            {
                p = _productService.ProcessingProduct(p);
            });
            _actionServiceResult.Data = products;
            return _actionServiceResult;
        }

        /// <summary>
        /// Lấy thông tin theo key tìm kiếm
        /// </summary>
        /// <param name="q">key tìm kiếm</param>
        /// <returns></returns>
        /// CreatedBy dtnga (22/12/2020)
        [HttpGet("search")]
        public async Task<ActionServiceResult> GetBySearchingAsync([FromQuery] string q)
        {
            var _actionServiceResult = new ActionServiceResult
            {
                Data = await _productService.GetBySearching<Product>(q)
            };
            return _actionServiceResult;
        }

        /// <summary>
        /// Lấy thông tin sản phẩm theo thương hiệu và danh mục, nếu tham số null thì lấy toàn bộ
        /// </summary>
        /// <param name="brandId">Id thương hiệu</param>
        /// <param name="categoryId">Id danh mục</param>
        /// <returns></returns>
        [HttpGet("filter")]
        public async Task<ActionServiceResult> GetByFilterAsync([FromQuery] Guid? brandId, [FromQuery] Guid? categoryId)
        {
            var _actionServiceResult = new ActionServiceResult
            {
                Data = await _productService.GetByFilterAsync(brandId, categoryId)
            };
            return _actionServiceResult;
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
            newProduct.ProductId = Guid.NewGuid();
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

        /// <summary>
        /// Thực hiện xóa nhiều sản phẩm
        /// </summary>
        /// <param name="range">danh sách chứa Id các sản phẩm cần xóa</param>
        /// <returns></returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete("range")]
        public async Task<ActionServiceResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            var response = await _productService.DeleteRangeAsync<Product>(range);
            if (response.MISACode == MISACode.Success && products.Count > 0)
            {
                // Xóa cả trong cache
                range.ForEach(itemId =>
                   {
                       products.Remove(products.Where<Product>(p => p.ProductId == itemId).FirstOrDefault());
                   });
                _baseMemoryCache.SetCache("Products", products);
            }
            return response;
        }
    }
}
