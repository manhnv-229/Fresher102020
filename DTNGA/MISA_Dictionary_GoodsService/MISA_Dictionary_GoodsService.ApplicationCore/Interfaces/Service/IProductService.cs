using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service
{
    public interface IProductService : IBaseService
    {

        /// <summary>
        /// Thực hiện lấy thông tin chi tiết về sản phẩm (danh mục, thương hiệu,...)
        /// </summary>
        /// <param name="product">sản phẩm cần </param>
        /// <returns></returns>
        /// CreatedBy dtnga (21/12/2020)
        Product ProcessingProduct(Product product);

        /// <summary>
        /// Lấy thông tin sản phẩm theo bộ lọc và tìm kiếm (có paging)
        /// </summary>
        /// <param name="limit">Số bản ghi trên 1 trang</param>
        /// <param name="offset">số thứ tự trang cần lấy</param>
        /// <param name="keySearch">khóa tìm kiếm</param>
        /// <param name="brandId">Id thương hiệu</param>
        /// <param name="categoryId">Id danh mục</param>
        /// <returns></returns>
        /// CreatedBy dtnga (22/12/2020)
        Task<List<Product>> GetByFilterAsync(int limit, int offset, string keySearch=null, Guid? brandId=null, Guid? categoryId=null);

    }
}
