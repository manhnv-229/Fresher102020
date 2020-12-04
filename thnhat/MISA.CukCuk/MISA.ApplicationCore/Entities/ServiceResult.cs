using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Kết quả do server trả về
    /// </summary>
    public class ServiceResult
    {
        #region Preperty

        /// <summary>
        /// Nội dung kết quả
        /// </summary>
        public Object Data { get; set; }

        /// <summary>
        /// Thông báo trả về
        /// </summary>
        public String Messenger { get; set; }

        /// <summary>
        /// Mã kết quả
        /// </summary>
        public MISACode MISACode { get; set; }
        #endregion
    }
}
