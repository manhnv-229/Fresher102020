using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class ServiceResult
    {
        /// <summary>
        /// Đối tượng lưu trữ thông tin lỗi
        /// </summary>
        public object Data { get; set; }
        /// <summary>
        /// Thông điệp lỗi
        /// </summary>
        public string Messenger { get; set; }
        /// <summary>
        /// Mã lỗi
        /// </summary>
        public MISACode MISACode { get; set; }

    }
}
