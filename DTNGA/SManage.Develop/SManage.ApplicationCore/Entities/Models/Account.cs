using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Account
    {
        public Account()
        {
            Orders = new HashSet<Order>();
        }

        public Guid AccountId { get; set; }
        public string AccountName { get; set; }
        public string Password { get; set; }
        public Guid RoleId { get; set; }
        public Guid UserId { get; set; }

        public virtual Role Role { get; set; }
        public virtual UserInfo User { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
