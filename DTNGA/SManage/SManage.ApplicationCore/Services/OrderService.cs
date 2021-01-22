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
            // check thông tin khách hàng
            var result = await checkCustomerAsync(orderDTO.Customer);
            if(result.Data!=null)
                order.CustomerId = (Guid)((Customer)result.Data).CustomerId;
            // Thêm orderDetails
            var orderDetails = (List<OrderDetail>) orderDTO.OrderDetails;
            for(var i=0; i<orderDetails.Count; i++)
            {
                var detail = orderDetails[i];
                detail.OrderDetailId = Guid.NewGuid();
                detail.OrderId = order.OrderId;
                var resOD= await base.InsertAsync<OrderDetail>(detail);
                if (resOD.Success == false)
                    return resOD;
            }
            return await base.InsertAsync<Order>(order);
        }

        public override async Task<ActionServiceResult> UpdateAsync<T>(T entity)
        {
            var response = new ActionServiceResult();

            var orderDTO = entity as OrderUpdateDTO;
            var newOrder = Order.ConvertFromUpdateDTO(orderDTO);
            var order =await GetByIdAsync<Order>(orderDTO.OrderId);
            order = MappingObject<Order>(order, newOrder);
            //TODO check thông tin orderDetails

            // check thông tin khách hàng
            var result = await checkCustomerAsync(orderDTO.Customer);
            if (result.Data != null)
                order.CustomerId = (Guid)((Customer)result.Data).CustomerId;
            // check id đơn vị vận chuyển hợp lệ không
            var transportorId = order.TransportorId;
            if(transportorId!= null)
            {
                var tran = await base.GetByIdAsync<Transportor>((Guid)transportorId);
                if (tran == null) {
                    // đơn vị vận chuyển không tồn tại
                    response.Success = false;
                    response.MISACode = MISACode.ValidateEntity;
                    response.Message = ApplicationCore.Properties.Resources.ValueEntity;
                    return response;
                }
                else
                {
                    order.TransportorId = transportorId;
                }
            }
            return await base.UpdateAsync<Order>(order);
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

        /// <summary>
        /// Thực hiện kiểm tra thông tin khách hàng trên hệ thống,
        /// nếu chưa có thì thêm mới,
        /// nếu đã có thì kiểm tra có thay đổi thông tin hay không -> cập nhật hoặc không
        /// </summary>
        /// <param name="newCustomer">Thông tin khách hàng cần kiểm tra</param>
        /// <returns>Thông tin khách hàng nếu thêm/cập nhật thành công. Nếu lỗi, trả về lỗi</returns>
        public async Task<ActionServiceResult> checkCustomerAsync(Customer newCustomer)
        {
            // Kiểm tra thông tin khách hàng đã có chưa, chưa thì thêm mới rồi lưu đơn hàng
            var customer = (await GetByPropertyAsync<Customer>("PhoneNumber", newCustomer.PhoneNumber)).FirstOrDefault();
            if (customer == null)
            {
                // thêm mới
                newCustomer.CustomerId = Guid.NewGuid();
                return await base.InsertAsync<Customer>(newCustomer);
            }
            else
            {
                //Kiểm tra thông tin khách hàng có thay đổi hay không, có thì thực hiện cập nhật, trả về thông tin mới
                var changedProperties = CompareEntity<Customer>(customer, newCustomer);
                if (changedProperties.Count>0)
                {
                    customer = MappingObject<Customer>(customer, newCustomer);
                    return await base.UpdateAsync<Customer>(customer);
                }
                else return new ActionServiceResult { Data = customer };
            }
        }
                
    }
}
