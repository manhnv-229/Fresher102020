using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Class
{
    /// <summary>
    /// nhóm khách hàng
    /// </summary>
    public class CustomerGroup
    {
        /// <summary>
        /// id của nhóm khách hàng
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public Guid CustomerGroupID { get; set; }
        /// <summary>
        /// mã nhóm khách hàng
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public string CustomerGroupCode { get; set; }
        /// <summary>
        /// tên nhóm khách hàng
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public string CustomerGroupName { get; set; }
        /// <summary>
        /// mô tả
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public string Description { get; set; }
        /// <summary>
        /// ngày tạo bản ghi
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public DateTime CreatedDate { get; set; }
        /// <summary>
        /// người tạo bản ghi
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public string CreatedBy { get; set; }
        /// <summary>
        /// ngày chỉnh sửa gần nhất
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public DateTime ModifileDate { get; set; }
        /// <summary>
        /// người chỉnh sửa
        /// </summary>
        /// createdBy: tqhuy(26/11/2020)
        public string ModifileBy { get; set; }
    }
}
