using SManage.ApplicationCore.Interfaces.Service;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace SManage.ApplicationCore.Enums
{
    public class EnumUtility : IEnumUtility
    {
        /// <summary>
        /// Lấy tên Resource theo giá trị (VD lấy ra Enum_Gender_Male theo giá trị là "Nam")
        /// </summary>
        /// <param name="value">Giá trị truyền vào</param>
        /// <param name="enumNameStringContains">Contain của Resource (VD:Enum_Gender)</param>
        /// <returns>Tên đầy đủ của Resource (Enum_Gender_Male)</returns>
        /// CreatedBy: VDDUNG (13/10/2020)
        public string GetResourceNameByValue(string value, string enumNameStringContains)
        {
            var enumValueRemoveCharacter = RemoveCharacters(value);
            System.Resources.ResourceManager resourceManager = new System.Resources.ResourceManager("SManage.ApplicationCore.Properties.Resources", this.GetType().Assembly);
            var entry =
                resourceManager.GetResourceSet(System.Threading.Thread.CurrentThread.CurrentCulture, true, true)
                  .OfType<DictionaryEntry>()
                  .FirstOrDefault(e => RemoveCharacters(e.Value.ToString()) == enumValueRemoveCharacter && e.Key.ToString().Contains(enumNameStringContains));
            if (entry.Key == null)
                return null;
            return entry.Key.ToString();
        }

        /// <summary>
        /// Lấy ra giá trị thông qua tên của Resource
        /// </summary>
        /// <param name="enumKey">Giá trị truyền vào</param>
        /// <returns>Giá trị của Resource</returns>
        /// CreatedBy: VDDUNG(16/11/2020)
        public string GetValueByResourceName(string resourceName)
        {
            var enumValueRemoveCharacter = RemoveCharacters(resourceName);
            System.Resources.ResourceManager resourceManager = new System.Resources.ResourceManager("SManage.ApplicationCore.Properties.Resources", this.GetType().Assembly);
            var entry =
                resourceManager.GetResourceSet(System.Threading.Thread.CurrentThread.CurrentCulture, true, true)
                  .OfType<DictionaryEntry>()
                  .FirstOrDefault(e => RemoveCharacters(e.Key.ToString()) == enumValueRemoveCharacter);
            if (entry.Value == null)
                return null;
            return entry.Value.ToString();
        }


        /// <summary>
        /// Hàm chuyển các ký tự unicode thành ký tự không dấu, viết liền và viết thường (mục đích để compare gần đúng 2 chuỗi ký tự)
        /// </summary>
        /// <param name="text">Chuỗi ký tự</param>
        /// <returns></returns>
        /// CreatedBy: VDDUNG (08/10/2020)
        public string RemoveCharacters(string text)
        {
            var newText = string.Concat(
                text.Normalize(NormalizationForm.FormD)
                .Where(ch => CharUnicodeInfo.GetUnicodeCategory(ch) !=
                                              UnicodeCategory.NonSpacingMark)
              ).Normalize(NormalizationForm.FormC);
            return newText.Replace(" ", string.Empty).ToLower();
        }
    }
}
