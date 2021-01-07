﻿using MISA_Dictionary_GoodsService.ApplicationCore.Entities.DTO.Brand;
using System;
using System.Collections.Generic;

#nullable disable

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    /// <summary>
    /// Thương hiệu
    /// </summary>
    public partial class Brand : BaseEntity
    {
        public Brand()
        {
            Goods = new HashSet<Goods>();
        }

        #region Properties
        /// <summary>
        /// Id thương hiệu
        /// </summary>
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Mã thương hiệu không được bỏ trống")]
        [PrimaryKey]
        [Unduplicated]
        [DisplayName("Id thương hiệu")]
        public Guid BrandId { get; set; }

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

        [DisplayName("Sản phẩm")]
        public virtual ICollection<Goods> Goods { get; set; }
        #endregion
        #region Methods
        public static Brand ConvertFromCreateDTO(BrandCreateDTO brandCreateDTO)
        {
            return new Brand
            {
                BrandCode = brandCreateDTO.BrandCode,
                BrandName= brandCreateDTO.BrandName,
                BrandDescription= brandCreateDTO.BrandDescription,
                BrandOrigin= brandCreateDTO.BrandOrigin
            };
        }
        public static Brand ConvertFromUpdateDTO(BrandUpdateDTO brandUpdateDTO)
        {
            return new Brand
            {
                BrandId= brandUpdateDTO.BrandId,
                BrandCode = brandUpdateDTO.BrandCode,
                BrandName = brandUpdateDTO.BrandName,
                BrandDescription = brandUpdateDTO.BrandDescription,
                BrandOrigin = brandUpdateDTO.BrandOrigin
            };
        }
        #endregion
    }
}
