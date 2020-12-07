using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore.Interfaces.Service
{
    public interface IEnumUtility
    {
        /// <summary>
        /// Lấy tên Resource theo giá trị
        /// </summary>
        /// <param name="value">Giá trị</param>
        /// <param name="enumNameStringContains">Tên Enum được khai báo trong Resource</param>
        /// <returns></returns>
        /// CreatedBy: VDDUNG(14/11/2020)
        public string GetResourceNameByValue(string value, string enumNameStringContains);
        /// <summary>
        /// Lấy ra giá trị thông qua tên của Resource
        /// </summary>
        /// <param name="enumKey">Giá trị truyền vào</param>
        /// <returns></returns>
        /// CreatedBy: VDDUNG(16/11/2020)
        public string GetValueByResourceName(string resourceName);
        /// <summary>
        /// Xóa các kí tự đặc biệt và dấu cách
        /// </summary>
        /// <param name="text">Chuỗi đầu vào</param>
        /// <returns></returns>
        /// CreatedBy: VDDUNG(14/11/2020)
        public string RemoveCharacters(string text);

    }
}
