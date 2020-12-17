using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Account : BaseEntity
    {
        public Account()
        {
            Orders = new HashSet<Order>();
        }

        [Unduplicated]
        [Required]
        [DisplayName("Id tài khoản")]
        public Guid AccountId { get; set; }

        [Unduplicated]
        [Required]
        [DisplayName("Tên tài khoản")]
        public string AccountName { get; set; }

        [Required]
        [DisplayName("Mật khẩu")]
        public string Password { get; set; }
        
        [Required]
        [DisplayName("Vai trò")]
        public Guid RoleId { get; set; }

        [Required]
        [DisplayName("Id người dùng")]
        public Guid UserId { get; set; }

        [DisplayName("Vai trò")]
        public virtual Role Role { get; set; }
        [DisplayName("Người dùng")]
        public virtual UserInfo User { get; set; }
        [DisplayName("Đơn hàng")]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
