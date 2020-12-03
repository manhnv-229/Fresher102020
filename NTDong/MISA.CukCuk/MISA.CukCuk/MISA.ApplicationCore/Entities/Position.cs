using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Class quản lí thông tin các vị trí 
    /// </summary>
    /// CreatedBy : NTDong(2/12/2020)
    public class Position:BaseEntity
    {
        /// <summary>
        /// Id Của vị trí 
        /// </summary>
        public Guid PositionId { get; set; }
        /// <summary>
        /// Mã Vị Trí 
        /// </summary>
        public string PositionCode { get; set; }
        /// <summary>
        /// Tên vị trí tương ứng 
        /// </summary>
        public string PositionName{ get; set; }

    }
}
