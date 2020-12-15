using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Repositories;
using SManage.ApplicationCore.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Services
{
    public class ShopService : BaseService, IShopService
    {
        public ShopService(IBaseRepository baseRepository) : base(baseRepository)
        {
        }

        public async Task<Shop> GetShopById(Guid shopId)
        {
            return await base.GetByIdAsync<Shop>(shopId);
        }
    }
}
