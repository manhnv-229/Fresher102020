using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;



namespace SManage.ApplicationCore.Entities
{
    public partial class Shop : BaseEntity 
    {
        public Shop()
        {
            Categories = new HashSet<Category>();
            Products = new HashSet<Product>();
            ShopTransportors = new HashSet<ShopTransportor>();
        }

        [Unduplicated]
        [Required]
        [DisplayName("Id cửa hàng")]
        public Guid ShopId { get; set; }

        [Required]
        [DisplayName("Tên cửa hàng")]
        public string ShopName { get; set; }

        [Required]
        [DisplayName("Địa chỉ ngắn gọn")]
        public string Address { get; set; }

        [Required]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }

        [Required]
        [DisplayName("Id người dùng")]
        public Guid UserId { get; set; }

        [Required]
        [DisplayName("Mã đơn vị hành chính")]
        public string AdministrativeAreaCode { get; set; }

        [DisplayName("Người dùng")]
        public virtual UserInfo User { get; set; }
        [DisplayName("Danh mục")]
        public virtual ICollection<Category> Categories { get; set; }
        [DisplayName("Sản phẩm")]
        public virtual ICollection<Product> Products { get; set; }
        [DisplayName("Vận chuyển")]
        public virtual ICollection<ShopTransportor> ShopTransportors { get; set; }
    }
}
