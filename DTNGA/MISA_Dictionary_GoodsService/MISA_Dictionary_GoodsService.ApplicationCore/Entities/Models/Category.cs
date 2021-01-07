using MISA_Dictionary_GoodsService.ApplicationCore.Entities.DTO;
using System;
using System.Collections.Generic;

#nullable disable

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    /// <summary>
    /// Danh mục
    /// </summary>
    public partial class Category : BaseEntity
    {
        public Category()
        {
            Goods = new HashSet<Goods>();
        }

        #region Properties
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
        /// Mức danh mục
        /// </summary>
        [DisplayName("Mức danh mục")]
        public int Level { get; set; }

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

        /// <summary>
        /// Tên danh mục cha
        /// </summary>
        [DisplayName("Tên danh mục cha")]
        public string ParentCategoryName{ get; set; }

        [DisplayName("Danh mục cha")]
        public virtual Category ParentCategory { get; set; }
        [DisplayName("Sản phẩm")]
        public virtual ICollection<Goods> Goods { get; set; }
        #endregion

        #region Methods
        /// <summary>
        /// Hàm thực hiện convert từ object Thêm danh mục sang object Danh mục
        /// </summary>
        /// <param name="categoryCreateDTO">Danh mục thêm</param>
        /// <returns>Danh mục</returns>
        /// CreatedBy dtnga (06/01/2021)
        public static Category ConvertFromCreateDTO(CategoryCreateDTO categoryCreateDTO)
        {
            return new Category
            {
                CategoryName = categoryCreateDTO.CategoryName,
                CategoryCode = categoryCreateDTO.CategoryCode,
                CategoryDescription = categoryCreateDTO.CategoryDescription,
                CategoryParentId = categoryCreateDTO.CategoryParentId
            };
        }
        /// <summary>
        /// Hàm thực hiện convert từ object Cập nhật danh mục sang object Danh mục
        /// </summary>
        /// <param name="categoryUpdateDTO">Danh mục cập nhật</param>
        /// <returns>Danh mục</returns>
        /// CreatedBy dtnga (06/01/2021)
        public static Category ConvertFromUpdateDTO(CategoryUpdateDTO categoryUpdateDTO)
        {
            return new Category
            {
                CategoryId= categoryUpdateDTO.CategoryId,
                CategoryName = categoryUpdateDTO.CategoryName,
                CategoryCode = categoryUpdateDTO.CategoryCode,
                CategoryDescription = categoryUpdateDTO.CategoryDescription,
                CategoryParentId = categoryUpdateDTO.CategoryParentId
            };
        }
        #endregion
    }
}
