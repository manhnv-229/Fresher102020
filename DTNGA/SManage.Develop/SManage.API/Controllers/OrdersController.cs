using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;

namespace SManage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        
        /// <summary>
        /// Lấy thông tin đơn hàng theo phân trang
        /// </summary>
        /// <param name="pageIndex">Số thứ tự trang</param>
        /// <param name="pageSize">Số bản ghi trên 1 trang</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpGet("Paging")]
        public async Task<ActionServiceResult> GetOrderByPaging([FromQuery] int pageIndex, [FromQuery] int pageSize)
        {
            var response = new ActionServiceResult();

            return response;
        }

        /// <summary>
        /// Lấy thông tin đơn hàng theo bộ lọc
        /// </summary>
        /// <param name="filterType"></param>
        /// <param name="filterValue"></param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpGet("Filter")]
        public async Task<ActionServiceResult> GetOrderByFilter([FromQuery] string filterType, [FromQuery] string filterValue)
        {
            var response = new ActionServiceResult();

            return response;
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

            return response;
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
            var response = new ActionServiceResult();

            return response;
        }

        /// <summary>
        /// Thực hiện cập nhật đơn hàng
        /// </summary>
        /// <param name="orderId">Id đơn hàng</param>
        /// <param name="order">thông tin đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpPut("{orderId}")]
        public async Task<ActionServiceResult> UpdateOrder([FromQuery] Guid orderId, [FromBody] Order order)
        {
            var response = new ActionServiceResult();

            return response;
        }

        /// <summary>
        /// Thực hiện xóa đơn hàng theo Id
        /// </summary>
        /// <param name="orderId">Id đơn hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpDelete("{orderId}")]
        public async Task<ActionServiceResult> DeleteOrder([FromQuery] Guid orderId)
        {
            var response = new ActionServiceResult();

            return response;
        }
    }
}
