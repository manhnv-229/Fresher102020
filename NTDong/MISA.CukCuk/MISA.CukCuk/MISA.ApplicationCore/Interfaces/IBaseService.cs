using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseService<TEntity>
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu 
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: NTDong(24/11/2020)
        IEnumerable<TEntity> GetEntities();
        /// <summary>
        /// Lấy dữ liệu theo mã id
        /// </summary>
        /// <param name="entityId">id của entity</param>
        /// <returns>Dữ liệu theo Id</returns>
        TEntity GetEntityById(Guid entityId);
        /// <summary>
        /// Thêm mới
        /// </summary>
        /// <param name="entity">dữ liệu </param>
        /// <returns>dữ liệu đã thêm mới</returns>
        ServiceResult Add(TEntity entity);
        /// <summary>
        /// Update dữ liệu 
        /// </summary>
        /// <param name="entityId">Id dữ liệu cần update </param>
        /// <returns>Dữ liệu sau khi update </returns>
        ServiceResult Update(TEntity entity);
        /// <summary>
        /// Xóa dữ liệu theo Id
        /// </summary>
        /// <param name="entityId">Mã Id dữ liệu cần xóa </param>
        /// <returns>Thông báo sau khi xóa</returns>
        ServiceResult Delete(Guid entityId);
    }
}
