using Dapper;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Repositories;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Services
{
    public class GoodsService : BaseService, IGoodsService
    {
        public GoodsService(IBaseMemoryCache baseMemoryCache, IBaseRepository baseRepository) : base(baseMemoryCache, baseRepository)
        {
            
        }


        public async Task<Goods> ProcessingGoodsAsync(Goods Goods)
        {
            //Lấy thông tin danh mục sản phẩm
            var categoryId = Goods.CategoryId;
            var category = await base.GetByIdAsync<Category>(categoryId);
            Goods.Category = category;
            //Lấy thông tin thương hiệu
            var brandId = Goods.BrandId;
            if (brandId != null)
            {
                var brand = await base.GetByIdAsync<Brand>((Guid)brandId);
                Goods.Brand = brand;
            }
            return Goods;
        }
    }
}
