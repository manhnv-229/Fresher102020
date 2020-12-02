using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Common.Models
{
    /// <summary>
    /// Phản hồi của service
    /// Author: TVHa (24/11/2020)
    /// </summary>
    public class ServiceResponse
    {
        /// <summary>
        /// Thông báo
        /// </summary>
        public List<string> Msg { get; set; } = new List<string>();

        /// <summary>
        /// Thành công
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Dữ liệu
        /// </summary>
        public object Data { get; set; }
    }
}