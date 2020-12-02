using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Common.Models
{
    /// <summary>
    /// Phòng ban
    /// Author: TVHa (24/11/2020)
    /// </summary>
    public class Department
    {
        /// <summary>
        /// ID phòng ban
        /// </summary>
        public Guid DepartmentID { get; set; }

        /// <summary>
        /// Mã phòng ban
        /// </summary>
        public string DepartmentCode { get; set; }

        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }
    }
}