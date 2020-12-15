using SManage.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Interfaces.Service
{
    public interface IShopService
    {
        /// <summary>
        /// Lấy thông tin chi tiết cửa hàng theo Id
        /// </summary>
        /// <param name="transportorId">Id cửa hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga (12/12/2020)
        Task<Shop> GetShopById(Guid shopId);
    }
}
