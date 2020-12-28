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
    public class ProductService : BaseService, IProductService
    {
        protected List<Product> products;
        public ProductService(IBaseMemoryCache baseMemoryCache, IBaseRepository baseRepository) : base(baseMemoryCache, baseRepository)
        {
            
        }


        public  Product ProcessingProduct(Product product)
        {
            //Lấy thông tin danh mục sản phẩm
            var categoryId = product.CategoryId;
            var categories= _baseMemoryCache.GetCache<Category>("Categories");
            var category = categories.Where(c => c.CategoryId == categoryId).FirstOrDefault();
            //Lấy thông tin thương hiệu
            var brandId = product.BrandId;
            var brands= _baseMemoryCache.GetCache<Brand>("Brands");
            var brand = brands.Where<Brand>(b => b.BrandId == brandId).FirstOrDefault();
            product.Category = category;
            product.Brand = brand;
            return product;
        }
    }
}
