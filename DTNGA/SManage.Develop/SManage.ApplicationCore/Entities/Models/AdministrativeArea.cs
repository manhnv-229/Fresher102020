using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;

namespace SManage.ApplicationCore.Entities
{
    public class AdministrativeArea : BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid AdministrativeAreaId { get; set; }
        /// <summary>
        /// Mã vùng
        /// </summary>
        public string AdministrativeAreaCode { get; set; }
        /// <summary>
        /// Tên vùng hành chính
        /// </summary>
        public string AdministrativeAreaName { get; set; }
        /// <summary>
        /// Độ ưu tiên
        /// </summary>
        public int Kind { get; set; }
    }
}
