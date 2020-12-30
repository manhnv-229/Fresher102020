﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_Dictionary_GoodsService.ApplicationCore;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using Newtonsoft.Json.Linq;

namespace MISA_Dictionary_GoodsService.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IBrandService _brandService;
        public BrandsController(IBaseMemoryCache baseMemoryCache, IBrandService brandService)
        {
            _baseMemoryCache = baseMemoryCache;
            _brandService = brandService;
            
        }

        /// <summary>
        /// Lấy thông tin thương hiệu theo bộ lọc và tìm kiếm
        /// </summary>
        /// <param name="size">Số bản ghi trên trang</param>
        /// <param name="page">Số thứ tự trang</param>
        /// <param name="keySearch">key tìm kiếm</param>
        /// <param name="brandOrigin">Xuất xứ thương hiệu</param>
        /// <returns>Danh sách thương hiệu trên trang cần lấy và tổng số bản ghi thỏa mãn</returns>
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
            var pagingData = await _brandService.GetPagingByFilterAsync<Brand>(filterValues);
            return Ok(pagingData);
        }

        /// <summary>
        /// Lấy tất cả thương hiệu
        /// </summary>
        /// <returns>danh sách thương hiệu</returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet("all")]
        public async Task<IActionResult> GetAllBrandAsync()
        {
            var brands = await _brandService.GetAllAsync<Brand>();
            return Ok(brands);
        }

        /// <summary>
        /// Lấy tên tất cả xuất xứ thương hiệu
        /// </summary>
        /// <returns>Tên tất cả xuất xứ thương hiệu</returns>
        /// CreatedBy dtnga (27/12/2020)
        [HttpGet("origin")]
        public async Task<IActionResult> GetAllOriginAsync()
        {
            var origins =await _brandService.GetBrandOrigin();
            return Ok(origins);
        }

        /// <summary>
        /// Lấy thông tin thương hiệu theo Id
        /// </summary>
        /// <param name="brandId">Id thương hiệu</param>
        /// <returns>Thông tin thương hiệu theo Id</returns>
        [HttpGet("{brandId}")]
        public async Task<IActionResult> GetBrandByIdAsync([FromRoute] Guid brandId)
        {
            var brand = _baseMemoryCache.GetCache<Brand>(brandId.ToString());
            if (brand == null)
            {
                brand = await _brandService.GetByIdAsync<Brand>(brandId);
                _baseMemoryCache.SetCache(brandId.ToString(), brand);
            }
            return Ok(brand);
        }

        /// <summary>
        /// Thêm thương hiệu mới
        /// </summary>
        /// <param name="newBrand">Thông tin thương hiệu mới</param>
        /// <returns>Id thương hiệu thêm thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<IActionResult> AddNewBrandAsync([FromBody] Brand newBrand)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }
            newBrand.BrandId = Guid.NewGuid();
            var response = await _brandService.InsertAsync<Brand>(newBrand);
            if (response.Success == false)
                return StatusCode((int)response.MISACode, response);
            else
                return StatusCode(201, newBrand.BrandId);
        }

        
        /// <summary>
        /// Cập nhật thông tin thương hiệu
        /// </summary>
        /// <param name="newBrand"></param>
        /// <returns>Id thương hiệu cập nhật thành công </returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<IActionResult> UpdateBrandAsync([FromBody] Brand newBrand)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }
            var response = await _brandService.UpdateAsync<Brand>(newBrand);
            if (response.Success == false)
                return StatusCode((int)response.MISACode, response);
            else
                return StatusCode(200, newBrand.BrandId);
        }


        /// <summary>
        /// Thực hiện xóa nhiều thương hiệu
        /// </summary>
        /// <param name="range">danh sách chứa Id các thương hiệu cần xóa</param>
        /// <returns></returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete]
        public async Task<IActionResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            if (range.Count == 0) return StatusCode(400, string.Format(ApplicationCore.Properties.Resources.EmptyInput, "Id thương hiệu"));
            var response = await _brandService.DeleteRangeAsync<Brand>(range);
            if (response.Success == false)
                return StatusCode((int)response.MISACode, response);
            else
                return Ok(range);
        }
    }
}
