using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Properties;
using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore
{
    public class ActionServiceResult
    {
        /// <summary>
        /// Thành công hay không
        /// </summary>
        public bool Success { get; set; }
        /// <summary>
        /// Thông báo trả về
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Mã kết quả trả về
        /// </summary>
        public MISACode MISACode { get; set; }
        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
        /// CreatedBy dtnga (08/12/2020)
        public ActionServiceResult()
        {
            Success = true;
            Message = Resources.Success;
            MISACode = MISACode.Success;
            Data = null;
        }

        /// <summary>
        /// Hàm khởi tạo có tham số
        /// </summary>
        /// <param name="success"></param>
        /// <param name="message"></param>
        /// <param name="misacode"></param>
        /// <param name="data"></param>
        /// CreatedBy dtnga (08/12/2020)
        public ActionServiceResult(bool success, string message, MISACode misacode, object data)
        {
            Success = success;
            Message = message;
            MISACode = misacode;
            Data = data;
        }
    }
}
