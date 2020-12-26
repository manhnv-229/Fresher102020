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
    public class CategoriesController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly ICategoryService _categoryService;
        protected List<Category> categories;
        public CategoriesController(IBaseMemoryCache baseMemoryCache, ICategoryService baseService)
        {
            _baseMemoryCache = baseMemoryCache;
            _categoryService = baseService;
            categories = (List<Category>)_baseMemoryCache.GetCache<Category>("Categories");
            
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
        public async Task<ActionServiceResult> GetByFilterAsync([FromQuery] int size, [FromQuery] int page, [FromQuery] string keySearch)
        {
            var _actionServiceResult = new ActionServiceResult();
            var filterValues = new Dictionary<string, object>
            {
                { "KeySearch", keySearch }
            };
            var results = await _categoryService.GetByFilterAsync<Category>(filterValues);
            if (page < 0) page = 1;
            var resultPaging = results.Skip((page - 1) * size).Take(size).ToList();
            _actionServiceResult.Data = resultPaging;
            return _actionServiceResult;
        }

        /// <summary>
        /// Đếm số bản ghi thỏa mãn bộ lọc
        /// </summary>
        /// <param name="keySearch">key tìm kiếm</param>
        /// <returns></returns>
        /// CreatedBy dtnga (26/12/2020)
        [HttpGet("count")]
        public async Task<ActionServiceResult> GetCountAsync([FromQuery] string keySearch)
        {
            var _actionServiceResult = new ActionServiceResult();
            var filterValues = new Dictionary<string, object>
            {
                { "KeySearch", keySearch }
            };
            var results = await _categoryService.GetByFilterAsync<Category>(filterValues);
            _actionServiceResult.Data = results.Count;
            return _actionServiceResult;
        }

        /// <summary>
        /// Lấy tất cả danh mục sản phẩm
        /// </summary>
        /// <returns></returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet("all")]
        public ActionServiceResult GetAll()
        {
            var response = new ActionServiceResult();
            if (categories.Count == 0)
            {
                categories = _baseMemoryCache.GetCache<Category>("Categories");
            }
            response.Data = categories;
            return response;
        }

        /// <summary>
        /// Lấy thông tin danh mục theo Id
        /// </summary>
        /// <param name="categoryId">Id danh mục</param>
        /// <returns></returns>
        [HttpGet("{categoryId}")]
        public ActionServiceResult GetById([FromRoute] Guid categoryId)
        {
            var response = new ActionServiceResult();
            if (categories.Count == 0)
            {
                categories = _baseMemoryCache.GetCache<Category>("Categories");
            }
            response.Data = categories.Where<Category>(b => b.CategoryId == categoryId).FirstOrDefault();
            return response;
        }

        /// <summary>
        /// Thêm danh mục mới
        /// </summary>
        /// <param name="newCategory">Thông tin danh mục mới</param>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<ActionServiceResult> AddNewAsync([FromBody] Category newCategory)
        {
            newCategory.CategoryId = Guid.NewGuid();
            var response = await _categoryService.InsertAsync<Category>(newCategory);
            if (response.MISACode == MISACode.Success && categories.Count > 0)
            {
                // Cập nhật lại cache
                categories.Add(newCategory);
                _baseMemoryCache.SetCache("Categories", categories);
            }
            return response;
        }


        /// <summary>
        /// Cập nhật thông tin danh mục
        /// </summary>
        /// <param name="newCategory"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<ActionServiceResult> UpdateAsync([FromBody] Category newCategory)
        {
            var response = await _categoryService.UpdateAsync<Category>(newCategory);
            if (response.MISACode == MISACode.Success && categories.Count > 0)
            {
                // Cập nhật lại cache
                categories.Remove(categories.Where<Category>(p => p.CategoryId == newCategory.CategoryId).FirstOrDefault());
                categories.Add(newCategory);
                _baseMemoryCache.SetCache("Categories", categories);
            }
            return response;
        }

        /// <summary>
        /// Thực hiện xóa nhiều danh mục
        /// </summary>
        /// <param name="range">danh sách chứa Id các danh mục cần xóa</param>
        /// <returns></returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete]
        public async Task<ActionServiceResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            var response = await _categoryService.DeleteRangeAsync<Category>(range);
            if (response.MISACode == MISACode.Success && categories.Count > 0)
            {
                // Xóa cả trong cache
                range.ForEach(itemId =>
                {
                    categories.Remove(categories.Where<Category>(p => p.CategoryId == itemId).FirstOrDefault());
                });
                _baseMemoryCache.SetCache("Categories", categories);
            }
            return response;
        }
    }
}
