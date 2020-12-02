using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infrastructure.Interfaces
{
    public interface IDatabaseContext<T>
    {
        /// <summary>
        /// Lấy danh sách bản ghi
        /// </summary>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        IEnumerable<T> GetData();

        /// <summary>
        /// Lấy dữ liệu theo trang và giới hạn bản ghi
        /// </summary>
        /// <param name="page"> Trang </param>
        /// <param name="record"> Bản ghi trong 1 trang </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        IEnumerable<T> GetDataByPage(int page, int record);

        /// <summary>
        /// Lấy dữ liệu thông qua Id
        /// </summary>
        /// <param name="recordId"> id </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        T GetById(object recordId);

        /// <summary>
        /// Thêm mới 1 bản ghi
        /// </summary>
        /// <param name="obj"> Đối tượng thêm </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        int Insert(T obj);

        /// <summary>
        /// Sửa thông tin
        /// </summary>
        /// <param name="obj"> Đối tượng </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        int Update(T obj);

        /// <summary>
        /// Xóa bản ghi thông qua Id
        /// </summary>
        /// <param name="recordId">id</param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        int Delete(Guid recordId);

        /// <summary>
        /// Lấy dữ liệu thông qua mã 
        /// </summary>
        /// <param name="objectCode"> Mã </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        bool GetByCode(string objectCode);

        /// <summary>
        /// Lấy ra mã lớn nhất
        /// </summary>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        string GetMaxEmployeeCode();
    }
}