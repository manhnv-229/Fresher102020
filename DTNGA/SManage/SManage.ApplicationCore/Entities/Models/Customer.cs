using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;


namespace SManage.ApplicationCore.Entities
{
    public partial class Customer: BaseEntity
    {
        public Customer()
        {
            Orders = new HashSet<Order>();
        }

        [Unduplicated]
        [Required]
        [DisplayName("Id khách hàng")]
        public Guid CustomerId { get; set; }

        [Required]
        [DisplayName("Họ tên khách hàng")]
        public string FullName { get; set; }

        [Unduplicated]
        [Required]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }

        [Required]
        [DisplayName("Địa chỉ ngắn gọn")]
        public string Address { get; set; }

        [DisplayName("Mã đơn vị hành chính")]
        public string AdministrativeAreaCode { get; set; }

        [DisplayName("Số đơn đặt thành công")]
        public int SuccessOrderedAmount { get; set; }

        [DisplayName("Số đơn đã đặt")]
        public int OrderAmount { get; set; }

        
        //[DisplayName("Ngày tạo")]
        //public int? Type { get; set; }
        //public DateTime CreatedDate { get; set; }

        [DisplayName("")]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
