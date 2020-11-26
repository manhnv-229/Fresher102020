using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseService<T>
    {
        /// <summary>
        /// Lấy toàn bộ danh sách entity:
        /// </summary>
        /// <returns>Danh sách entity</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        IEnumerable<T> GetEntities();

        /// <summary>
        /// Lấy entity theo id:
        /// </summary>
        /// <returns>Entity có id truyền vào</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        T GetEntityById(string entityId);

        /// <summary>
        /// Thêm mới entity
        /// </summary>
        /// <param name="entity">object entity</param>
        /// <returns>Số bản ghi bị ảnh hưởng (thêm mới được)</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        int Add(T entity);

        /// <summary>
        /// Sửa thông tin entity
        /// </summary>
        /// <param name="entity">object entity cần sửa</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        int Update(T entity);

        /// <summary>
        /// Xóa entity
        /// </summary>
        /// <param name="entityId">id entity cần xóa</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        int Delete(string entityId);
    }
}
