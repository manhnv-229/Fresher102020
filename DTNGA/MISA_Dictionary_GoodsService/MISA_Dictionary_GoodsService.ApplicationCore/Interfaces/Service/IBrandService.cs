using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service
{
    public interface IBrandService : IBaseService
    {
        Task<List<string>> GetBrandOrigin();
    }
}
