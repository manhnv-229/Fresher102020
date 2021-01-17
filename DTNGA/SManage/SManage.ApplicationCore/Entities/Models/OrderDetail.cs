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
        public decimal Amount { get; set; }

        
        [DisplayName("Id sản phẩm")]
        public Guid ProductId { get; set; }

        
        [DisplayName("Id đơn hàng")]
        public Guid OrderId { get; set; }

        
        [DisplayName("Giá bán")]
        public decimal? Price { get; set; }

        [DisplayName("Mã Sản phẩm")]
        public string ProductCode { get; set; }
        [DisplayName("Tên Sản phẩm")]
        public string ProductName { get; set; }
        [DisplayName("Số lượng sản phẩm còn trong kho")]
        public string MaxAmount { get; set; }

    }
}
