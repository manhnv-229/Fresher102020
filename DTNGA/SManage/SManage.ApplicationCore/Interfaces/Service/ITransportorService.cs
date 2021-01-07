using SManage.ApplicationCore.Entities.Base;
using SManage.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Interfaces.Service
{
    public interface ITransportorService : IBaseService
    {
        /// <summary>
        /// Lấy thông tin vận chuyển (chi phí, ngày giao hàng dự kiến)
        /// </summary>
        /// <param name="transportorId"></param>
        /// <param name="shopId"></param>
        /// <param name="customerAreaId"></param>
        /// <returns></returns>
        Task<TransportData> GetTransportData(Guid transportorId,  Guid shopId, Guid customerAreaId);
    }
}
