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

        public async Task<Category> ProcessingCategoryAsync(Category category)
        {
            // Lấy thông tin danh mục cha
            var parentCategoryId = category.CategoryParentId;
            if (parentCategoryId != null)
                category.ParentCategory = await base.GetByIdAsync<Category>(parentCategoryId);
            return category;
        }
    }
}
