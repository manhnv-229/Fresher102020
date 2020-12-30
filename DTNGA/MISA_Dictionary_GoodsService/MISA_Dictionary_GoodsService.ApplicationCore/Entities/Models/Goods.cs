using System;
using System.Collections.Generic;

#nullable disable

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    public partial class Goods : BaseEntity
    {
        /// <summary>
        /// Id sản phẩm
        /// </summary>
        [PrimaryKey]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id sản phẩm không được bỏ trống")]
        [Unduplicated]
        [DisplayName("Id sản phẩm")]
        public Guid GoodsId { get; set; }

        /// <summary>
        /// Tên sản phẩm
        /// </summary>
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Tên sản phẩm không được bỏ trống")]
        [DisplayName("Tên sản phẩm")]
        public string GoodsName { get; set; }

        /// <summary>
        /// Mã barcode của sản phẩm
        /// </summary>
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Mã Barcode không được bỏ trống")]
        [System.ComponentModel.DataAnnotations.MaxLength(20,ErrorMessage = "Mã Barcode không được vượt quá 20 ký tự")]
        [Unduplicated]
        [DisplayName("Mã Barcode")]
        public string GoodsBarcode { get; set; }

        /// <summary>
        /// Đơn vị tính sản phẩm
        /// </summary>
        [DisplayName("Đơn vị tính")]
        public string GoodsUnit { get; set; }

        /// <summary>
        /// Url sảnh sản phẩm
        /// </summary>
        [DisplayName("Ảnh sản phẩm")]
        public string GoodsImage { get; set; }

        /// <summary>
        /// Mô tả sản phẩm
        /// </summary>
        [DisplayName("Mô tả sản phẩm")]
        public string GoodsDescription { get; set; }

        /// <summary>
        /// Id danh mục sản phẩm
        /// </summary>
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id danh mục sản phẩm không được bỏ trống")]
        [DisplayName("Id danh mục sản phẩm")]
        public Guid CategoryId { get; set; }

        /// <summary>
        /// Id thương hiệu
        /// </summary>
        [DisplayName("Id thương hiệu")]
        public Guid? BrandId { get; set; }

        [DisplayName("Thương hiệu")]
        public virtual Brand Brand { get; set; }
        [DisplayName("Danh mục")]
        public virtual Category Category { get; set; }

        public string CategoryName { get; set; }
        public string BrandName { get; set; }
    }
}
