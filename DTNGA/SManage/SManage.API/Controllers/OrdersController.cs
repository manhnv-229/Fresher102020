using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Service;
using SManage.ApplicationCore.Interfaces.Service.Base;

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IOrderService _orderService;

        public OrdersController(IBaseMemoryCache baseMemoryCache, IOrderService baseService)
        {
            _baseMemoryCache = baseMemoryCache;
            _orderService = baseService;
        }
        
        /// <summary>
        /// Lấy danh sách trạng thái đơn hàng trên hệ thống
        /// </summary>
        /// <returns></returns>
        [HttpGet("state")]
        public async Task<ActionServiceResult> GetOrderState()
        {
            return await _orderService.GetAllAsync<OrderState>();
        }

        /// <summary>
        /// Lấy danh sách đơn hàng
        /// </summary>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <param name="keySearch"></param>
        /// <param name="shopId"></param>
        /// <param name="orderStateId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetByFilterAsync([FromQuery] int page, [FromQuery] int size, [FromQuery] string keySearch, [FromQuery] Guid shopId, [FromQuery] Guid? orderStateId)
        {
            var filterValues = new Dictionary<string, object>
            {
                { "PageIndex", page },
                { "PageSize", size },
                { "KeySearch", keySearch },
                { "ShopId", shopId},
                { "OrderStateId", orderStateId}
            };
            var pagingData = await _orderService.GetByFilterAsync<Order>(filterValues);
            return Ok(pagingData);
        }

        /// <summary>
        /// Lấy thông tin đơn hàng theo Id
        /// </summary>
        /// <param name="orderId">Id đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderById([FromRoute] Guid orderId)
        {
            var order = _baseMemoryCache.GetCache<Order>(orderId.ToString());
            if (order == null)
            {
                order = (Order)(await _orderService.GetByIdAsync<Order>(orderId)).Data;
                _baseMemoryCache.SetCache(orderId.ToString(), order);
            }
            return Ok(order);

        }

        /// <summary>
        /// Thực hiện thêm đơn hàng mới
        /// </summary>
        /// <param name="order">Thông tin đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpPost]
        public async Task<ActionServiceResult> CreatOrder([FromBody] Order order)
        {
            return await _orderService.InsertAsync<Order>(order);
        }

        /// <summary>
        /// Thực hiện cập nhật đơn hàng
        /// </summary>
        /// <param name="orderId">Id đơn hàng</param>
        /// <param name="order">thông tin đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpPut("{orderId}")]
        public async Task<ActionServiceResult> UpdateOrder([FromBody] Order order)
        {
            return await _orderService.UpdateAsync<Order>(order);
        }

        /// <summary>
        /// Thực hiện xóa đơn hàng theo Id
        /// </summary>
        /// <param name="range">Id đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpDelete]
        public async Task<IActionResult> DeleteOrder([FromBody] List<Guid> range)
        {
            var response = await _orderService.DeleteRangeAsync<Order>(range);
            if (response.Success == false)
                return StatusCode((int)response.MISACode, response);
            else
                return Ok(range);
        }
    }
}
