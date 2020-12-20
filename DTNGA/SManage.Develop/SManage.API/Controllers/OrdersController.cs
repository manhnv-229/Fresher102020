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
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IOrderService _baseService;

        public OrdersController(IBaseMemoryCache baseMemoryCache, IOrderService baseService)
        {
            _baseMemoryCache = baseMemoryCache;
            _baseService = baseService;
        }



        /// <summary>
        /// Lấy thông tin đơn hàng theo phân trang
        /// </summary>
        /// <param name="shopId">Id cửa hàng</param>
        /// <param name="pageIndex">Số thứ tự trang</param>
        /// <param name="pageSize">Số bản ghi trên 1 trang</param>
        /// <returns></returns>
        [HttpGet("Paging/{shopId}")]
        public async Task<ActionServiceResult> GetOrderByPaging([FromRoute] Guid shopId, [FromQuery] int pageIndex, [FromQuery] int pageSize)
        {
            _baseMemoryCache.SetCache("ShopId", shopId);
            return await _baseService.GetByPagingAsync<Order>(pageSize, pageIndex);
        }

        /// <summary>
        /// Lấy thông tin đơn hàng theo bộ lọc
        /// </summary>
        /// <param name="filterType"></param>
        /// <param name="filterValue"></param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpGet("Filter/{shopId}")]
        public async Task<ActionServiceResult> GetOrderByFilter([FromRoute] Guid shopId, [FromQuery] string filterType, [FromQuery] string filterValue)
        {
            _baseMemoryCache.SetCache("ShopId", shopId);
            return await _baseService.GetByFilterAsync<Order>(filterType, filterValue);
        }
        /// <summary>
        /// Lấy thông tin đơn hàng theo Id
        /// </summary>
        /// <param name="orderId">Id đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpGet("{orderId}")]
        public async Task<ActionServiceResult> GetOrderById([FromRoute] Guid orderId)
        {
            var response = new ActionServiceResult();
            var order= (Order) (await _baseService.GetByIdAsync<Order>(orderId)).Data;
            return await _baseService.ProcessingOrder(order);

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
            return await _baseService.InsertAsync<Order>(order);
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
            return await _baseService.UpdateAsync<Order>(order);
        }

        /// <summary>
        /// Thực hiện xóa đơn hàng theo Id
        /// </summary>
        /// <param name="orderId">Id đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpDelete("{orderId}")]
        public async Task<ActionServiceResult> DeleteOrder([FromRoute] Guid orderId)
        {
            return await _baseService.DeleteAsync<Order>(orderId);
        }
    }
}
