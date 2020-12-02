using System;
using System.Collections.Generic;
using MISA.Common.Models;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseService<T>
    {
        /// <summary>
        /// Lấy dữ liệu
        /// </summary>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        IEnumerable<T> GetData();
        /// <summary>
        /// Lấy dữ liệu có phân trang
        /// </summary>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        IEnumerable<T> GetDataByPage(int page, int record);

        /// <summary>
        /// Lấy dữ liệu của đối tượng
        /// </summary>
        /// <param name="recordId"> id của T </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        T GetById(object recordId);

        /// <summary>
        /// Thêm 1 đối tượng
        /// </summary>
        /// <param name="obj"> T </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        ServiceResponse Insert(T obj);

        /// <summary>
        /// Sửa dữ liệu
        /// </summary>
        /// <param name="obj"> T </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        ServiceResponse Update(T obj);

        /// <summary>
        /// Xóa dữ liệu
        /// </summary>
        /// <param name="recordId"> id của T </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        ServiceResponse Delete(Guid recordId);
    }
}