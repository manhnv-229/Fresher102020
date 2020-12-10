using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Shop
    {
        public Shop()
        {
            Categories = new HashSet<Category>();
            Products = new HashSet<Product>();
            ShopTransportors = new HashSet<ShopTransportor>();
        }

        public Guid ShopId { get; set; }
        public string ShopName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Guid UserId { get; set; }
        public string AdministrativeAreaCode { get; set; }

        public virtual UserInfo User { get; set; }
        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<ShopTransportor> ShopTransportors { get; set; }
    }
}
