using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service
{
    public interface ICategoryService: IBaseService
    {
        /// <summary>
        /// Thực hiện lấy thông tin chi tiết về danh mục (danh mục cha,...)
        /// </summary>
        /// <param name="category">danh mục cần xử lý</param>
        /// <returns></returns>
        /// CreatedBy dtnga (21/12/2020)
        Task<Category> ProcessingCategoryAsync(Category category);
    }
}
