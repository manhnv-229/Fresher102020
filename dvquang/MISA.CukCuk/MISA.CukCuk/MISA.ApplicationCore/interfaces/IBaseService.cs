using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.interfaces
{
    /// <summary>
    /// lấy thông tin
    /// </summary>
    /// CreatedBy: DVQuang (25/11/2020)
    public interface IBaseService<TEntity>
    {

        /// <summary>
        /// lấy danh sách
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        IEnumerable<TEntity> GetEntities();
        /// <summary>
        /// lấy danh sách theo id
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        TEntity GetEntityById(Guid entityId);
        /// <summary>
        /// thêm mới
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        ServiceResult Add(TEntity entity);
        /// <summary>
        /// cập nhật
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        ServiceResult Update(TEntity entity);
        /// <summary>
        /// xóa
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        ServiceResult Delete(Guid entityId);
    }
}
