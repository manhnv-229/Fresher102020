using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Category
    {
        public Category()
        {
            Products = new HashSet<Product>();
        }

        public Guid CategoryId { get; set; }
        public string CategoryCode { get; set; }
        public string CategoryName { get; set; }
        public Guid ShopId { get; set; }

        public virtual Shop Shop { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
