using System;
using System.Collections.Generic;

#nullable disable

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    public partial class Brand
    {
        public Brand()
        {
            Products = new HashSet<Product>();
        }

        /// <summary>
        /// Id thương hiệu
        /// </summary>
        [PrimaryKey]
        [Unduplicated]
        [Required]
        [DisplayName("Id thương hiệu")]
        public Guid BrandId { get; set; }

        /// <summary>
        /// Mã thương hiệu
        /// </summary>
        [Unduplicated]
        [Required]
        [DisplayName("Mã thương hiệu")]
        [MaxLength(20, "")]
        public string BrandCode { get; set; }

        /// <summary>
        /// Tên thương hiệu
        /// </summary>
        [Unduplicated]
        [Required]
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

        [DisplayName("Sản phẩm")]
        public virtual ICollection<Product> Products { get; set; }
    }
}
