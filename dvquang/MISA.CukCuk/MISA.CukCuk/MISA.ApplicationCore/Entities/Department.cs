using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// class phòng ban
    /// </summary>
    public class Department:BaseEntity

    {
        #region Properties
        /// <summary>
        /// id phòng ban
        /// </summary>
        public Guid DepartmentId { get; set; }
        /// <summary>
        /// mã phòng ban
        /// </summary>
        public string DepartmentCode { get; set; }
        /// <summary>
        /// tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }
        #endregion
    }
}
