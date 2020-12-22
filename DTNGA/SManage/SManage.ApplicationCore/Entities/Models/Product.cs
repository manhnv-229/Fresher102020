using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;



namespace SManage.ApplicationCore.Entities
{
    public partial class Product : BaseEntity
    {
        public Product()
        {
            InvoiceDetails = new HashSet<InvoiceDetail>();
            OrderDetails = new HashSet<OrderDetail>();
        }

        [Unduplicated]
        [Required]
        [DisplayName("Id sản phẩm")]
        public Guid ProductId { get; set; }

        [Unduplicated]
        [Required]
        [DisplayName("Mã sản phẩm")]
        [MaxLength(20, "")]
        public string ProductCode { get; set; }

        [DisplayName("Tên sản phẩm")]
        public string ProductName { get; set; }

        [DisplayName("Kích cỡ")]
        public string Size { get; set; }

        [DisplayName("Màu sắc")]
        public string Color { get; set; }

        [DisplayName("Khối lượng")]
        public decimal? Weight { get; set; }

        [DisplayName("Id danh mục")]
        public Guid CategoryId { get; set; }

        [DisplayName("Số lượng")]
        public decimal Amount { get; set; }

        [DisplayName("Giá bán")]
        public decimal Price { get; set; }

        [DisplayName("Giá bán hiện tại")]
        public decimal CurrentPrice { get; set; }

        //public DateTime? CreatedDate { get; set; }
        //public DateTime? ModifiedDate { get; set; }

        [Required]
        [DisplayName("Id cửa hàng")]
        public Guid ShopId { get; set; }

        [DisplayName("Nhà cung cấp")]
        public string Supplier { get; set; }

        [DisplayName("Nhãn hiệu")]
        public string Brand { get; set; }

        [DisplayName("")]
        public virtual Category Category { get; set; }
        [DisplayName("")]
        public virtual Shop Shop { get; set; }
        [DisplayName("")]
        public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; }
        [DisplayName("")]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
