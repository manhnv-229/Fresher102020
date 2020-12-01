using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Enums
{
    /// <summary>
    /// MISA code xac dinh ma loi validate
    /// </summary>
    public enum MISACode
    {
        /// <summary>
        /// du lieu hop le
        /// </summary>
        IsValid = 100,
        /// <summary>
        /// du lieu chua hop le
        /// </summary>
        NotValid = 900,
        /// <summary>
        /// thanh cong
        /// </summary>
        Success =  200,
        /// <summary>
        /// ngoai le
        /// </summary>
        Exception = 500
    }
    /// <summary>
    /// Xác định trạng thái của object
    /// </summary>
    public enum EntityState 
    { 
        Addnew = 1,
        Update = 2,
        Delete = 3,
    }
}
