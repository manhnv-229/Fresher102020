using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;


namespace SManage.ApplicationCore.Entities
{
    public partial class UserInfo : BaseEntity
    {
        public UserInfo()
        {
            Accounts = new HashSet<Account>();
            Shops = new HashSet<Shop>();
        }
        [Unduplicated]
        [Required]
        [DisplayName("Id Người dùng")]
        public Guid UserId { get; set; }
        
        [DisplayName("Tên")]
        public string FirstName { get; set; }

        [DisplayName("Tên Đệm và Họ")]
        public string LastName { get; set; }

        [Required]
        [DisplayName("Họ tên đầy đủ")]
        public string FullName { get; set; }

        [DisplayName("Ngày sinh")]
        public DateTime? DateOfBirth { get; set; }

        [DisplayName("Giới tính")]
        public int? Gender { get; set; }

        [Required]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }
        
        [DisplayName("Email")]
        public string Email { get; set; }

        [Required]
        [DisplayName("Địa chỉ ngắn gọn")]
        public string Address { get; set; }

        [DisplayName("Mã đơn vị hành chính")]
        public string AdministrativeAreaCode { get; set; }

        [DisplayName("Tài khoản")]
        public virtual ICollection<Account> Accounts { get; set; }
        [DisplayName("Cửa hàng")]
        public virtual ICollection<Shop> Shops { get; set; }
    }
}
