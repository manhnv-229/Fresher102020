using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infrastructure.Interfaces
{
    public interface IBaseRepository<T>
    {

        /// <summary>
        /// Lấy dữ liệu
        /// </summary>
        /// Author: TVHa (27/11/2020)
        /// <returns></returns>
        IEnumerable<T> GetData();

        /// <summary>
        /// Lấy dữ liệu và phân trang
        /// </summary>
        /// <param name="page"> Trang </param>
        /// <param name="record"> Số bản ghi trong 1 trang </param>
        /// Author: TVHa (27/11/2020)
        /// <returns></returns>
        IEnumerable<T> GetDataByPage(int page, int record);

        /// <summary>
        /// Lấy dữ liệu của 1 đối tượng
        /// </summary>
        /// <param name="recordId"> id của T </param>
        /// Author: TVHa (27/11/2020)
        /// <returns></returns>
        T GetById(object recordId);

        /// <summary>
        /// Thêm mới 1 đối tượng
        /// </summary>
        /// <param name="obj"> T </param>
        /// Author: TVHa (27/11/2020)
        /// <returns></returns>
        int Insert(T obj);

        /// <summary>
        /// Sửa dữ liệu 1 đối tượng
        /// </summary>
        /// <param name="obj">T</param>
        /// Author: TVHa (27/11/2020)
        /// <returns></returns>
        int Update(T obj);

        /// <summary>
        /// Xóa 1 đối tượng
        /// </summary>
        /// <param name="recordId"> id của T </param>
        /// Author: TVHa (27/11/2020)
        /// <returns></returns>
        int Delete(Guid recordId);
    }
}