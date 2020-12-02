using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class CustomerGroup
    {
        #region Declare
        #endregion

        #region Constructor
        public CustomerGroup()
        {

        }
        #endregion

        #region Property
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid CustomerGroupId { get; set; }

        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public string CustomerGroupCode { get; set; }

        /// <summary>
        /// Họ
        /// </summary>
        public string CustomerGroupName { get; set; }

        /// <summary>
        /// Chi tiết
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Ngày tạo bản ghi
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người tạo bản ghi
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Ngày chỉnh sửa gần nhất
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Người chỉnh sửa gần nhất
        /// </summary>
        public string ModifiedBy { get; set; }
        #endregion

        #region Method
        #endregion
    }
}
