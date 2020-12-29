using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Repositories;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Services
{
    public class BrandService : BaseService, IBrandService
    {

        public BrandService(IBaseMemoryCache baseMemoryCache, IBaseRepository baseRepository) : base(baseMemoryCache, baseRepository)
        {
        }

        public async Task<List<string>> GetBrandOrigin()
        {
            var sp = string.Format(Properties.Resources.GetProperty, "BrandOrigin");
            var origins = await _baseRepository.GetAsync<string>(sp);
            return origins;
        }
    }
}
