using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Enums
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
    public enum EntityState
    {
        AddNew=1,
        Update=2,
        Delete=3,
    }
}
