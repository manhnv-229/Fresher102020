using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Entities.Base;
using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Interfaces.Service.Base;

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        protected readonly IBaseService _baseService;
        protected readonly IBaseMemoryCache _baseMemoryCache;
        public ShopsController(IBaseService baseService, IBaseMemoryCache baseMemoryCache)
        {
            _baseService = baseService;
            _baseMemoryCache = baseMemoryCache;
        }

        /// <summary>
        /// Lấy thông tin cửa hàng theo Id
        /// </summary>
        /// <param name="shopId">Id cửa hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga (22/12/2020)
        [HttpGet("{shopId}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid shopId)
        {
            var shop = await _baseService.GetByIdAsync<Shop>(shopId);
            return Ok(shop);
        }

        /// <summary>
        /// Lấy danh sách đơn vị vận chuyển liên kết với cửa hàng
        /// </summary>
        /// <param name="shopId">Id cửa hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga /(13/12/2020)
        // GET api/<TransportorsController>/5
        [HttpGet("{shopId}/transportors")]
        public async Task<IActionResult> GetTransportorByShopIdAsync([FromRoute] Guid shopId)
        {
            var response = new ActionServiceResult();
            if (shopId == null) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
            var transportors = await _baseService.GetByPropertyAsync<Transportor>("ShopId", shopId);
            return Ok(transportors);
        }


        /// <summary>
        /// Lấy danh sách sản phẩm thuộc cửa hàng theo khóa tìm kiếm
        /// </summary>
        /// <param name="shopId">Id cửa hàng</param>
        ///  <param name="keySearch">Khóa tìm kiếm</param>
        /// <returns></returns>
        [HttpGet("{shopId}/products")]
        public async Task<IActionResult> GetProductByShopId([FromRoute] Guid shopId, [FromQuery] string keySearch)
        {
            if (shopId == Guid.Empty) return StatusCode(400, "Không có dữ liệu đầu vào");
            else
            {
                // Kiểm tra trong bộ đệm có sản phẩm mã code trùng với key tìm kiếm không, nếu có thì trả về luôn
                var ltProduct = (List<Product>)_baseMemoryCache.GetCache(shopId.ToString());
                var product = ltProduct.Where<Product>(p => p.ProductCode == keySearch.Trim());
                if (product != null) return StatusCode(200, product);
                else
                {
                    var filterValues = new Dictionary<string, object>
                {
                    { "KeySearch", keySearch },
                    { "ShopId", shopId}
                };
                    var products = (await _baseService.GetByFilterAsync<Product>(filterValues)).Data;
                    if (products.Count > 0) _baseMemoryCache.SetCache(shopId.ToString(), products);
                    return StatusCode(200, products);
                }
            }
        }

        /// <summary>
        /// Lấy danh sách nhân viên của cửa hàng
        /// </summary>
        /// <param name="shopId"></param>
        /// <returns></returns>
        [HttpGet("Salers")]
        public async Task<IActionResult> GetSalerByShopIdAsync([FromQuery] int page, [FromQuery] int size, [FromQuery] string keySearch, [FromQuery] Guid shopId)
        {
            var filterValues = new Dictionary<string, object>
            {
                { "PageIndex", page },
                { "PageSize", size },
                { "KeySearch", keySearch },
                { "ShopId", shopId}
            };
            var pagingData = await _baseService.GetByFilterAsync<UserInfo>(filterValues);
            return Ok(pagingData);
        }

        /// <summary>
        /// Lấy thông tin đơn hàng theo Id
        /// </summary>
        /// <param name="userId">Id đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpGet("Salers/{userId}")]
        public async Task<IActionResult> GetOrderById([FromRoute] Guid userId)
        {
            var user = _baseMemoryCache.GetCache<UserInfo>(userId.ToString());
            if (user == null)
            {
                user = await _baseService.GetByIdAsync<UserInfo>(userId);
                _baseMemoryCache.SetCache(userId.ToString(), user);
            }
            return Ok(user);
        }

        /// <summary>
        /// Thêm người dùng mới
        /// </summary>
        /// <param name="newUser">Thông tin người dùng mới</param>
        /// <returns>Id người dùng đã thêm mới</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost("Salers")]
        public async Task<IActionResult> AddNewAsync([FromBody] UserInfo newUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var response = await _baseService.InsertAsync<UserInfo>(newUser);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(201, newUser.UserId);
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex);
            }
        }


        /// <summary>
        /// Cập nhật thông tin người dùng
        /// </summary>
        /// <param name="newUser"></param>
        /// <returns>Id người dùng đã cập nhật</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut("Salers")]
        public async Task<IActionResult> UpdateAsync([FromBody] UserInfo newUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var response = await _baseService.UpdateAsync<UserInfo>(newUser);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(200, newUser.UserId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        /// <summary>
        /// Thực hiện xóa nhiều người dùng
        /// </summary>
        /// <param name="range">danh sách chứa Id các người dùng cần xóa</param>
        /// <returns>Danh sách Id người dùng đã xóa</returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete("Salers")]
        public async Task<IActionResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            try
            {
                if (range.Count == 0) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var response = await _baseService.DeleteRangeAsync<UserInfo>(range);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return Ok(range);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }

}
