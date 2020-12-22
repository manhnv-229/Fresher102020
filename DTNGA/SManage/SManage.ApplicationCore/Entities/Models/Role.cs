using System;
using System.Collections.Generic;



namespace SManage.ApplicationCore.Entities
{
    public partial class Role
    {
        public Role()
        {
            Accounts = new HashSet<Account>();
        }

        public Guid RoleId { get; set; }
        public string RoleCode { get; set; }
        public string RoleName { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
