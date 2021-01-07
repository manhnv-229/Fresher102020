using System;
using System.Collections.Generic;
using System.Text;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Entities.DTO
{
    /// <summary>
    /// Object dùng đẻ cập nhật danh mục
    /// </summary>
    public class CategoryUpdateDTO
    {
        /// <summary>
        /// Id danh mục
        /// </summary>
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Id danh mục không được bỏ trống")]
        [PrimaryKey]
        [Unduplicated]
        [DisplayName("Id danh mục")]
        public Guid CategoryId { get; set; }
        /// <summary>
        /// Mã dạnh mục
        /// </summary>
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Mã danh mục không được bỏ trống")]
        [System.ComponentModel.DataAnnotations.MaxLength(20, ErrorMessage = "Mã danh mục không được vượt quá 20 ký tự")]
        [Unduplicated]
        [DisplayName("Mã danh mục")]
        public string CategoryCode { get; set; }

        /// <summary>
        /// Tên danh mục
        /// </summary>
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Tên danh mục không được bỏ trống")]
        [DisplayName("Tên danh mục")]
        public string CategoryName { get; set; }

        /// <summary>
        /// Id danh mục cha
        /// </summary>
        [DisplayName("Id danh mục cha")]
        public Guid CategoryParentId { get; set; }

        /// <summary>
        /// Mô tả danh mục
        /// </summary>
        [DisplayName("Mô tả danh mục")]
        public string CategoryDescription { get; set; }
    }
}
