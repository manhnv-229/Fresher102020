using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class InvoiceDetail : BaseEntity
    {
        [Unduplicated]
        [Required]
        [DisplayName("Id chi tiết hóa đơn")]
        public Guid InvoiceDetailId { get; set; }

        [Required]
        [DisplayName("Id sản phẩm")]
        public Guid ProductId { get; set; }

        [Required]
        [DisplayName("Số lượng")]
        public decimal Quantity { get; set; }

        [Required]
        [DisplayName("Id hóa đơn")]
        public Guid InvoiceId { get; set; }

        [DisplayName("")]
        public virtual Invoice Invoice { get; set; }
        [DisplayName("")]
        public virtual Product Product { get; set; }
    }
}
