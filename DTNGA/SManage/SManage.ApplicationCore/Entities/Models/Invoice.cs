using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;


namespace SManage.ApplicationCore.Entities
{
    public partial class Invoice : BaseEntity
    {
        public Invoice()
        {
            InvoiceDetails = new HashSet<InvoiceDetail>();
        }

        [Unduplicated]
        [Required]
        [DisplayName("Id hóa đơn")]
        public Guid InvoiceId { get; set; }

        [Required]
        [DisplayName("Loại hóa đơn")]
        public int Type { get; set; }

        [DisplayName("")]
        public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
