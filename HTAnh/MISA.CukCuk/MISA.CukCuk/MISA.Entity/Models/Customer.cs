using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Entity.Models
{
	/// <summary>
	/// khách hàng
	/// </summary>
	/// CreatedBy: HTAnh (23/11/2020)
	public class Customer
	{
		#region Declare
		#endregion

		#region Constructor
		#endregion

		#region Property
		/// <summary>
		/// Khóa chính
		/// </summary>
		public Guid CustomerId { get; set; }
		
		/// <summary>
		/// Mã khách hàng
		/// </summary>
		public string CustomerCode { get; set; }
		
		/// <summary>
		/// Họ và đệm
		/// </summary>
		public string FirstName { get; set; }

		/// <summary>
		/// Tên
		/// </summary>
		public string LastName { get; set; }

		/// <summary>
		/// Họ và tên
		/// </summary>
		public string FullName { get; set; }
		
		/// <summary>
		///Giới tính(0-nữ, 1-nam, 2-khác)
		/// </summary>
		public int? Gender { get; set; }

		/// <summary>
		/// Địa chỉ
		/// </summary>
		public string Address { get; set; }

		/// <summary>
		/// Ngày tháng năm sinh
		/// </summary>
		public DateTime? DateOfBirth { get; set; }

		/// <summary>
		/// Địa chỉ email
		/// </summary>
		public string Email { get; set; }

		/// <summary>
		/// Số điện thoại
		/// </summary>
		public string PhoneNumber { get; set; }

		/// <summary>
		/// Nhóm khách hàng
		/// </summary>
		public Guid? CustomerGroupId { get; set; }

		/// <summary>
		/// Số tiền còn nợ
		/// </summary>
		public double? DebitAmount { get; set; }

		/// <summary>
		/// Số thẻ thành viên
		/// </summary>
		public string MemberCardCode { get; set; }

		/// <summary>
		/// Tên công ty
		/// </summary>
		public string CompanyName { get; set; }
		
		/// <summary>
		/// Mã số thuế công ty
		/// </summary>
		public string CompanyTaxCode { get; set; }

		/// <summary>
		/// Ngứng theo dõi (true- ngừng theo dõi)
		/// </summary>
		public bool? IsStopFollow { get; set; }
		public DateTime? CreatedDate { get; set; }
		public string CreatedBy { get; set; }
		public DateTime? ModifiedDate { get; set; }
		#endregion

		#region Method
		#endregion


	}
}
