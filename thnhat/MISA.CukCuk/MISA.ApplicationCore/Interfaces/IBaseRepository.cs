using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        /// <summary>
        /// Lấy danh sách đối tượng
        /// </summary>
        /// <returns>Danh sách đối tượng</returns>
        public IEnumerable<TEntity> GetEntities();

        /// <summary>
        /// Hàm thêm đội tượng mới
        /// </summary>
        /// <param name="entity">Đối tượng bất kỳ</param>
        /// <returns>Số hàng ảnh hưởng</returns>
        int Add(TEntity entity);

        /// <summary>
        /// Cập nhật thông tin đối tượng
        /// </summary>
        /// <param name="entity">Dối tượng bất kỳ</param>
        /// <returns>Số hàng ảnh hưởng</returns>
        int Update(TEntity entity);

        /// <summary>
        /// Xóa đội tượng
        /// </summary>
        /// <param name="entityId">Mã Id của đối tượng</param>
        /// <returns>Số hàng ảnh hưởng</returns>
        int Delete(Guid entityId);

        /// <summary>
        /// Lấy đối tượng với trường có giá trị tương ứng
        /// </summary>
        /// <param name="entity">Đối tượng bất kỳ</param>
        /// <param name="property">Trường của đối tượng (có tên và giá trị)</param>
        /// <returns>Đối tượng đầu tiên được lấy ra</returns>
        TEntity GetEntityByProperty(TEntity entity, PropertyInfo property);
    }
}
