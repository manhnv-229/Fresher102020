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
        [CheckChange]
        public string FullName { get; set; }

        [Unduplicated]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Số điện thoại không được bỏ trống")]
        [DisplayName("Số điện thoại")]
        [CheckChange]
        public string PhoneNumber { get; set; }

        [DisplayName("Địa chỉ ngắn gọn")]
        [CheckChange]
        public string Address { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id đơn vị hành chính không được bỏ trống")]
        [DisplayName("Id đơn vị hành chính")]
        [CheckChange]
        public Guid AdministrativeAreaId { get; set; }

        [DisplayName("Số đơn đặt thành công")]
        public int? SuccessOrderedAmount { get; set; }

        [DisplayName("Số đơn đã đặt")]
        public int? OrderAmount { get; set; }

        [DisplayName("Loai khach hang")]
        [CheckChange]
        public int Type { get; set; }

    }
}
