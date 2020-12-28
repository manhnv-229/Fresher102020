﻿using Dapper;
using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Interfaces.Service.Base
{
    public interface IBaseService
    {
        #region Delete        
        /// <summary>
        /// Xóa 1 bản ghi bất đồng bộ
        /// CreatedBy dtnga (11/11/2020)
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entityId">Id bản ghi cần xóa</param>
        /// <returns>Bản ghi xóa thành công</returns>
        Task<ActionServiceResult> DeleteAsync<T>(Guid entityId);
        /// <summary>
        /// Xóa nhiều bản ghi bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="entities">Danh sách đối tượng cần xóa</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Số bản ghi xóa thành công</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<int> DeleteRangeAsync<T>(List<object> entities);

        #endregion

        #region Execute
        /// <summary>
        /// Thực thi tuy vấn bất đồng bộ
        /// </summary>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<int> ExecuteAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        #endregion

        #region Get
        /// <summary>
        /// Lấy tất cả bản ghi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        ActionServiceResult GetAll<T>();
        /// <summary>
        /// Lấy tất cả bản ghi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Danh sách đối tượng chứa dữ liệu đọc từ DB</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<ActionServiceResult> GetAllAsync<T>();
        /// <summary>
        /// /// <summary>
        /// Lấy nhiều bản ghi dựa theo 1 thuộc tính
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="propName">Tên thuộc tính</param>
        /// <param name="propValue">Giá trị thuộc tính</param>
        /// <returns></returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<ActionServiceResult> GetByPropertyAsync<T>(string propName, object propValue);
        /// <summary>
        /// Lấy 1 bản ghi dựa theo Id
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Đối tượng có Id theo mô tả</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<ActionServiceResult> GetByIdAsync<T>(Guid entityId);

        /// <summary>
        /// Lấy thông tin theo phân trang
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="limit">Số bản ghi trên 1 trang</param>
        /// <param name="offset">Trang cần lấy</param>
        /// <returns></returns>
        /// CreatedBy dtnga (18/12/2020)
        Task<ActionServiceResult> GetByPagingAsync<T>(int limit, int offset);

        /// <summary>
        /// Lấy thông tin theo bộ lọc
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="propName">Tên tham số</param>
        /// <param name="propValue">Giá trị</param>
        /// <returns></returns>
        /// CreatedBy dtnga (18/12/2020)
        Task<ActionServiceResult> GetByFilterAsync<T>(string propName, object propValue);
        #endregion

        #region Insert
        /// <summary>
        /// Thêm 1 bản ghi vào DB
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Đối tượng được thêm thành công</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<ActionServiceResult> InsertAsync<T>(T entity) where T : BaseEntity;
        /// <summary>
        /// Thêm nhiều bản ghi vào DB
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="entities">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Đối tượng được thêm thành công</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<int> InsertRangeAsync<T>(List<object> entities);
        #endregion

        #region Update
        /// <summary>
        /// Cập nhật dữ liệu
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Đối tượng được cập nhật thành công</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<ActionServiceResult> UpdateAsync<T>(T entity) where T : BaseEntity;
        /// <summary>
        /// Cập nhật dữ liệu bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="entities">Danh sách đối tượng cần thêm</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Đối tượng được cập nhật thành công</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<int> UpdateRangeAsync<T>(List<object> entities);
        #endregion

        /// <summary>
        /// Thực hiện custome việc validate dữ liệu
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Entity"></param>
        /// <returns>true-entity hợp lệ, false- entity không hợp lệ</returns>
        /// CreatedBy dtnga (04/12/2020)
        Task<bool> CustomeValidateAsync<T>(T entity) where T : BaseEntity;
    }
}