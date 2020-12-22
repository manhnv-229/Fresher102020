using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;



namespace SManage.ApplicationCore.Entities
{
    public partial class OrderDetail : BaseEntity
    {
        [Unduplicated]
        [Required]
        [DisplayName("Id chi tiết đơn hàng")]
        public Guid OrderDetailId { get; set; }

        [Required]
        [DisplayName("Số lượng")]
        public decimal Quantity { get; set; }

        [Required]
        [DisplayName("Id sản phẩm")]
        public Guid ProductId { get; set; }

        [Required]
        [DisplayName("Id đơn hàng")]
        public Guid OrderId { get; set; }

        [Required]
        [DisplayName("Giá bán")]
        public decimal? Price { get; set; }

        [DisplayName("Đơn hàng")]
        public virtual Order Order { get; set; }
        [DisplayName("Sản phẩm")]
        public virtual Product Product { get; set; }
    }
}
