using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_Dictionary_GoodsService.ApplicationCore;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using Newtonsoft.Json.Linq;

namespace MISA_Dictionary_GoodsService.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IBaseService _baseService;
        protected List<Brand> brands;
        public BrandsController(IBaseMemoryCache baseMemoryCache, IBaseService baseService)
        {
            _baseMemoryCache = baseMemoryCache;
            _baseService = baseService;
            brands = (List<Brand>)_baseMemoryCache.GetCache<Brand>("Brands");
            
        }

        /// <summary>
        /// Lấy thông tin thương hiệu theo bộ lọc và tìm kiếm
        /// </summary>
        /// <param name="size">Số bản ghi trên trang</param>
        /// <param name="page">Số thứ tự trang</param>
        /// <param name="keySearch">key tìm kiếm</param>
        /// <param name="brandOrigin">Xuất xứ thương hiệu</param>
        /// <returns></returns>
        /// CreatedBy dtnga (24/12/2020)
        [HttpGet]
        public async Task<IActionResult> GetByFilterAsync([FromQuery] int size, [FromQuery] int page, [FromQuery] string keySearch, [FromQuery] string brandOrigin)
        {
            var filterValues = new Dictionary<string, object>
            {
                { "PageIndex", page },
                { "PageSize", size },
                { "KeySearch", keySearch },
                { "BrandOrigin", brandOrigin }
            };
            var brands = await _baseService.GetByFilterAsync<Brand>(filterValues);
            filterValues.Remove("PageIndex");
            filterValues.Remove("PageSize");
            var total = await _baseService.CountByFilterAsync<Brand>(filterValues);
            var result = JObject.FromObject(new
            {
                Total = total,
                Data = brands
            });
            return Ok(result);
        }

        /// <summary>
        /// Lấy tất cả thương hiệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet("all")]
        public ActionServiceResult GetAllBrand()
        {
            var response = new ActionServiceResult();
            if (brands.Count == 0)
            {
                brands = _baseMemoryCache.GetCache<Brand>("Brands");
            }
            response.Data = brands;
            return response;
        }

        [HttpGet("origin")]
        public ActionServiceResult GetAllOrigin()
        {
            var response = new ActionServiceResult();
            if (brands.Count == 0)
            {
                brands = _baseMemoryCache.GetCache<Brand>("Brands");
            }
            var origin = brands.Select(b => b.BrandOrigin).Distinct().ToList();
            response.Data = origin;
            return response;
        }

        /// <summary>
        /// Lấy thông tin thương hiệu theo Id
        /// </summary>
        /// <param name="brandId">Id thương hiệu</param>
        /// <returns></returns>
        [HttpGet("{brandId}")]
        public ActionServiceResult GetBrandById([FromRoute] Guid brandId)
        {
            var response = new ActionServiceResult();
            if (brands.Count == 0)
            {
                brands = _baseMemoryCache.GetCache<Brand>("Brands");
            }
            response.Data = brands.Where<Brand>(b => b.BrandId == brandId).FirstOrDefault();
            return response;
        }

        /// <summary>
        /// Thêm thương hiệu mới
        /// </summary>
        /// <param name="newBrand">Thông tin thương hiệu mới</param>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<ActionServiceResult> AddNewBrandAsync([FromBody] Brand newBrand)
        {
            newBrand.BrandId = Guid.NewGuid();
            var response = await _baseService.InsertAsync<Brand>(newBrand);
            if (response.MISACode == MISACode.Success && brands.Count > 0)
            {
                // Cập nhật lại cache
                brands.Add(newBrand);
                _baseMemoryCache.SetCache("Brands", brands);
            }
            return response;
        }

        
        /// <summary>
        /// Cập nhật thông tin thương hiệu
        /// </summary>
        /// <param name="newBrand"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<ActionServiceResult> UpdateBrandAsync([FromBody] Brand newBrand)
        {
            var response = await _baseService.UpdateAsync<Brand>(newBrand);
            if (response.MISACode == MISACode.Success && brands.Count > 0)
            {
                // Cập nhật lại cache
                brands.Remove(brands.Where<Brand>(p => p.BrandId == newBrand.BrandId).FirstOrDefault());
                brands.Add(newBrand);
                _baseMemoryCache.SetCache("Brands", brands);
            }
            return response;
        }


        /// <summary>
        /// Thực hiện xóa nhiều thương hiệu
        /// </summary>
        /// <param name="range">danh sách chứa Id các thương hiệu cần xóa</param>
        /// <returns></returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete]
        public async Task<ActionServiceResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            var response = await _baseService.DeleteRangeAsync<Brand>(range);
            if (response.MISACode == MISACode.Success && brands.Count > 0)
            {
                // Xóa cả trong cache
                range.ForEach(itemId =>
                {
                    brands.Remove(brands.Where<Brand>(p => p.BrandId == itemId).FirstOrDefault());
                });
                _baseMemoryCache.SetCache("Brands", brands);
            }
            return response;
        }
    }
}
