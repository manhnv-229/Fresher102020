using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore.Entities.DTO
{
    public class OrderCreateDTO : BaseEntity
    {
        [Unduplicated]
        [System.ComponentModel.DataAnnotations.MaxLength(20, ErrorMessage = "Mã đơn hàng không được vượt quá 20 ký tự")]
        [DisplayName("Mã đơn hàng")]
        public string OrderCode { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Tổng tiền đơn hàng không được bỏ trống")]
        [DisplayName("Tổng tiền đơn hàng")]
        public decimal OrderTotal { get; set; }

        [DisplayName("Mã trạng thái đơn hàng")]
        public Guid? OrderStateId { get; set; }

        [DisplayName("Ghi chú")]
        public string OrderNote { get; set; }

        [DisplayName("Id đơn vị vận chuyển")]
        public Guid? TransportorId { get; set; }

        [DisplayName("Ngày nhận hàng dự kiến")]
        public DateTime? ExpectedDeliveryDate { get; set; }

        /// <summary>
        ///  Ngày nhận hàng thực tế, nếu chưa tạo thì lấy bằng ngày hiện tại
        /// </summary>
        [DisplayName("Ngày nhận hàng thực tế")]
        public DateTime?  RealDeliveryDate { get; set; }

        [DisplayName("Phí vận chuyển")]
        public decimal? ShippingFee { get; set; }

        [DisplayName("Bên trả phí vận chuyển")]
        public int? ShippingPaidBy { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id tài khoản tạo đơn không được bỏ trống")]
        [DisplayName("Id tài khoản tạo đơn")]
        public new Guid CreatedBy { get; set; }

        /// <summary>
        /// Thông tin khách hàng
        /// </summary>
        [DisplayName("Khách hàng")]
        public virtual Customer Customer { get; set; }
        /// <summary>
        /// list đơn hàng chi tiết (dòng sản phẩm)
        /// </summary>
        [DisplayName("Danh sách sản phẩm")]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
