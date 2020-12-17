using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Category : BaseEntity
    {
        public Category()
        {
            Products = new HashSet<Product>();
        }

        [Unduplicated]
        [Required]
        [DisplayName("Id danh mục")]
        public Guid CategoryId { get; set; }

        [Unduplicated]
        [Required]
        [DisplayName("Mã danh mục")]
        [MaxLength(20, "")]
        public string CategoryCode { get; set; }

        [DisplayName("Tên danh mục")]
        public string CategoryName { get; set; }

        [DisplayName("Id cửa hàng")]
        public Guid ShopId { get; set; }

        [DisplayName("Cửa hàng")]
        public virtual Shop Shop { get; set; }
        [DisplayName("Sản phẩm")]
        public virtual ICollection<Product> Products { get; set; }
    }
}
