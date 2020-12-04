using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{

    /// <summary>
    /// Đối tượng Chức vụ
    /// </summary>
    public class Position : BaseEntity
    {

        #region Delare

        #endregion

        #region Constructor

        #endregion

        #region Property

        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid PositionId { get; set; }

        /// <summary>
        /// Mã chức vụ
        /// </summary>
        public string PositionCode { get; set; }

        /// <summary>
        /// Tên chức vụ
        /// </summary>
        public string PositionName { get; set; }
        #endregion

        #region Method

        #endregion
    }
}
