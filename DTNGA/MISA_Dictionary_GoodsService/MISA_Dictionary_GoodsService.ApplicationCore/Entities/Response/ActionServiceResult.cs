
using Microsoft.AspNetCore.Mvc;
using MISA_Dictionary_GoodsService.ApplicationCore.Properties;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    /// <summary>
    /// Response trả về
    /// </summary>
    /// CreatedBy dtnga (16/12/2020)
    public class ActionServiceResult
    {
        /// <summary>
        /// Trạng thái trả về
        /// </summary>
        public bool Success { get; set; }
        /// <summary>
        /// Thông báo trả về
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Mã thông báo trả về
        /// </summary>
        public MISACode MISACode { get; set; }
        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Hàm khởi tạo mặc định
        /// </summary>
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
        public ActionServiceResult(bool success, string message, MISACode misacode, object data)
        {
            Success = success;
            Message = message;
            MISACode = misacode;
            Data = data;
        }

    }
}
