using SManage.ApplicationCore.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace SManage.ApplicationCore.Entities
{
    public partial class Order : BaseEntity
    {
        #region Properties

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id đơn hàng không được bỏ trống")]
        [PrimaryKey]
        [NotCheckDuplicateWhenEdit]
        [Unduplicated]
        [DisplayName("Id đơn hàng")]
        public Guid OrderId { get; set; }

        [System.ComponentModel.DataAnnotations.MaxLength(20, ErrorMessage = "Mã đơn hàng không được vượt quá 20 ký tự")]
        [Unduplicated]
        [NotCheckDuplicateWhenEdit]
        [DisplayName("Mã đơn hàng")]
        public string OrderCode { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Tổng tiền đơn hàng không được bỏ trống")]
        [DisplayName("Tổng tiền đơn hàng")]
        public decimal OrderTotal { get; set; }

        [DisplayName("Mã trạng thái đơn hàng")]
        public Guid? OrderStateId { get; set; }

        [DisplayName("Ghi chú")]
        public string OrderNote { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id tài khoản tạo đơn không được bỏ trống")]
        [DisplayName("Id tài khoản tạo đơn")]
        public new Guid CreatedBy { get; set; }

        [DisplayName("Id tài khoản xử lý đơn")]
        public new Guid? ModifiedBy { get; set; }

        [DisplayName("Id khách hàng")]
        public Guid? CustomerId { get; set; }

        /// <summary>
        /// Id đơn vị vận chuyển, đơn hàng do nhân viên tạo không có đơn vị vận chuyển
        /// </summary>
        [DisplayName("Id đơn vị vận chuyển")]
        public Guid? TransportorId { get; set; }

        [DisplayName("Ngày nhận hàng dự kiến")]
        public DateTime? ExpectedDeliveryDate { get; set; }

        /// <summary>
        ///  Ngày nhận hàng thực tế, nếu chưa tạo thì lấy bằng ngày hiện tại
        /// </summary>
        [DisplayName("Ngày nhận hàng thực tế")]
        public DateTime? RealDeliveryDate { get; set; }

        [DisplayName("Phí vận chuyển")]
        public decimal? ShippingFee { get; set; }

        [DisplayName("Bên trả phí vận chuyển")]
        public int? ShippingPaidBy { get; set; }

      
        [DisplayName("Họ tên khách hàng")]
        public string CustomerName { get; set; }
        [DisplayName("Số điện thoại khách hàng")]
        public string  PhoneNumber { get; set; }
        [DisplayName("Địa chỉ nhận hàng")]
        public string  Address { get; set; }
        [DisplayName("Trạng thái đơn hàng")]
        public string OrderStateName { get; set; }
        [DisplayName("Id tài khoản tạo đơn")]
        public string CreatedByName { get; set; }
        [DisplayName("Id tài khoản xử lý đơn")]
        public string ModifiedByName { get; set; }

        #endregion

        #region methods
        public static Order ConvertFromCreateDTO(OrderCreateDTO orderCreateDTO)
        {
            return new Order
            {
                OrderCode = orderCreateDTO.OrderCode,
                OrderTotal = orderCreateDTO.OrderTotal,
                OrderStateId = orderCreateDTO.OrderStateId,
                OrderNote = orderCreateDTO.OrderNote,
                CreatedBy = orderCreateDTO.CreatedBy,
                ModifiedBy = orderCreateDTO.ModifiedBy,
                CreatedDate = DateTime.Now,
                ModifiedDate= DateTime.Now,
                TransportorId= orderCreateDTO.TransportorId,
                ExpectedDeliveryDate= orderCreateDTO.ExpectedDeliveryDate,
                ShippingFee = orderCreateDTO.ShippingFee,
                ShippingPaidBy= orderCreateDTO.ShippingPaidBy,
                CustomerId= orderCreateDTO.Customer.CustomerId,
            };
        }
        public static Order ConvertFromUpdateDTO(OrderUpdateDTO orderUpdateDTO)
        {
            return new Order
            {
                OrderId= orderUpdateDTO.OrderId,
                OrderCode = orderUpdateDTO.OrderCode,
                OrderNote= orderUpdateDTO.OrderNote,
                OrderTotal = orderUpdateDTO.OrderTotal,
                OrderStateId = orderUpdateDTO.OrderStateId,
                ModifiedBy = orderUpdateDTO.ModifiedBy,
                ModifiedDate= orderUpdateDTO.ModifiedDate,
                TransportorId = orderUpdateDTO.TransportorId,
                ShippingPaidBy= orderUpdateDTO.ShippingPaidBy,
                ExpectedDeliveryDate = orderUpdateDTO.ExpectedDeliveryDate,
                RealDeliveryDate= orderUpdateDTO.RealDeliveryDate,
                ShippingFee = orderUpdateDTO.ShippingFee,
            };
        }
        #endregion
    }
}
