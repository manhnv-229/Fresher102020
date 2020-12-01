﻿using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        #region dalacer
        #endregion
        #region constructor
        #endregion
        #region method
        /// <summary>
        /// Lấy toàn bộ dữ liệu của bảng
        /// </summary>
        /// <returns>List Entity</returns>
        /// CreatedBy: NTANH 27/11/2020
        IEnumerable<TEntity> GetTEntites();

        /// <summary>
        /// Lấy dữ liệu Entity qua Id(Khóa chính)
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Thông tin Entity</returns>
        /// CreatedBy: NTANH 27/11/2020
        TEntity GetEntityById(string entityId);

        /// <summary>
        /// Thêm Entity vào bảng dữ liệu
        /// </summary>
        /// <param name="entity">Obj Entity</param>
        /// <returns>Entity new</returns>
        /// CreatedBy: NTANH 27/11//2020
        ServiceResult AddEntity(TEntity entity);

        /// <summary>
        /// Sủa thông tin Entity
        /// </summary>
        /// <param name="entity">Thông tin entity</param>
        /// <returns>Obj entity</returns>
        /// CreatedBy: NTANH 27/11/2020
        TEntity UpdateEntity(TEntity entity);

        /// <summary>
        /// Xóa thông tin 1 entity
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Số bảng ghi thay đổi</returns>
        /// CreatedBy: NTANH 27/11/2020
        int DeleteEntity(string entityId);
        #endregion
    }
}
