using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service
{
    public interface IGoodsService : IBaseService
    {

        /// <summary>
        /// Thực hiện lấy thông tin chi tiết về sản phẩm (danh mục, thương hiệu,...)
        /// </summary>
        /// <param name="goods">sản phẩm cần xử lý</param>
        /// <returns></returns>
        /// CreatedBy dtnga (21/12/2020)
        Task<Goods> ProcessingGoodsAsync(Goods goods);

    }
}
