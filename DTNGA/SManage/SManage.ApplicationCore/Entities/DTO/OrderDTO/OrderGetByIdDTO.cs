using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore.Entities.DTO
{
    public class OrderGetByIdDTO : BaseEntity
    {
        #region Properties
        [Unduplicated]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id đơn hàng không được bỏ trống")]
        [DisplayName("Id đơn hàng")]
        public Guid OrderId { get; set; }

        [Unduplicated]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Mã đơn hàng không được bỏ trống")]
        [System.ComponentModel.DataAnnotations.MaxLength(20, ErrorMessage = "Mã đơn hàng không được vượt quá 20 ký tự")]
        [DisplayName("Mã đơn hàng")]
        public string OrderCode { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Tổng tiền đơn hàng không được bỏ trống")]
        [DisplayName("Tổng tiền đơn hàng")]
        public decimal OrderTotal { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Mã trạng thái đơn hàng không được bỏ trống")]
        [DisplayName("Mã trạng thái đơn hàng")]
        public Guid OrderStateId { get; set; }

        [DisplayName("Ghi chú")]
        public string OrderNote { get; set; }


        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id khách hàng không được bỏ trống")]
        [DisplayName("Id khách hàng")]
        public Guid CustomerId { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id đơn vị vận chuyển không được bỏ trống")]
        [MustExist]
        [DisplayName("Id đơn vị vận chuyển")]
        public Guid? TransportorId { get; set; }

        [DisplayName("Ngày nhận hàng dự kiến")]
        public DateTime? ExpectedDeliveryDate { get; set; }

        /// <summary>
        ///  Ngày nhận hàng thực tế, nếu chưa tạo thì lấy bằng ngày hiện tại
        /// </summary>
        [DisplayName("Ngày nhận hàng thực tế")]
        public DateTime? RealDeliveryDate { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Phí vận chuyển không được bỏ trống")]
        [DisplayName("Phí vận chuyển")]
        public decimal ShippingFee { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Bên trả phí vận chuyển không được bỏ trống")]
        [DisplayName("Bên trả phí vận chuyển")]
        public int ShippingPaidBy { get; set; }

        [DisplayName("tên tài khoản tạo đơn")]
        public string CreatedByName { get; set; }
        [DisplayName("tên tài khoản xử lý đơn")]
        public string ModifiedByName { get; set; }


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
        #endregion

        #region methods
        public static OrderGetByIdDTO ConvertFromOrder(Order order)
        {
            return new OrderGetByIdDTO
            {
                OrderId= order.OrderId,
                OrderCode= order.OrderCode,
                OrderNote= order.OrderNote,
                OrderTotal= order.OrderTotal,
                OrderStateId= (Guid)order.OrderStateId,
                CreatedBy= order.CreatedBy,
                CreatedDate= order.CreatedDate,
                CreatedByName= order.CreatedByName,
                ModifiedBy= order.ModifiedBy,
                ModifiedDate= order.ModifiedDate,
                ModifiedByName= order.ModifiedByName,
                CustomerId= (Guid)order.CustomerId,
                TransportorId= order.TransportorId,
                ExpectedDeliveryDate= order.ExpectedDeliveryDate,
                RealDeliveryDate= order.RealDeliveryDate,
                ShippingFee= (decimal)order.ShippingFee,
                ShippingPaidBy= (int)order.ShippingPaidBy,

            };
        }

        #endregion
    }
}
