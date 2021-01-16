using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore.Entities.Models
{
    public class User_Shop
    {
        public  Guid User_ShopId { get; set; }
        public Guid ShopId { get; set; }
        public Guid UserId { get; set; }
    }
}
