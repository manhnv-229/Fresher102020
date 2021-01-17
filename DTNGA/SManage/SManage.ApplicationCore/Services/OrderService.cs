using Dapper;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Entities.Base;
using SManage.ApplicationCore.Entities.DTO;
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

        public OrderService(IBaseMemoryCache baseMemoryCache, IBaseRepository baseRepository) : base(baseMemoryCache, baseRepository)
        {
        }

        /// <summary>
        /// Override lại InsertAsync ở BaseService
        /// </summary>
        /// <typeparam name="T">Order</typeparam>
        /// <param name="entity">Order</param>
        /// <returns></returns>
        public override async Task<ActionServiceResult> InsertAsync<T>(T entity)
        {
            var orderDTO = entity as OrderCreateDTO;
            var order = Order.ConvertFromCreateDTO(orderDTO);
            order.OrderId = Guid.NewGuid();
            order.OrderCode = RandomString(13);
            // Kiểm tra thông tin khách hàng đã có chưa, chưa thì thêm mới rồi lưu đơn hàng
            var customer = (await GetByPropertyAsync<Customer>("PhoneNumber", orderDTO.Customer.PhoneNumber)).FirstOrDefault();
            if(customer == null)
            {
                // thêm mới
                customer = orderDTO.Customer;
                customer.CustomerId = Guid.NewGuid();
                var res = await base.InsertAsync<Customer>(customer);
                if (res.Success == false)
                    return res;
            }
            order.CustomerId = (Guid)customer.CustomerId;
            // Thêm orderDetails
            var orderDetails = (List<OrderDetail>) orderDTO.OrderDetails;
            for(var i=0; i<orderDetails.Count; i++)
            {
                var detail = orderDetails[i];
                detail.OrderId = order.OrderId;
                var resOD= await base.InsertAsync<OrderDetail>(detail);
                if (resOD.Success == false)
                    return resOD;
            }
            return await base.InsertAsync<Order>(order);
        }

        /// <summary>
        /// Lấy thông tin chi tiết về đơn hàng (người tạo, người xử lý,...)
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        public async Task<OrderGetByIdDTO> ProcessingOrder(Order order)
        {
            if (order != null)
            {
                var orderGetById = OrderGetByIdDTO.ConvertFromOrder(order);
                // Lấy thông tin khách hàng
                orderGetById.Customer = _baseMemoryCache.GetCache<Customer>(order.CustomerId.ToString());
                if (orderGetById.Customer == null)
                {
                    // Lấy từ DB về theo ID Order
                    orderGetById.Customer = await GetByIdAsync<Customer>((Guid)order.CustomerId);
                }
                // Lấy thông tin sản phẩm
                orderGetById.OrderDetails = await GetByPropertyAsync<OrderDetail>("OrderId", order.OrderId);
                return orderGetById;
            }
            else return null;
        }

        public string RandomString(int length=20)
        {
            Random random = new Random();
            const string chars = "0123456789";
            length -= 3;
            var subString= new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
            return "OD_" + subString;
        }
    }
}
