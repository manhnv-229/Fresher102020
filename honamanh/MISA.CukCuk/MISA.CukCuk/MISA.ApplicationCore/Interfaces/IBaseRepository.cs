using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface dùng chung cho việc thao tác với csdl
    /// </summary>
    /// CreatedBy: HNANH (27/11/2020)
    public interface IBaseRepository<TEntity>
    {
        /// <summary>
        /// Lấy toàn bộ danh sách thực thể
        /// </summary>
        /// <returns>Danh sách thực thể</returns>
        /// CreatedBy: HNANH (27/11/2020)
        IEnumerable<TEntity> GetEntities();
        IEnumerable<TEntity> GetEntities(string procedureName);
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
        int Insert(TEntity entity);
        /// <summary>
        /// Sửa thông tin thực thể
        /// </summary>
        /// <param name="entity">Obj thực thể</param>
        /// <returns>Số bản ghi được sửa</returns>
        /// CreatedBy: HNANH (27/11/2020)
        int Update(TEntity entity);
        /// <summary>
        /// Xóa thực thể
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Số bản ghi xóa được</returns>
        /// CreatedBy: HNANH (27/11/2020)
        int Delete(string entityId);

        TEntity GetEntityByProperty(TEntity entity, PropertyInfo property);
    }
}
