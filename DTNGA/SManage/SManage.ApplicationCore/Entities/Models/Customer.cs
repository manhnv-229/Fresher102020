using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;


namespace SManage.ApplicationCore.Entities
{
    public partial class Customer: BaseEntity
    {

        [Unduplicated]
        [NotCheckDuplicateWhenEdit]
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

        [DisplayName("Mã đơn vị hành chính")]
        public string AdministrativeAreaCode { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id đơn vị hành chính không được bỏ trống")]
        [DisplayName("Id đơn vị hành chính")]
        public Guid AdministrativeAreaId { get; set; }

        [DisplayName("Số đơn đặt thành công")]
        public int? SuccessOrderedAmount { get; set; }

        [DisplayName("Số đơn đã đặt")]
        public int? OrderAmount { get; set; }

        [DisplayName("Loai khach hang")]
        public int Type { get; set; }

    }
}
