using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Common.Models
{
    /// <summary>
    /// Các enum dùng chung
    /// Author: TVHa (24/11/2020)
    /// </summary>
    public class Enumeration
    {
        /// <summary>
        /// Enum trạng thái làm việc
        /// </summary>
        public enum WorkStatus
        {
            /// <summary>
            /// Đã nghỉ việc
            /// </summary>
            Stopped = 0,
            /// <summary>
            /// Đang làm việc
            /// </summary>
            Working = 1,
            /// <summary>
            ///  Đang thử việc
            /// </summary>
            Waiting = 2
        }
    }
}