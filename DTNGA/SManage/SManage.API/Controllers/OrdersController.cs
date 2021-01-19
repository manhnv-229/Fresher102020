using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Entities.DTO;
using SManage.ApplicationCore.Interfaces.Service;
using SManage.ApplicationCore.Interfaces.Service.Base;

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private  IBaseMemoryCache _baseMemoryCache;
        private  IOrderService _orderService;

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
        public async Task<IActionResult> GetOrderState()
        {
            var states = await _orderService.GetAllAsync<OrderState>();
            return Ok(states);
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
            try
            {
                if (orderId == null) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var result = _baseMemoryCache.GetCache<OrderGetByIdDTO>(orderId.ToString());
                if (result == null)
                {
                    //order = await _orderService.GetByIdAsync<OrderGetByIdDTO>(orderId);
                    var order = await _orderService.GetByIdAsync<Order>(orderId);
                    result  = await _orderService.ProcessingOrder(order);
                    _baseMemoryCache.SetCache(orderId.ToString(), result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


        /// <summary>
        /// Thực hiện thêm đơn hàng mới
        /// </summary>
        /// <param name="newOrder">Thông tin đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpPost]
        public async Task<IActionResult> CreatOrder([FromBody] OrderCreateDTO newOrder)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                
                // override phương thức insertAsync
                var response = await _orderService.InsertAsync<OrderCreateDTO>(newOrder);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(201, response.Data);
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex);
            }
        }


        /// <summary>
        /// Thực hiện cập nhật đơn hàng
        /// </summary>
        /// <param name="newOrder">thông tin đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpPut("{orderId}")]
        public async Task<IActionResult> UpdateOrder([FromBody] OrderUpdateDTO newOrder)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                
                // override lại phương thức UpdateAsync
                var response = await _orderService.UpdateAsync<OrderUpdateDTO>(newOrder);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(200, response.Data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
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
