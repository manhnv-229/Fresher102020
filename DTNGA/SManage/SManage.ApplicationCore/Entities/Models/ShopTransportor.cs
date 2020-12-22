using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;


namespace SManage.ApplicationCore.Entities
{
    public partial class ShopTransportor : BaseEntity
    {
        public ShopTransportor()
        {
            Orders = new HashSet<Order>();
        }

        [Unduplicated]
        [Required]
        public Guid ShopTransportorId { get; set; }

        [Required]
        public Guid ShopId { get; set; }

        [Required]
        public Guid TransportorId { get; set; }
        //public DateTime? CreatedDate { get; set; }

        public virtual Shop Shop { get; set; }
        public virtual Transportor Transportor { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
