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
        IsValid = 100,
        NotValid = 900,
        Success =  200,
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
