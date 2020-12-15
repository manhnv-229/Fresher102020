using SManage.ApplicationCore.Entities;
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
        public TransportorService(IBaseRepository baseRepository) : base(baseRepository)
        {

        }

        public async Task<Transportor> GetTransportorById(Guid transportorId)
        {
            return await base.GetByIdAsync<Transportor>(transportorId);
        }
    }
}
