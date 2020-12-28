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
        protected List<Goods> Goodss;
        public GoodsService(IBaseMemoryCache baseMemoryCache, IBaseRepository baseRepository) : base(baseMemoryCache, baseRepository)
        {
            
        }


        public  Goods ProcessingGoods(Goods Goods)
        {
            //Lấy thông tin danh mục sản phẩm
            var categoryId = Goods.CategoryId;
            var categories= _baseMemoryCache.GetCache<Category>("Categories");
            var category = categories.Where(c => c.CategoryId == categoryId).FirstOrDefault();
            //Lấy thông tin thương hiệu
            var brandId = Goods.BrandId;
            var brands= _baseMemoryCache.GetCache<Brand>("Brands");
            var brand = brands.Where<Brand>(b => b.BrandId == brandId).FirstOrDefault();
            Goods.Category = category;
            Goods.Brand = brand;
            return Goods;
        }
    }
}
