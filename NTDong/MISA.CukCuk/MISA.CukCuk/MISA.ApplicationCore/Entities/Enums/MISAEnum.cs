using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Enums
{
    /// <summary>
    /// MISACode để xác định của việc validate  
    /// </summary>
    /// CraetedBy: NTDong(24/11/2020)
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
        Success = 200
    }
    /// <summary>
    /// Xac dinh trang thai cua object
    /// </summary>
    public enum EntityState
    {
        AddNew = 1,
        Update = 2,
        Delete = 3,
    }
}
