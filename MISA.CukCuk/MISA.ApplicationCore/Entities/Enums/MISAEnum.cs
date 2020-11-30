using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities.Enums
{
    public enum MISACode
    {
        /// <summary>
        /// dữ liệu hợp lệ
        /// </summary>
        IsValid = 100,
        /// <summary>
        /// dữ liệu không hợp lệ
        /// </summary>
        NotValid = 900,
        /// <summary>
        /// thành công
        /// </summary>
        Success = 200,
    }

    /// <summary>
    /// Xác định trạng thái của Object
    /// </summary>
    public enum EntityState
    {
        /// <summary>
        /// thêm mới
        /// </summary>
        AddNew = 1,
        /// <summary>
        /// update
        /// </summary>
        Update = 2,
        /// <summary>
        /// xóa
        /// </summary>
        Delete = 3,
    }
}
