using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class OrderDetail
    {
        public Guid OrderDetailId { get; set; }
        public decimal Quantity { get; set; }
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public decimal? Price { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
