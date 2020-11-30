﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Class khach hang
    /// </summary>
    /// createdby tungnt(23/11/2020)
    public class Customer: BaseEntity
    {
        #region Declare

        #endregion

        #region Constructor
        public Customer()
        {

        }
        #endregion

        #region Property
        /// <summary>
        /// Id của khách hàng
        /// </summary>
        /// CreatedBy tungnt (23/11/2020)
        [PrimaryKey]
        public Guid CustomerId { get; set; }

        /// <summary>
        /// Mã khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        [Required]
        [CheckDuplicate]
        [DisplayName("Mã khách hàng")]
        public string CustomerCode { get; set; }

        /// <summary>
        /// Họ và tên đệm khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        [DisplayName("Họ và tên đệm")]
        public string FirstName { get; set; }

        /// <summary>
        /// Tên khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        [DisplayName("Tên khách hàng")]
        public string LastName { get; set; }

        /// <summary>
        /// Họ và tên khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020
        [Required]
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }

        /// <summary>
        /// Mã nhóm khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        [DisplayName("Mã khách hàng")]
        public string MemberCardCode { get; set; }

        /// <summary>
        /// ngày sinh của khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        [DisplayName("Ngày sinh")]
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Giới tính khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        public int Gender { get; set; }

        /// <summary>
        /// Email khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        public string Email { get; set; }

        /// <summary>
        /// Số điện thoại khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        [Required]
        [CheckDuplicate]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Tên công ty của khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        public string CompanyName { get; set; }

        /// <summary>
        /// Mã số thuế công ty khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        public string CompanyTaxCode { get; set; }

        /// <summary>
        /// ID nhóm khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        public Guid? CustomerGroupId { get; set; }

        /// <summary>
        /// Số tiền còn nợ
        /// </summary>
        public double? DebitAmount { get; set; }

        /// <summary>
        /// Ngừng theo dõi (true- ngừng theo dõi)
        /// </summary>
        public int? IsStopFollow { get; set; }

        /// <summary>
        /// Địa chỉ khách hàng
        /// </summary>
        /// CreatedBy: NTTUNG (23/11/2020)
        /// 
        public string Address { get; set; }
        #region 
        ///// <summary>
        ///// Ngày tạo khách hàng
        ///// </summary>
        ///// CreatedBy: NTTUNG (23/11/2020)
        //public DateTime? CreatedDate { get; set; }

        ///// <summary>
        ///// người tạo khách hàng
        ///// </summary>
        ///// CreatedBy: NTTUNG (23/11/2020)
        //public string CreatedBy { get; set; }

        ///// <summary>
        ///// ngày chỉnh sửa khách hàng
        ///// </summary>
        ///// CreatedBy: NTTUNG (23/11/2020)
        //public DateTime? ModifiedDate { get; set; }

        ///// <summary>
        ///// người chỉnh sửa khách hàng
        ///// </summary>
        ///// CreatedBy: NTTUNG (23/11/2020)
        //public string ModifiedBy { get; set; }
        #endregion
        #endregion

        #region Method

        #endregion
    }
}
