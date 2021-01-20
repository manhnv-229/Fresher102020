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


    }

}
