using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class InvoiceDetail
    {
        public Guid InvoiceDetailId { get; set; }
        public Guid ProductId { get; set; }
        public decimal Quantity { get; set; }
        public Guid InvoiceId { get; set; }

        public virtual Invoice Invoice { get; set; }
        public virtual Product Product { get; set; }
    }
}
