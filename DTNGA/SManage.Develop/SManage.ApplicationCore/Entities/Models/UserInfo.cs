using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class UserInfo
    {
        public UserInfo()
        {
            Accounts = new HashSet<Account>();
            Shops = new HashSet<Shop>();
        }

        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string AdministrativeAreaCode { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<Shop> Shops { get; set; }
    }
}
