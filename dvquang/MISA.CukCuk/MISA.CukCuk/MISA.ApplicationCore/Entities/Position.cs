using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// class vị trí làm việc
    /// </summary>
    public class Position:BaseEntity
    {
        #region Properties
        /// <summary>
        /// id vị trí làm việc
        /// </summary>
        public Guid PositionId { get; set; }
        /// <summary>
        /// mã vị trí làm việc
        /// </summary>
        public string PositionCode { get; set; }
        /// <summary>
        /// tên vị trí làm việc
        /// </summary>
        public string PositionName { get; set; }
        #endregion
    }
}
