using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseService<TEntity>
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
        /// <returns>Kết quả server trả về</returns>
        ServiceResult Add(TEntity entity);

        /// <summary>
        /// Cập nhật thông tin đối tượng
        /// </summary>
        /// <param name="entity">Dối tượng bất kỳ</param>
        /// <returns>Kết quả server trả về</returns>
        ServiceResult Update(TEntity entity);

        /// <summary>
        /// Xóa đội tượng
        /// </summary>
        /// <param name="entityId">Mã Id của đối tượng</param>
        /// <returns>Kết quả server trả về</returns>
        ServiceResult Delete(Guid entityId);
    }
}
