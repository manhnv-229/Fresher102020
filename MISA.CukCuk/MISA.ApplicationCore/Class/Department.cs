using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Class
{
    public class Department: BaseEntity
    {
        /// <summary>
        /// id phòng ban
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public Guid DepartmentID { get; set; }
        /// <summary>
        /// mã phòng ban
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public string DepartmentCode { get; set; }
        /// <summary>
        /// tên phòng ban
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public string DepartmentName { get; set; }
    }
}
