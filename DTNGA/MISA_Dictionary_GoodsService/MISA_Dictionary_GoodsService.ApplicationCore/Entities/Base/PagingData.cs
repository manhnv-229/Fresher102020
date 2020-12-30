using System;
using System.Collections.Generic;
using System.Text;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Entities.Base
{
    public class PagingData<T>
    {
        /// <summary>
        /// Tổng số bản ghi thỏa mãn
        /// </summary>
        public int? Total { get; set; }
        /// <summary>
        /// Danh sách bản ghi lấy theo phân trang
        /// </summary>
        public List<T> Data { get; set; }
    }
}
