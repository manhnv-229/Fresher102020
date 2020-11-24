using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Entity
{
    /// <summary>
    /// MISA code để xác định trạng thái của việc validate
    /// </summary>

    public enum MISACode
    {
        /// <summary>
        /// Dữ liệu hợp lệ
        /// </summary>
        IsValid= 100,
        /// <summary>
        /// Dữ liệu không hợp lệ
        /// </summary>
        NotValid= 900,
        /// <summary>
        /// Thành công
        /// </summary>
        Success= 200,
        /// <summary>
        /// Không tìm thấy đường dẫn
        /// </summary>
        NotFound= 404,
    }
}
