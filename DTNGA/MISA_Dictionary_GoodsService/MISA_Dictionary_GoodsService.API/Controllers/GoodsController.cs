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
    public class GoodsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IGoodsService _goodsService;
        public GoodsController(IBaseMemoryCache baseMemoryCache, IGoodsService GoodsService)
        {
            _baseMemoryCache = baseMemoryCache;
            _goodsService = GoodsService;

        }

        /// <summary>
        /// Lấy thông tin hàng hóa theo bộ lọc và tìm kiếm
        /// </summary>
        /// <param name="size">Số bản ghi trên trang</param>
        /// <param name="page">Số thứ tự trang</param>
        /// <param name="keyWord">key tìm kiếm</param>
        /// <param name="brandId">Id thương hiệu</param>
        /// <param name="categoryId">Id danh mục</param>
        /// <returns>Dánh sách hàng hóa thỏa mãn thuộc trang và tổng bản ghi thỏa mãn</returns>
        /// CreatedBy dtnga (24/12/2020)
        /// ModifiedBy dtnga (26/12/2020) : Thay đổi tham số
        [HttpGet]
        public async Task<IActionResult> GetByFilterAsync([FromQuery] int page, [FromQuery] int size, [FromQuery] string keyWord, [FromQuery] Guid? brandId, [FromQuery] Guid? categoryId)
        {
            try
            {
                var filterValues = new Dictionary<string, object>
                {
                    { ConstParameter.PageIndex, page },
                    { ConstParameter.PageSize, size },
                    { ConstParameter.KeyWord, keyWord },
                    { ConstParameter.BrandId, brandId },
                    { ConstParameter.CategoryId, categoryId }
                };
                var pagingData = await _goodsService.GetPagingByFilterAsync<Goods>(filterValues);
                return Ok(pagingData);
            }
            catch (Exception e)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }

        }

        /// <summary>
        /// Kiểm tra trùng lặp dữ liệu
        /// </summary>
        /// <param name="key">Khóa kiểm tra</param>
        /// <param name="value">Giá trị cần kiểm tra</param>
        /// <returns>true-trùng dữ liệu đã có trên hệ thống, false- ngược lại</returns>
        /// CreatedBy dtnga (30/12/2020)
        [HttpGet("duplication")]
        public async Task<IActionResult> CheckDuplicate([FromQuery] string key, [FromQuery] string value)
        {
            try
            {
                if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(value)) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                bool duplicate = false;
                if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(value) || value.Length > 20)
                    return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var result = new Goods();
                if (key == ConstParameter.GoodsBarcode)
                    result = (await _goodsService.GetByPropertyAsync<Goods>(ConstParameter.GoodsBarcode, value)).FirstOrDefault();
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
        /// Lấy thông tin hàng hóa theo Id
        /// </summary>
        /// <param name="goodsId">Id hàng hóa</param>
        /// <returns>Thông tin hàng hóa theo Id</returns>
        [HttpGet("{goodsId}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid goodsId)
        {
            try
            {
                if (goodsId==null) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var goods = _baseMemoryCache.GetCache<Goods>(goodsId.ToString());
                if (goods == null)
                {
                    goods = await _goodsService.GetByIdAsync<Goods>(goodsId);
                    if(goods==null)
                        return StatusCode(400, ApplicationCore.Properties.Resources.ValueEntity);
                    _baseMemoryCache.SetCache(goodsId.ToString(), goods);
                }
                return Ok(goods);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Thêm hàng hóa mới
        /// </summary>
        /// <param name="newGoods">Thông tin hàng hóa mới</param>
        /// <returns>Id hàng hóa mới được thêm thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<IActionResult> AddNewAsync([FromBody] GoodsCreateDTO newGoods)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var goods = Goods.ConvertFromCreateDTO(newGoods);
                goods.GoodsId = Guid.NewGuid();
                var brand =await _goodsService.GetByIdAsync<Brand>((Guid)goods.BrandId);
                if (brand == null)
                    return StatusCode(400, ApplicationCore.Properties.Resources.ValueEntity);
                var category =await _goodsService.GetByIdAsync<Category>(goods.CategoryId);
                if (category == null)
                    return StatusCode(400, ApplicationCore.Properties.Resources.ValueEntity);
                var response = await _goodsService.InsertAsync<Goods>(goods);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(201, goods.GoodsId);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }


        /// <summary>
        /// Cập nhật thông tin hàng hóa
        /// </summary>
        /// <param name="newGoods"></param>
        /// <returns>Id hàng hóa được cập nhật thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] GoodsUpdateDTO newGoods)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var checkGoods = await _goodsService.GetByIdAsync<Goods>(newGoods.GoodsId);
                if (checkGoods == null)
                    return StatusCode(400, ApplicationCore.Properties.Resources.ValueEntity);
                // TODO map object
                var goods = Goods.ConvertFromUpdateDTO(newGoods);
                var brand =await _goodsService.GetByIdAsync<Brand>((Guid)goods.BrandId);
                if (brand == null)
                    return StatusCode(400, ApplicationCore.Properties.Resources.ValueEntity);
                var category =await _goodsService.GetByIdAsync<Category>(goods.CategoryId);
                if (category == null)
                    return StatusCode(400, ApplicationCore.Properties.Resources.ValueEntity);
                var response = await _goodsService.UpdateAsync<Goods>(goods);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                {
                    var id = goods.GoodsId.ToString();
                    if ((_baseMemoryCache.GetCache<Goods>(goods.GoodsId.ToString())) != null)
                    {
                        _baseMemoryCache.SetCache(goods.GoodsId.ToString(), goods);
                    }
                    return StatusCode(200, goods.GoodsId);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }


        /// <summary>
        /// Thực hiện xóa nhiều hàng hóa
        /// </summary>
        /// <param name="range">danh sách chứa Id các hàng hóa cần xóa</param>
        /// <returns>Danh sách id hàng hóa xóa thành công</returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete]
        public async Task<IActionResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            try
            {
                if (range.Count == 0) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var response = await _goodsService.DeleteRangeAsync<Goods>(range);
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
