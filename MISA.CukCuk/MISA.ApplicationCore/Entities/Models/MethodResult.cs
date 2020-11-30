using MISA.ApplicationCore.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities.Models
{
    /// <summary>
    /// Dùng trong trường hợp trả về hàm void khi bình thường (không cần data trả về)
    /// </summary>
    public interface IMethodResult
    {
        /// <summary>
        /// Trạng thái thành công hay không
        /// </summary>
        bool Success { get; set; }
        /// <summary>
        /// Mã lỗi (nếu có)
        /// </summary>
        string Error { get; set; }
        /// <summary>
        /// Diễn giải cho lỗi (nếu có)
        /// </summary>
        object Message { get; set; }
        /// <summary>
        /// Mã lỗi trả về (trong trường hợp trả về qua http thì đây là http status code)
        /// </summary>
        MISACode? Status { get; set; }

        int TotalRecord { get; set; }

    }

    /// <summary>
    /// Dùng trong trường hợp trả về một dữ liệu nào đó khác void khi bình thường
    /// </summary>
    public class MethodResult : IMethodResult
    {
        public bool Success { get; set; } = true;
        public string Error { get; set; }
        public object Message { get; set; }
        public MISACode? Status { get; set; }
        public int TotalRecord { get; set; }

        public static MethodResult ResultWithError(string error, string message = "", MISACode? status = null) => new MethodResult()
        {
            Success = false,
            Message = message,
            Error = error,
            Status = status,
        };

        public static MethodResult ResultWithSuccess(string message = "", int totalRecord =0) => new MethodResult()
        {
            Success = true,
            Message = message,
            TotalRecord = totalRecord,
        };

        public static MethodResult ResultWithNotFound()
        {
            return ResultWithError("ERR_NOT_FOUND", "Không tìm thấy dữ liệu đã yêu cầu", MISACode.NotValid);
        }
    }

    /// <summary>
    /// Mọi kết quả trả về của Repository
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IMethodResult<T>
    {
        /// <summary>
        /// Trạng thái thành công hay không
        /// </summary>
        bool Success { get; set; }
        
        /// <summary>
        /// Mã lỗi (nếu có)
        /// </summary>
        string Error { get; set; }
        /// <summary>
        /// Diễn giải cho lỗi (nếu có)
        /// </summary>
        string Message { get; set; }
        /// <summary>
        /// Mã lỗi trả về (trong trường hợp trả về qua http thì đây là http status code)
        /// </summary>
        MISACode? Status { get; set; }
        /// <summary>
        /// số bản ghi ảnh hưởng
        /// </summary>
        int TotalRecord { get; set; }
        /// <summary>
        /// Output trả về nếu thành công
        /// </summary>
        T Data { get; set; }

    }

    public class MethodResult<T> : IMethodResult<T>
    {
        public bool Success { get; set; } = true;    
        public string Error { get; set; }
        public string Message { get; set; }
        public MISACode? Status { get; set; }
        public int TotalRecord { get; set; }
        public T Data { get; set; }

        public static MethodResult<T> ResultWithData(T data, string message = "", int totalRecord = 0) => new MethodResult<T>()
        {
            Data = data,
            Message = message,
            TotalRecord = totalRecord,
        };

        public static MethodResult<T> ResultWithError(string error, MISACode? status = null, string message = "", T data = default(T)) => new MethodResult<T>()
        {
            Success = false,
            Error = error,
            Message = message,
            Status = status,
            Data = data
        };

        public static MethodResult<T> ResultWithNotFound()
        {
            return ResultWithError("ERR_NOT_FOUND", MISACode.NotValid, "Không tìm thấy dữ liệu đã yêu cầu");
        }
    }
}
