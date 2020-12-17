using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Repositories
{
    /// <summary>
    /// Base thực hiên giao tiếp với Database
    /// </summary>
    /// CreatedBy dtnga (11/11/2020)
    public interface IBaseRepository
    {
        #region Execute
        /// <summary>
        /// Thực thi tuy vấn
        /// </summary>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<int> ExecuteAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        #endregion

        #region Delete
        /// <summary>
        /// Xóa dữ liệu bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Bản ghi xóa thành công</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<T> DeleteAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Xóa dữ liệu bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="entities">Danh sách đối tượng cần xóa</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Số bản ghi xóa thành công</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<int> DeleteRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text);
        #endregion

        #region Get
        /// <summary>
        /// Lấy tất cả bản ghi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (16/12/2020)
        List<T> GetAll<T>(string sp, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Lấy tất cả bản ghi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Danh sách đối tượng chứa dữ liệu đọc từ DB</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<List<T>> GetAllAsync<T>(string sp, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Lấy 1 bản ghi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Đối tượng chứa dữ liệu đọc từ DB</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<T> GetAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Lấy 1 bản ghi dựa theo Id
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="parms">Bộ tham số</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Đối tượng có Id theo mô tả</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<T> GetByIdAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
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
        Task<T> InsertAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Thêm 1 bản ghi vào DB
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="entities">Danh sách đối tượng cần thêm</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Đối tượng được thêm thành công</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<int> InsertRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text);
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
        Task<T> UpdateAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Cập nhật dữ liệu bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên procedure</param>
        /// <param name="entities">Danh sách đối tượng cần thêm</param>
        /// <param name="commandType">Loại truy vấn</param>
        /// <returns>Đối tượng được cập nhật thành công</returns>
        /// CreatedBy dtnga (11/11/2020)
        Task<int> UpdateRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text);
        #endregion

    }
}
