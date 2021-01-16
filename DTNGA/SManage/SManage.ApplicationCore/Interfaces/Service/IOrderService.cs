using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Entities.DTO;
using SManage.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Interfaces.Service
{
    public interface IOrderService : IBaseService
    {
        /// <summary>
        ///  Lấy thêm thông tin khách hàng + sản phẩm cho đơn hàng, nếu chưa có
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        Task<OrderGetByIdDTO> ProcessingOrder(Order order);

        /// <summary>
        /// Thực hiện tạo mã đơn hàng
        /// </summary>
        /// <param name="length">độ dài mã đơn hàng</param>
        /// <returns></returns>
        string RandomString(int length=13);
    }
}
