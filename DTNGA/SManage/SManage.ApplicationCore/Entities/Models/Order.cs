using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;

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
        [MustExist]
        [DisplayName("Id tài khoản tạo đơn")]
        public new Guid CreatedBy { get; set; }

        [Required]
        [MustExist]
        [DisplayName("Id tài khoản xử lý đơn")]
        public new Guid ModifiedBy { get; set; }

        [Required]
        [DisplayName("Id khách hàng")]
        public Guid CustomerId { get; set; }

        [Required]
        [MustExist]
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

        [DisplayName("Họ tên khách hàng")]
        public string CustomerName { get; set; }
        [DisplayName("Số điện thoại khách hàng")]
        public string  PhoneNumber { get; set; }
        [DisplayName("Địa chỉ nhận hàng")]
        public string  Address { get; set; }
        [DisplayName("Id trạng thái đơn hàng")]
        public Guid OrderStateId { get; set; }
        [DisplayName("Tên sản phẩm")]
        public string ProductName { get; set; }

        [DisplayName("Người tạo")]
        public virtual UserInfo Creater { get; set; }
        [DisplayName("Người chỉnh sửa")]
        public virtual UserInfo Modifier { get; set; }
        [DisplayName("Khách hàng")]
        public virtual Customer Customer { get; set; }
        [DisplayName("Đơn vị vận chuyển")]
        public virtual ShopTransportor ShopTransportor { get; set; }
        [DisplayName("Danh sách chi tiết đơn hàng")]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
