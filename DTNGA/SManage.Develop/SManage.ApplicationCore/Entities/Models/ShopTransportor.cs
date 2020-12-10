using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class ShopTransportor
    {
        public ShopTransportor()
        {
            Orders = new HashSet<Order>();
        }

        public Guid ShopTransportorId { get; set; }
        public Guid ShopId { get; set; }
        public Guid TransportorId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Shop Shop { get; set; }
        public virtual Transportor Transportor { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
