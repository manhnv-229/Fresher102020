using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Enums
{
    public enum MISACode
    {
        Isvalid = 100,
        Notvalid = 900,
        Success = 200,
        Exception = 500,
    }

    public enum EntityState
    {
        AddNew = 1,
        Update = 2,
        Delete = 3,
    }
}
