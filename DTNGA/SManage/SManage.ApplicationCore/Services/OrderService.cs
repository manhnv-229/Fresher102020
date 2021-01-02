using Dapper;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Entities.Base;
using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Interfaces.Repositories;
using SManage.ApplicationCore.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Services
{
    public class OrderService : BaseService, IOrderService
    {
        protected Guid shopId;

        public OrderService(IBaseMemoryCache baseMemoryCache ,IBaseRepository baseRepository) : base(baseMemoryCache, baseRepository)
        {
        }

        /// <summary>
        /// Lấy thông tin chi tiết về đơn hàng (người tạo, người xử lý,...)
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        public async Task<ActionServiceResult> ProcessingOrder(Order order)
        {
            _actionServiceResult = new ActionServiceResult();
            // Đọc người tạo
            var createrId = order.CreatedBy;
            var creater = (await base.GetByPropertyAsync<UserInfo>("AccountId", createrId)).Data;            
            order.Creater = (UserInfo)creater;
            // Đọc người xử lý
            var modifierId = order.ModifiedBy;
            var modifier = (await base.GetByPropertyAsync<UserInfo>("AccountId", modifierId)).Data;
            order.Modifier = (UserInfo)modifier;
            // Đọc khách hàng
            var customerId = order.CustomerId;
            var customer= (await base.GetByIdAsync<Customer>(customerId)).Data;
            order.Customer = (Customer)customer;
            // Đọc danh sách chi tiết đơn hàng
            var orderId = order.OrderId;
            var listOrderDetail = (await base.GetByPropertyAsync<OrderDetail>("OrderId", orderId)).Data;
            order.OrderDetails = (ICollection<OrderDetail>)listOrderDetail;
            _actionServiceResult.Data = order;
            return _actionServiceResult;
        }


    }
}
