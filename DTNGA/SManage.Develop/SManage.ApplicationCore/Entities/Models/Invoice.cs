using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Invoice
    {
        public Invoice()
        {
            InvoiceDetails = new HashSet<InvoiceDetail>();
        }

        public Guid InvoiceId { get; set; }
        public int Type { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
