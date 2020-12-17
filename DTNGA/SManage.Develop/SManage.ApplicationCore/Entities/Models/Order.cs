using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Order : BaseEntity
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        [Unduplicated]
        [Required]
        [DisplayName("Id đơn hàng")]
        public Guid OrderId { get; set; }

        [Unduplicated]
        [Required]
        [DisplayName("Mã đơn hàng")]
        public string OrderCode { get; set; }

        [Required]
        [DisplayName("Tổng tiền đơn hàng")]
        public decimal OrderTotal { get; set; }

        [Required]
        [DisplayName("Mã trạng thái đơn hàng")]
        public int OrderStateCode { get; set; }

        [DisplayName("Ghi chú")]
        public string OrderNote { get; set; }

        [Required]
        [DisplayName("Id tài khoản tạo đơn")]
        public Guid AccountId { get; set; }

        [Required]
        [DisplayName("Id khách hàng")]
        public Guid CustomerId { get; set; }

        [Required]
        [DisplayName("Id đơn vị vận chuyển")]
        public Guid ShopTransportorId { get; set; }

        [Required]
        [DisplayName("Ngày nhận hàng dự kiến")]
        public DateTime ExpectedDeliveryDate { get; set; }

        [Required]
        [DisplayName("Ngày nhận hàng thực tế")]
        public DateTime RealDeliveryDate { get; set; }

        [Required]
        [DisplayName("Phí vận chuyển")]
        public decimal ShippingFee { get; set; }

        [Required]
        [DisplayName("Bên trả phí vận chuyển")]
        public int ShippingPaidBy { get; set; }
        //public DateTime CreatedDate { get; set; }
        //public DateTime? ModifiedDate { get; set; }

        [DisplayName("")]
        public virtual Account Account { get; set; }
        [DisplayName("")]
        public virtual Customer Customer { get; set; }
        [DisplayName("")]
        public virtual ShopTransportor ShopTransportor { get; set; }
        [DisplayName("")]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
