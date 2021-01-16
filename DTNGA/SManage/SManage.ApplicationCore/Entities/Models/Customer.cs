using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;


namespace SManage.ApplicationCore.Entities
{
    public partial class Customer: BaseEntity
    {

        [Unduplicated]
        [DisplayName("Id khách hàng")]
        public Guid? CustomerId { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Họ tên khách hàng không được bỏ trống")]
        [DisplayName("Họ tên khách hàng")]
        public string FullName { get; set; }

        [Unduplicated]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Số điện thoại không được bỏ trống")]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }

        [DisplayName("Địa chỉ ngắn gọn")]
        public string Address { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Mã đơn vị hành chính không được bỏ trống")]
        [DisplayName("Mã đơn vị hành chính")]
        public string AdministrativeAreaCode { get; set; }

        [DisplayName("Số đơn đặt thành công")]
        public int? SuccessOrderedAmount { get; set; }

        [DisplayName("Số đơn đã đặt")]
        public int? OrderAmount { get; set; }

        [DisplayName("Loai khach hang")]
        public int Type { get; set; }

    }
}
