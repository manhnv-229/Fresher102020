using Dapper;
using SManage.ApplicationCore.Entities.Base;
using SManage.ApplicationCore.Interfaces.Repositories;
using SManage.ApplicationCore.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Services
{
    public class TransportorService : BaseService, ITransportorService
    {
        public TransportorService(IBaseMemoryCache baseMemoryCache, IBaseRepository baseRepository) : base(baseMemoryCache, baseRepository)
        {
        }

        public async Task<TransportData> GetTransportData(Guid transportorId, Guid shopId, Guid customerAreaId)
        {
            var sp = "Proc_GetTransportData";
            var param = new DynamicParameters();
            param.Add("TransportorId", transportorId);
            param.Add("ShopId", shopId);
            param.Add("CustomerAreaId", customerAreaId);
            return await _baseRepository.GetTransportData(sp, param);
        }
    }
}
