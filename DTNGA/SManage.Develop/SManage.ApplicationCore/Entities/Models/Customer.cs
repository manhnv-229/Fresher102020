using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class Customer
    {
        public Customer()
        {
            Orders = new HashSet<Order>();
        }

        public Guid CustomerId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string AdministrativeAreaCode { get; set; }
        public int SuccessOrderedAmount { get; set; }
        public int OrderAmount { get; set; }
        public int? Type { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
