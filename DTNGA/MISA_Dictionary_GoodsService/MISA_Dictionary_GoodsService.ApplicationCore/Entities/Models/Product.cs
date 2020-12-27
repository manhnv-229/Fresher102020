using System;
using System.Collections.Generic;

#nullable disable

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    public partial class Product : BaseEntity
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
        [DisplayName("Ảnh sản phẩm")]
        public string ProductImage { get; set; }

        /// <summary>
        /// Mô tả sản phẩm
        /// </summary>
        [DisplayName("Mô tả sản phẩm")]
        public string ProductDescription { get; set; }

        /// <summary>
        /// Id danh mục sản phẩm
        /// </summary>
        [Required]
        [DisplayName("Id danh mục sản phẩm")]
        public Guid? CategoryId { get; set; }

        /// <summary>
        /// Id thương hiệu
        /// </summary>
        [DisplayName("Id thương hiệu")]
        public Guid? BrandId { get; set; }

        [DisplayName("Thương hiệu")]
        public virtual Brand Brand { get; set; }
        [DisplayName("Danh mục")]
        public virtual Category Category { get; set; }
    }
}
