using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_Dictionary_GoodsService.ApplicationCore;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;

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
        /// Lấy tất cả thương hiệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet]
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
        /// Xóa thông tin thương hiêu theo Id
        /// </summary>
        /// <param name="brandId"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpDelete("{brandId}")]
        public async Task<ActionServiceResult> DeleteBrandAsync([FromRoute] Guid brandId)
        {
            var response = await _baseService.DeleteAsync<Brand>(brandId);
            if (response.MISACode == MISACode.Success && brands.Count > 0)
            {
                // Cập nhật lại cache
                brands.Remove(brands.Where<Brand>(p => p.BrandId == brandId).FirstOrDefault());
                _baseMemoryCache.SetCache("Brands", brands);
            }
            return response;
        }
    }
}
