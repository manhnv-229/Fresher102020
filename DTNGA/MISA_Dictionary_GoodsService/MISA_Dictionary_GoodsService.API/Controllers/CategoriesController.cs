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
    public class CategoriesController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly ICategoryService _categoryService;
        public CategoriesController(IBaseMemoryCache baseMemoryCache, ICategoryService baseService)
        {
            _baseMemoryCache = baseMemoryCache;
            _categoryService = baseService;
            
        }


        /// <summary>
        /// Lấy thông tin danh mục theo bộ lọc
        /// </summary>
        /// <param name="size">Số bản ghi trên trang</param>
        /// <param name="page">Số thứ tự trang</param>
        /// <param name="keySearch">key tìm kiếm</param>
        /// <returns></returns>
        /// CreatedBy dtnga (24/12/2020)
        [HttpGet]
        public async Task<IActionResult> GetByFilterAsync([FromQuery] int size, [FromQuery] int page, [FromQuery] string keySearch)
        {
            var filterValues = new Dictionary<string, object>
            {
                { "PageIndex", page },
                { "PageSize", size },
                { "KeySearch", keySearch }
            };
            var categories = await _categoryService.GetByFilterAsync<Category>(filterValues);
            for(var i=0; i<categories.Count; i++)
            {
                categories[i]= await _categoryService.ProcessingCategoryAsync(categories[i]);
            }
            filterValues.Remove("PageIndex");
            filterValues.Remove("PageSize");
            var total = await _categoryService.CountByFilterAsync<Category>(filterValues);
            var result = JObject.FromObject(new
            {
                Total = total,
                Data = categories
            });
            return Ok(result);
        }

        /// <summary>
        /// Lấy tất cả danh mục sản phẩm
        /// </summary>
        /// <returns>Danh sách danh mục</returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet("all")]
        public async Task<IActionResult> GetAllAsync()
        {
            var categories = await _categoryService.GetAllAsync<Category>();
            var result = JObject.FromObject(new
            {
                Data = categories
            });
            return Ok(result);
        }

        /// <summary>
        /// Lấy thông tin danh mục theo Id
        /// </summary>
        /// <param name="categoryId">Id danh mục</param>
        /// <returns>Thông tin danh mục theo Id</returns>
        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid categoryId)
        {
            var category = _baseMemoryCache.GetCache<Category>(categoryId.ToString());
            if (category == null)
            {
                category = await _categoryService.GetByIdAsync<Category>(categoryId);
                _baseMemoryCache.SetCache(categoryId.ToString(), category);
            }
            category = await _categoryService.ProcessingCategoryAsync(category);
            var result = JObject.FromObject(new
            {
                Data = category
            });
            return Ok(result);
        }

        /// <summary>
        /// Thêm danh mục mới
        /// </summary>
        /// <param name="newCategory">Thông tin danh mục mới</param>
        /// <returns>Id danh mục đã thêm mới</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<IActionResult> AddNewAsync([FromBody] Category newCategory)
        {
            newCategory.CategoryId = Guid.NewGuid();
            var response = await _categoryService.InsertAsync<Category>(newCategory);
            if (response.Success == false)
                return (IActionResult)response;
            else
                return Ok(newCategory.CategoryId);
        }


        /// <summary>
        /// Cập nhật thông tin danh mục
        /// </summary>
        /// <param name="newCategory"></param>
        /// <returns>Id danh mục đã cập nhật</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Category newCategory)
        {
            var response = await _categoryService.UpdateAsync<Category>(newCategory);
            if (response.Success == false)
                return (IActionResult)response;
            else
                return Ok(newCategory.CategoryId);
        }

        /// <summary>
        /// Thực hiện xóa nhiều danh mục
        /// </summary>
        /// <param name="range">danh sách chứa Id các danh mục cần xóa</param>
        /// <returns>Danh sách Id danh mục đã xóa</returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete]
        public async Task<IActionResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            var response = await _categoryService.DeleteRangeAsync<Category>(range);
            if (response.Success == false)
                return (IActionResult)response;
            else
                return Ok(range);
        }
    }
}
