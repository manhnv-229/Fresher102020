using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Properties;
using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore
{
    public class ActionServiceResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public MISACode MISACode { get; set; }
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

        public ActionServiceResult(bool success, string message, MISACode misacode, object data)
        {
            Success = success;
            Message = message;
            MISACode = misacode;
            Data = data;
        }
    }
}
