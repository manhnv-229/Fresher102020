using System;
using System.Collections.Generic;
using System.Text;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Const
{
    public class ConstParameter
    {
        #region Tham số cho GetByFilter
        /// <summary>
        /// Chỉ số trang
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string PageIndex = "PageIndex";
        /// <summary>
        /// Số bản ghi trên trang
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string PageSize = "PageSize";
        /// <summary>
        /// Khóa tìm kiếm
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string KeyWord = "KeyWord";
        /// <summary>
        /// Id thương hiệu
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string BrandId = "BrandId";
        /// <summary>
        /// Id danh mục
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string CategoryId = "CategoryId";
        /// <summary>
        /// Xuất xứ thương hiệu
        /// </summary>
        public const string BrandOrigin = "BrandOrigin";
        #endregion

        #region check Duplicate - Brand
        /// <summary>
        /// Tên thương hiệu
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string BrandName = "BrandName";
        /// <summary>
        /// Mã thương hiệu
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string BrandCode = "BrandCode";
        #endregion
        #region check Duplicate - Category
        /// <summary>
        /// Mã danh mục
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string CategoryCode = "CategoryCode";
        #endregion
        #region check Duplicate - Goods
        /// <summary>
        /// Mã hàng hóa
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string GoodsBarcode = "GoodsBarcode";
        #endregion


    }
}
