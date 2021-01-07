using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_Dictionary_GoodsService.ApplicationCore;
using MISA_Dictionary_GoodsService.ApplicationCore.Const;
using MISA_Dictionary_GoodsService.ApplicationCore.Entities.DTO;
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
        /// <param name="keyWord">key tìm kiếm</param>
        /// <returns></returns>
        /// CreatedBy dtnga (24/12/2020)
        [HttpGet]
        public async Task<IActionResult> GetByFilterAsync([FromQuery] int size, [FromQuery] int page, [FromQuery] string keyWord)
        {
            try
            {
                var filterValues = new Dictionary<string, object>
                {
                    { ConstParameter.PageIndex, page },
                    { ConstParameter.PageSize, size },
                    { ConstParameter.KeyWord, keyWord }
                };
                var pagingData = await _categoryService.GetPagingByFilterAsync<Category>(filterValues);
                return Ok(pagingData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Lấy tất cả danh mục sản phẩm
        /// </summary>
        /// <returns>Danh sách danh mục</returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet("all")]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                var categories = await _categoryService.GetAllAsync<Category>();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Kiểm tra trùng lặp dữ liệu
        /// </summary>
        /// <param name="key">Khóa kiểm tra</param>
        /// <param name="value">Giá trị cần kiểm tra</param>
        /// <returns></returns>
        /// CreatedBy dtnga (30/12/2020)
        [HttpGet("duplication")]
        public async Task<IActionResult> CheckDuplicate([FromQuery] string key, [FromQuery] string value)
        {
            try
            {
                if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(value)) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                bool duplicate = false;
                if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(value) || value.Length > 20) return StatusCode(400, ApplicationCore.Properties.Resources.Validate);
                var result = new Category();
                if (key == ConstParameter.CategoryCode)
                    result = (await _categoryService.GetByPropertyAsync<Category>(ConstParameter.CategoryCode, value)).FirstOrDefault();
                if (result != null)
                    duplicate = true;
                return StatusCode(200, duplicate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Lấy thông tin danh mục theo Id
        /// </summary>
        /// <param name="categoryId">Id danh mục</param>
        /// <returns>Thông tin danh mục theo Id</returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid categoryId)
        {
            try
            {
                if (categoryId == null) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var category = _baseMemoryCache.GetCache<Category>(categoryId.ToString());
                if (category == null)
                {
                    category = await _categoryService.GetByIdAsync<Category>(categoryId);
                    _baseMemoryCache.SetCache(categoryId.ToString(), category);
                }
                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Thêm danh mục mới
        /// </summary>
        /// <param name="newCategory">Thông tin danh mục mới</param>
        /// <returns>Id danh mục đã thêm mới</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<IActionResult> AddNewAsync([FromBody] CategoryCreateDTO newCategory)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var category = Category.ConvertFromCreateDTO(newCategory);
                category.CategoryId = Guid.NewGuid();
                var response = await _categoryService.InsertAsync<Category>(category);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(201, category.CategoryId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }


        /// <summary>
        /// Cập nhật thông tin danh mục
        /// </summary>
        /// <param name="newCategory"></param>
        /// <returns>Id danh mục đã cập nhật</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] CategoryUpdateDTO newCategory)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var category = Category.ConvertFromUpdateDTO(newCategory);
                var response = await _categoryService.UpdateAsync<Category>(category);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(200, category.CategoryId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
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
            try
            {
                if (range.Count == 0) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var response = await _categoryService.DeleteRangeAsync<Category>(range);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return Ok(range);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }
    }
}
