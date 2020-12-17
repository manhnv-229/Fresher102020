using System;
using System.Collections.Generic;

#nullable disable

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    public partial class Category
    {
        //public Category()
        //{
        //    Products = new HashSet<Product>();
        //}

        /// <summary>
        /// Id danh mục
        /// </summary>
        [PrimaryKey]
        [Unduplicated]
        [Required]
        [DisplayName("Id danh mục")]
        public Guid CategoryId { get; set; }

        /// <summary>
        /// Mã dạnh mục
        /// </summary>
        [Unduplicated]
        [Required]
        [DisplayName("Mã danh mục")]
        [MaxLength(20, "")]
        public string CategoryCode { get; set; }

        /// <summary>
        /// Tên danh mục
        /// </summary>
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
        public Guid? CategoryParentId { get; set; }

        /// <summary>
        /// Mô tả danh mục
        /// </summary>
        [DisplayName("Mô tả danh mục")]
        public string CategoryDescription { get; set; }

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

        public virtual ICollection<Product> Products { get; set; }
    }
}
