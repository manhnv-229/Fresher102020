using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;

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
    }
}
