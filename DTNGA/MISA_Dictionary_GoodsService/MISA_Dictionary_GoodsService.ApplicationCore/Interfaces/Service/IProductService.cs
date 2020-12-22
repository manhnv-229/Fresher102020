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
        /// Lấy thông tin sản phẩm theo thương hiệu và danh mục
        /// </summary>
        /// <param name="brandId">Id thương hiệu</param>
        /// <param name="categoryId">Id danh mục</param>
        /// <returns></returns>
        /// CreatedBy dtnga (22/12/2020)
        Task<List<Product>> GetByFilterAsync(Guid? brandId, Guid? categoryId);
    }
}
