using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;



namespace SManage.ApplicationCore.Entities
{
    public partial class OrderDetail : BaseEntity
    {
        
        [DisplayName("Id chi tiết đơn hàng")]
        public Guid OrderDetailId { get; set; }

        
        [DisplayName("Số lượng")]
        public decimal Quantity { get; set; }

        
        [DisplayName("Id sản phẩm")]
        public Guid ProductId { get; set; }

        
        [DisplayName("Id đơn hàng")]
        public Guid OrderId { get; set; }

        
        [DisplayName("Giá bán")]
        public decimal? Price { get; set; }

        [DisplayName("Sản phẩm")]
        public virtual Product Product { get; set; }
    }
}
