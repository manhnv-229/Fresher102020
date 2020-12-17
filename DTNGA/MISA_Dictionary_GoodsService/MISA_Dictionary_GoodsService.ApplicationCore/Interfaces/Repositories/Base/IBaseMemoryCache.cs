using System;
using System.Collections.Generic;
using System.Text;

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    /// <summary>
    /// Base thực hiên giao tiếp với Cache
    /// </summary>
    /// CreatedBy dtnga (11/11/2020)
    public interface IBaseMemoryCache
    {

        /// <summary>
        /// Thực hiện lấy dữ liệu từ cache
        /// </summary>
        /// <param name="key">Khóa để lấy dữ liệu</param>
        /// <returns>Đối tượng chứa dữ liệu có khóa được mô tả</returns>
        /// CreatedBy dtnga (11/11/2020)
        object GetCache(string key);

        /// <summary>
        /// Thực hiện thêm dữ liệu vào cache theo key
        /// </summary>
        /// <param name="key">Khóa để thêm dữ liệu</param>
        /// <param name="data">Đối tượng chứa dữ liệu</param>
        /// CreatedBy dtnga (11/11/2020)
        void SetCache(string key, object data);

        /// <summary>
        ///  Thực hiện cache dữ liệu thay đổi liên tục
        /// </summary>
        /// <param name="key">Key</param>
        /// <param name="data">Dữ liệu cache</param>
        ///CreatedBy dtnga(11/11/2020)
        void SetCacheModify(string key, object data);
    }
}
