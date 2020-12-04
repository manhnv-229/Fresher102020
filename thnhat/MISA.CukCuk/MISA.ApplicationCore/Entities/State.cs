using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{

    /// <summary>
    /// Đối tượng trạng thái công việc
    /// </summary>
    public class State : BaseEntity
    {

        #region Delare

        #endregion

        #region Constructor

        #endregion

        #region Property

        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid StateId { get; set; }

        /// <summary>
        /// Mã trạng thái công việc
        /// </summary>
        public string StateCode { get; set; }

        /// <summary>
        /// Tên trạng thái công việc
        /// </summary>
        public string StateName { get; set; }
        #endregion

        #region Method

        #endregion
    }
}
