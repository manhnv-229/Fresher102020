using System;
using System.Collections.Generic;
using System.Text;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Entities
{
    public class ConstProcedure
    {
        /// <summary>
        /// Procedure lấy dữ liệu theo bộ lọc
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string Proc_GetByFilter = "Proc_Get{0}ByFilter";
        /// <summary>
        /// Procedure lấy dữ liệu thuộc tính
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string Proc_GetProperty = "Proc_Get{0}";
        /// <summary>
        /// Procedure lấy toàn bộ dữ liệu
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string Proc_GetAlll= "Proc_GetAll{0}";
        /// <summary>
        /// Procedure lấy dữ liệu theo Id
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string Proc_GetById = "Proc_Get{0}By{1}Id";
        /// <summary>
        /// Procedure lấy dữ liệu theo thuộc tính
        /// </summary>
        /// CreatedBy dtnga (06/01/2021)
        public const string Proc_GetByProperty = "Proc_Get{0}By{1}";
    }
}
