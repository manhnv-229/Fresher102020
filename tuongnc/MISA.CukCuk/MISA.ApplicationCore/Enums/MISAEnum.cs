using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Enums
{
    /// <summary>
    /// Xác đính các mã lỗi 
    /// </summary>
    public enum MISACode
    {
        /// <summary>
        /// Dữ liệu hợp lệ
        /// </summary>
        IsValid = 100,
        /// <summary>
        /// Dữ liệu không hợp lệ
        /// </summary>
        NotValid = 900,
        /// <summary>
        /// Thành công
        /// </summary>
        Success  = 200,

    }
    /// <summary>
    /// Xác định trạng  thái object
    /// </summary>
    public enum EntityStage
    {
        Add = 1,
        Update = 2,
        Delete = 3,
    }
}
