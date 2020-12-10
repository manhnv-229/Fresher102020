using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public Guid OrderId { get; set; }
        public string OrderCode { get; set; }
        public decimal OrderTotal { get; set; }
        public int OrderStateCode { get; set; }
        public string OrderNote { get; set; }
        public Guid AccountId { get; set; }
        public Guid CustomerId { get; set; }
        public Guid ShopTransportorId { get; set; }
        public DateTime ExpectedDeliveryDate { get; set; }
        public DateTime RealDeliveryDate { get; set; }
        public decimal ShippingFee { get; set; }
        public int ShippingPaidBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual Account Account { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual ShopTransportor ShopTransportor { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
