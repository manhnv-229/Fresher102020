using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Class
{
    /// <summary>
    /// chức vụ
    /// </summary>
    /// createdBy: tqhuy(1/12/2020)
    public class Possition: BaseEntity
    {
        /// <summary>
        /// khóa chính
        /// </summary>
        public Guid PossitionID { get; set; }
        /// <summary>
        /// mã vị trí
        /// </summary>
        public string PossitionCode { get; set; }
        /// <summary>
        /// tên vị trí
        /// </summary>
        public string PossitionName { get; set; }
    }
}
