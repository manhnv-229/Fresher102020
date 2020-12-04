using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{

    /// <summary>
    /// Đối tượng Giới tính
    /// </summary>
    public class Gender : BaseEntity
    {
        #region Delare

        #endregion

        #region Constructor

        #endregion

        #region Property

        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid GenderId { get; set; }

        /// <summary>
        /// Mã giới tính
        /// </summary>
        public string GenderCode { get; set; }

        /// <summary>
        /// Tên giới tính
        /// </summary>
        public string GenderName { get; set; }
        #endregion

        #region Method

        #endregion
    }
}
