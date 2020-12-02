using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Common.Models
{
    /// <summary>
    /// Chức vụ công việc
    /// Author: TVHa (24/11/2020)
    /// </summary>
    public class Position
    {
        /// <summary>
        /// ID chức vụ
        /// </summary>
        public Guid PositionID { get; set; }

        /// <summary>
        /// Tên chức vụ
        /// </summary>
        public string PositionName { get; set; }
    }
}