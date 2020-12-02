using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class Position : BaseEntity
    {
        #region Constructor
        public Position()
        {

        }
        #endregion

        #region Property
        /// <summary>
        /// <summary>
        /// Mã chức vụ
        /// </summary>
        public Guid PositionId { get; set; }

        /// <summary>
        /// Tên chức vụ
        /// </summary>
        public string PositionName { get; set; }

        #endregion
    }
}
