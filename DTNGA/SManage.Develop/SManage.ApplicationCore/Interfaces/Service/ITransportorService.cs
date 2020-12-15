using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Interfaces.Service
{
    public interface ITransportorService
    {
        /// <summary>
        /// Lấy thông tin chi tiết đơn vị vận chuyển theo Id
        /// </summary>
        /// <param name="transportorId">Id đơn vị vận chuyển</param>
        /// <returns></returns>
        /// CreatedBy dtnga (12/12/2020)
        Task<Transportor> GetTransportorById(Guid transportorId);
    }
}
