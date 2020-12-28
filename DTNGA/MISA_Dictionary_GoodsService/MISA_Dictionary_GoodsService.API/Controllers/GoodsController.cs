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
using Newtonsoft.Json.Linq;

namespace MISA_Dictionary_GoodsService.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GoodsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IGoodsService _GoodsService;
        protected List<Goods> Goods;
        public GoodsController(IBaseMemoryCache baseMemoryCache, IGoodsService GoodsService)
        {
            _baseMemoryCache = baseMemoryCache;
            _GoodsService = GoodsService;
            Goods = _baseMemoryCache.GetCache<Goods>("Goods");

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
        public async Task<IActionResult> GetByFilterAsync([FromQuery] int page, [FromQuery] int size, [FromQuery] string keySearch, [FromQuery] Guid? brandId, [FromQuery] Guid? categoryId)
        {
            var filterValues = new Dictionary<string, object>
            {
                { "PageIndex", page },
                { "PageSize", size },
                { "KeySearch", keySearch },
                { "BrandId", brandId },
                { "CategoryId", categoryId }
            };
            var goods = await _GoodsService.GetByFilterAsync<Goods>(filterValues);
            goods.ForEach(p => _GoodsService.ProcessingGoods(p));
            filterValues.Remove("PageIndex");
            filterValues.Remove("PageSize");
            var total = await _GoodsService.CountByFilterAsync<Goods>(filterValues);
            var result = JObject.FromObject(new
            {
                Total= total,
                Data= goods
            });
            return Ok(result);
        }

        

        /// <summary>
        /// Lấy thông tin sản phẩm theo Id
        /// </summary>
        /// <param name="GoodsId">Id sản phẩm</param>
        /// <returns></returns>
        [HttpGet("{GoodsId}")]
        public ActionServiceResult GetById([FromRoute] Guid GoodsId)
        {
            var response = new ActionServiceResult();
            if (Goods.Count == 0)
            {
                Goods = _baseMemoryCache.GetCache<Goods>("Goodss");
            }
            response.Data = Goods.Where<Goods>(b => b.GoodsId == GoodsId).FirstOrDefault();
            return response;
        }

        /// <summary>
        /// Thêm sản phẩm mới
        /// </summary>
        /// <param name="newGoods">Thông tin sản phẩm mới</param>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<ActionServiceResult> AddNewAsync([FromBody] Goods newGoods)
        {
            newGoods.GoodsId = Guid.NewGuid();
            var response = await _GoodsService.InsertAsync<Goods>(newGoods);
            if (response.Success == true && Goods.Count > 0)
            {
                // Cập nhật lại cache
                Goods.Add(newGoods);
                _baseMemoryCache.SetCache("Goodss", Goods);
            }
            return response;
        }


        /// <summary>
        /// Cập nhật thông tin sản phẩm
        /// </summary>
        /// <param name="newGoods"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<ActionServiceResult> UpdateAsync([FromBody] Goods newGoods)
        {
            var response = await _GoodsService.UpdateAsync<Goods>(newGoods);
            if (response.MISACode == MISACode.Success && Goods.Count > 0)
            {
                // Cập nhật lại cache
                Goods.Remove(Goods.Where<Goods>(p => p.GoodsId == newGoods.GoodsId).FirstOrDefault());
                Goods.Add(newGoods);
                _baseMemoryCache.SetCache("Goodss", Goods);
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
            var response = await _GoodsService.DeleteRangeAsync<Goods>(range);
            if (response.MISACode == MISACode.Success && Goods.Count > 0)
            {
                // Xóa cả trong cache
                range.ForEach(itemId =>
                   {
                       Goods.Remove(Goods.Where<Goods>(p => p.GoodsId == itemId).FirstOrDefault());
                   });
                _baseMemoryCache.SetCache("Goodss", Goods);
            }
            return response;
        }
    }
}
