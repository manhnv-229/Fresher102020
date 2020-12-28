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
    public class CategoryService : BaseService, ICategoryService
    {
        public CategoryService(IBaseMemoryCache baseMemoryCache, IBaseRepository baseRepository) : base(baseMemoryCache, baseRepository)
        {
        }

        public Category ProcessingCategory(Category category)
        {
            // Lấy thông tin danh mục cha
            var parentCategoryId = category.CategoryParentId;
            if (parentCategoryId != null)
            {
                var categories = _baseMemoryCache.GetCache<Category>("Categories");
                category.ParentCategory = categories.Where(c => c.CategoryId == parentCategoryId).FirstOrDefault();
            }

            return category;
        }
    }
}
