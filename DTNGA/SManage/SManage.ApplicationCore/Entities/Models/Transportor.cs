using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;


namespace SManage.ApplicationCore.Entities
{
    public partial class Transportor : BaseEntity
    {
        

        [Unduplicated]
        [NotCheckDuplicateWhenEdit]
        [Required]
        [DisplayName("Id đơn vị vận chuyển")]
        public Guid TransportorId { get; set; }

        [Unduplicated]
        [Required]
        [DisplayName("Mã đơn vị vận chuyển")]
        [MaxLength(20, "")]
        public string TransportorCode { get; set; }

        [Required]
        [DisplayName("Tên đơn vị vận chuyển")]
        public string TransportorName { get; set; }

        [Required]
        [DisplayName("Phí vận chuyển nội tỉnh/thành")]
        public double InnerFee { get; set; }

        [Required]
        [DisplayName("Phí vận chuyển ngoại tỉnh/thành")]
        public double OutsideFee { get; set; }

        [Required]
        [DisplayName("Thời gian vận chuyển nội tỉnh/thành")]
        public int InnerDeliveryTime { get; set; }

        [Required]
        [DisplayName("Thời gian vận chuyển ngoại tỉnh/thành")]
        public int OutsideDeliveryTime { get; set; }

        [DisplayName("Là đơn vị vận chuyển của hệ thống hay không")]
        public int IsSystem { get; set; }
    }
}
