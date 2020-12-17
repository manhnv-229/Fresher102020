using System;
using System.Collections.Generic;

#nullable disable

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    public partial class Product
    {
        /// <summary>
        /// Id sản phẩm
        /// </summary>
        [PrimaryKey]
        [Required]
        [Unduplicated]
        [DisplayName("Id sản phẩm")]
        public Guid ProductId { get; set; }

        /// <summary>
        /// Tên sản phẩm
        /// </summary>
        [Required]
        [DisplayName("Tên sản phẩm")]
        public string ProductName { get; set; }

        /// <summary>
        /// Mã barcode của sản phẩm
        /// </summary>
        [Required]
        [Unduplicated]
        [DisplayName("Mã Barcode")]
        [MaxLength(20, "Mã Barcode không được vượt quá 20 ký tự")]
        public string ProductBarcode { get; set; }

        /// <summary>
        /// Đơn vị tính sản phẩm
        /// </summary>
        [DisplayName("Đơn vị tính")]
        public string ProductUnit { get; set; }

        /// <summary>
        /// Url sảnh sản phẩm
        /// </summary>
        [Required]
        [DisplayName("Ảnh sản phẩm")]
        public string ProductImage { get; set; }

        /// <summary>
        /// Mô tả sản phẩm
        /// </summary>
        [DisplayName("Mô tả sản phẩm")]
        public string ProductDescription { get; set; }

        /// <summary>
        /// Tạo bởi
        /// </summary>
        [DisplayName("Người tạo")]
        public string CreatedBy { get; set; }

        /// <summary>
        /// Ngày tạo
        /// </summary>
        [DisplayName("Ngày tạo")]
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Chỉnh sửa bởi
        /// </summary>
        [DisplayName("Người chỉnh sửa")]
        public string ModifiedBy { get; set; }

        /// <summary>
        /// Ngày chỉnh sửa
        /// </summary>
        [DisplayName("Ngày chỉnh sửa")]
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Id danh mục sản phẩm
        /// </summary>
        [DisplayName("Id danh mục sản phẩm")]
        public Guid? CategoryId { get; set; }

        /// <summary>
        /// Id thương hiệu
        /// </summary>
        [DisplayName("Id thương hiệu")]
        public Guid? BrandId { get; set; }

        public virtual Brand Brand { get; set; }
        public virtual Category Category { get; set; }
    }
}
