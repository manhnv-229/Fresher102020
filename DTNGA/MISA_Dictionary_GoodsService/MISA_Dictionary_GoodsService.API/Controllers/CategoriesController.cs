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
    }
}
