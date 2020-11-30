using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface dùng chung cho các vấn đề nghiệp vụ validate dữ liệu
    /// </summary>
    /// CreatedBy: HNANH (27/11/2020)
    public interface IBaseService<TEntity>
    {
        /// <summary>
        /// Lấy toàn bộ danh sách thực thể
        /// </summary>
        /// <returns>Danh sách thực thể</returns>
        /// CreatedBy: HNANH (27/11/2020)
        IEnumerable<TEntity> GetEntities();
        /// <summary>
        /// Lấy thông tin thực thể qua id
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Thông tin thực thể có Id = entityId</returns>
        /// CreatedBy HNANH (27/11/2020)
        TEntity GetEntityById(string entityId);
        /// <summary>
        /// Thêm mới thực thể
        /// </summary>
        /// <param name="entity">Object thực thể</param>
        /// <returns>Số bản ghi thêm mới</returns>
        /// CreatedBy HNANH (27/11/2020)
        ServiceResult Insert(TEntity entity);
        /// <summary>
        /// Sửa thông tin thực thể
        /// </summary>
        /// <param name="entity">Obj thực thể</param>
        /// <returns>Số bản ghi được sửa</returns>
        /// CreatedBy: HNANH (27/11/2020)
        ServiceResult Update(TEntity entity);
        /// <summary>
        /// Xóa thực thể
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Số bản ghi xóa được</returns>
        /// CreatedBy: HNANH (27/11/2020)
        ServiceResult Delete(string entityId);
    }
}
