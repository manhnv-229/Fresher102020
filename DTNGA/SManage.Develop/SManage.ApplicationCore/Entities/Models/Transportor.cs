using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Transportor
    {
        public Transportor()
        {
            ShopTransportors = new HashSet<ShopTransportor>();
        }

        public Guid TransportorId { get; set; }
        public string TransportorCode { get; set; }
        public string TransportorName { get; set; }
        public decimal InnerFee { get; set; }
        public decimal OutsideFee { get; set; }
        public int InnerDeliveryTime { get; set; }
        public int OutsideDeliveryTime { get; set; }

        public virtual ICollection<ShopTransportor> ShopTransportors { get; set; }
    }
}
