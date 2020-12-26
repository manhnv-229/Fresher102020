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
        /// Lấy thông tin sản phẩm theo bộ lọc và tìm kiếm
        /// </summary>
        /// <param name="size">Số bản ghi trên trang</param>
        /// <param name="page">Số thứ tự trang</param>
        /// <param name="keySearch">key tìm kiếm</param>
        /// <param name="brandId">Id thương hiệu</param>
        /// <param name="categoryId">Id danh mục</param>
        /// <returns></returns>
        /// CreatedBy dtnga (24/12/2020)
        /// ModifiedBy dtnga (26/12/2020) : Thay đổi tham số
        [HttpGet]
        public async Task<ActionServiceResult> GetByFilterAsync([FromQuery] int page, [FromQuery] int size, [FromQuery] string keySearch, [FromQuery] Guid? brandId, [FromQuery] Guid? categoryId )
        {
            var _actionServiceResult = new ActionServiceResult();
            var filterValues = new Dictionary<string, object>
            {
                { "KeySearch", keySearch },
                { "BrandId", brandId },
                { "CategoryId", categoryId }
            };
            var results = await _productService.GetByFilterAsync<Product>(filterValues);
            if (page < 0) page = 1;
            var resultPaging = results.Skip((page - 1) * size).Take(size).ToList();
            _actionServiceResult.Data = resultPaging;
            return _actionServiceResult;
        }

        /// <summary>
        /// Đếm số hàng hóa thỏa mãn bộ lọc
        /// </summary>
        /// <param name="keySearch">key tìm kiếm</param>
        /// <param name="brandId">Id thương hiệu</param>
        /// <param name="categoryId">Id danh mục</param>
        /// <returns></returns>
        /// CreatedBy dtnga (26/12/2020)
        [HttpGet("count")]
        public async Task<ActionServiceResult> GetCountAsync([FromQuery] string keySearch, [FromQuery] Guid? brandId, [FromQuery] Guid? categoryId)
        {
            var _actionServiceResult = new ActionServiceResult();
            var filterValues = new Dictionary<string, object>
            {
                { "KeySearch", keySearch },
                { "BrandId", brandId },
                { "CategoryId", categoryId }
            };
            var results = await _productService.GetByFilterAsync<Product>(filterValues);
            _actionServiceResult.Data = results.Count;
            return _actionServiceResult;
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
        /// Thực hiện xóa nhiều sản phẩm
        /// </summary>
        /// <param name="range">danh sách chứa Id các sản phẩm cần xóa</param>
        /// <returns></returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete]
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
