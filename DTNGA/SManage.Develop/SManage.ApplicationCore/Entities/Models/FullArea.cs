using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore.Entities.Models
{
    public class FullArea
    {
        /// <summary>
        /// Tên Tỉnh/ Thành
        /// </summary>
        public AdministrativeArea Province { get; set; }
        /// <summary>
        /// Tên Quận/ Huyện
        /// </summary>
        public AdministrativeArea District { get; set; }
        /// <summary>
        /// Tên Xã/ Phường
        /// </summary>
        public AdministrativeArea Ward { get; set; }
    }
}
