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
    public class CategoriesController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IBaseService _baseService;
        protected List<Category> categories;
        public CategoriesController(IBaseMemoryCache baseMemoryCache, IBaseService baseService)
        {
            _baseMemoryCache = baseMemoryCache;
            _baseService = baseService;
            categories = (List<Category>)_baseMemoryCache.GetCache<Category>("Categories");
            
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
            var _actionServiceResult = new ActionServiceResult
            {
                Data = await _baseService.GetByPaging<Category>(limit, offset)
            };
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
                Data = await _baseService.GetBySearching<Category>(q)
            };
            return _actionServiceResult;
        }


        /// <summary>
        /// Lấy tất cả danh mục sản phẩm
        /// </summary>
        /// <returns></returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet]
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
            var response = await _baseService.InsertAsync<Category>(newCategory);
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
            var response = await _baseService.UpdateAsync<Category>(newCategory);
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
        /// Xóa thông tin danh mục theo Id
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpDelete("{categoryId}")]
        public async Task<ActionServiceResult> DeleteAsync([FromRoute] Guid categoryId)
        {
            var response = await _baseService.DeleteAsync<Category>(categoryId);
            if (response.MISACode == MISACode.Success && categories.Count > 0)
            {
                // Cập nhật lại cache
                categories.Remove(categories.Where<Category>(p => p.CategoryId == categoryId).FirstOrDefault());
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
        [HttpDelete("range")]
        public async Task<ActionServiceResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            var response = await _baseService.DeleteRangeAsync<Category>(range);
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
