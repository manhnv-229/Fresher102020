using System;
using System.Collections.Generic;
using System.Text;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Entities.DTO.Brand
{
    /// <summary>
    /// Object dùng để thêm thương hiệu
    /// </summary>
    public class BrandCreateDTO
    {
        /// <summary>
        /// Mã thương hiệu
        /// </summary>
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Mã thương hiệu không được bỏ trống")]
        [System.ComponentModel.DataAnnotations.MaxLength(20, ErrorMessage = "Mã thương hiệu không được vượt quá 20 ký tự")]
        [Unduplicated]
        [DisplayName("Mã thương hiệu")]
        public string BrandCode { get; set; }

        /// <summary>
        /// Tên thương hiệu
        /// </summary>
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Mã thương hiệu không được bỏ trống")]
        [Unduplicated]
        [DisplayName("Tên thương hiệu")]
        public string BrandName { get; set; }

        /// <summary>
        /// Xuất xứ thương hiệu
        /// </summary>
        [DisplayName("Xuất xứ thương hiệu")]
        public string BrandOrigin { get; set; }

        /// <summary>
        /// Mô tả thương hiệu
        /// </summary>
        [DisplayName("Mô tả thương hiệu")]
        public string BrandDescription { get; set; }

    }
}
