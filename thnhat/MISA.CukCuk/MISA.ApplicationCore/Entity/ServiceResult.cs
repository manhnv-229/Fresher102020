using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entity
{
    public class ServiceResult
    {
        #region Preperty
        public Object Data { get; set; }
        public String Messenger { get; set; }
        public MISACode MISACode { get; set; }
        #endregion
    }
}
