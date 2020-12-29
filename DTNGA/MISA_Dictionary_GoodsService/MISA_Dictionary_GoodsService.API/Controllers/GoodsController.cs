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
        public GoodsController(IBaseMemoryCache baseMemoryCache, IGoodsService GoodsService)
        {
            _baseMemoryCache = baseMemoryCache;
            _GoodsService = GoodsService;

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
            for (var i = 0; i < goods.Count; i++)
                goods[i] = await _GoodsService.ProcessingGoodsAsync(goods[i]);
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
        /// <param name="goodsId">Id sản phẩm</param>
        /// <returns></returns>
        [HttpGet("{goodsId}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid goodsId)
        {
            var goods = _baseMemoryCache.GetCache<Goods>(goodsId.ToString());
            if (goods == null)
            {
                goods = await _GoodsService.GetByIdAsync<Goods>(goodsId);
                _baseMemoryCache.SetCache(goodsId.ToString(), goods);
            }
            goods = await _GoodsService.ProcessingGoodsAsync(goods);
            var result = JObject.FromObject(new
            {
                Data = goods
            });
            return Ok(result);
        }

        /// <summary>
        /// Thêm sản phẩm mới
        /// </summary>
        /// <param name="newGoods">Thông tin sản phẩm mới</param>
        /// <returns>Id sản phẩm mới được thêm thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<IActionResult> AddNewAsync([FromBody] Goods newGoods)
        {
            newGoods.GoodsId = Guid.NewGuid();
            var response = await _GoodsService.InsertAsync<Goods>(newGoods);
            if (response.Success == false)
                return (IActionResult)response;
            else
                return Ok(newGoods.GoodsId);
        }


        /// <summary>
        /// Cập nhật thông tin sản phẩm
        /// </summary>
        /// <param name="newGoods"></param>
        /// <returns>Id sản phẩm mới được cập nhật thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Goods newGoods)
        {
            var response = await _GoodsService.UpdateAsync<Goods>(newGoods);
            if (response.Success == false)
                return (IActionResult)response;
            else
                return Ok(newGoods.GoodsId);
        }


        /// <summary>
        /// Thực hiện xóa nhiều sản phẩm
        /// </summary>
        /// <param name="range">danh sách chứa Id các sản phẩm cần xóa</param>
        /// <returns>Danh sách id sản phẩm xóa thành công</returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete]
        public async Task<IActionResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            var response = await _GoodsService.DeleteRangeAsync<Goods>(range);
            if (response.Success == false)
                return (IActionResult)response;
            else
                return Ok(range);
        }
    }
}
