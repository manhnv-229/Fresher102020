﻿using Dapper;
using SManage.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Interfaces.DatabaseContext
{
    /// <summary>
    /// Thực hiện đóng/mở kết nối, giao tiếp với DB
    /// </summary>
    /// CreatedBy DtNga : 03/11/2020
    public interface IDatabaseContext : IDisposable
    {
        /// ModifiedBy DtNga : 09/11/2020
        
        /// <summary>
        ///  Thực thi truy vấn
        /// </summary>
        /// <param name="sp">Chuỗi truy vấn/ Tên Procedure</param>
        /// <param name="parms">Bộ tham số dùng để truy vấn</param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        Task<int> ExecuteAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);

        #region GET
        /// <summary>
        /// Lấy thông tin theo phân trang
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên Procedure</param>
        /// <param name="parms"> Bộ tham số</param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns>PagingData chứa danh sách và tổng số bản ghi thỏa mãn</returns>
        /// CreatedBy dtnga (30/12/2020)
        Task<PagingData<T>> GetPagingAsync<T>(string sp, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure);
        
        /// <summary>
        /// Lấy thông tin vận chuyển (chi phí , ngày giao hàng dự kiến)
        /// </summary>
        /// <param name="sp"></param>
        /// <param name="parms"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        Task<TransportData> GetTransportData(string sp, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Lấy nhiều bản ghi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="queryCommand"></param>
        /// <param name="parms"> Bộ tham số dùng để truy vấn </param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (16/12/2020)
        List<T> Get<T>(string queryCommand, DynamicParameters parms = null, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Lấy thông tin nhiều đối tượng
        /// </summary>
        /// <typeparam name="T">Kiếu đối tượng chứa thông tin được đọc</typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên Procedure</param>
        /// <param name="parms"> Bộ tham số dùng để truy vấn </param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns>1 đối tượng kiểu T</returns>
        Task<List<T>> GetAsync<T>(string sp, DynamicParameters parms= null, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Lấy thông tin đối tượng dựa theo Id
        /// </summary>
        /// <typeparam name="T">Kiếu đối tượng chứa thông tin được đọc</typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên Procedure</param>
        /// <param name="parms"> Bộ tham số dùng để truy vấn </param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns>1 đối tượng kiểu T</returns>
        Task<T> GetByIdAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        #endregion

        #region INSERT
        /// <summary>
        /// Thêm dánh sách dữ liệu vào DB
        /// </summary>
        /// <typeparam name="T">Kiếu đối tượng chứa thông tin được đọc</typeparam>
        /// <param name="sp">Chuỗi truy vấn</param>
        /// <param name="entities">danh sách đối tượng cần thêm vào DB</param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns>Số bản ghi được thêm</returns>
        Task<int> InsertRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text);
        /// <summary>
        /// Thêm dữ liệu vào database
        /// </summary>
        /// <typeparam name="T">Kiếu đối tượng chứa thông tin được đọc</typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên Procedure</param>
        /// <param name="parms"> Bộ tham số dùng để truy vấn </param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns>Đối tượng được thêm thành công vào DB</returns>
        Task<T> InsertAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);

        #endregion

        #region UPDATE
        /// <summary>
        /// Cập nhật dữ liệu
        /// </summary>
        /// <typeparam name="T">Kiếu đối tượng chứa thông tin được đọc</typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên Procedure</param>
        /// <param name="parms"> Bộ tham số dùng để truy vấn </param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns>Đối tượng được cập nhật thành công</returns>
        Task<T> UpdateAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        /// <summary>
        /// Cập nhật danh sách đối tượng trong DB
        /// </summary>
        /// <typeparam name="T">Kiếu đối tượng chứa thông tin được cập nhật</typeparam>
        /// <param name="sp">Chuỗi truy vấn</param>
        /// <param name="entities">Danh sách đối tượng chứa thông tin được cập nhật</param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns>Số bản ghi được cập nhật</returns>
        Task<int> UpdateRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text);
        #endregion

        #region DELETE
        /// <summary>
        /// Xóa bản ghi có thông tin mô tả trong tham số,  kiểu bất đồng bộ
        /// </summary>
        /// <typeparam name="T">Kiếu đối tượng chứa thông tin được đọc</typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên Procedure</param>
        /// <param name="entities"> Bộ tham số dùng để truy vấn </param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns></returns>
        Task<int> DeleteRangeAsync<T>(string sp, List<object> entities, CommandType commandType = CommandType.Text);
        /// <summary>
        /// Xóa bản ghi có thông tin mô tả trong tham số,  kiểu đồng bộ
        /// </summary>
        /// <typeparam name="T">Kiếu đối tượng chứa thông tin được đọc</typeparam>
        /// <param name="sp">Chuỗi truy vấn/ Tên Procedure</param>
        /// <param name="parms"> Bộ tham số dùng để truy vấn </param>
        /// <param name="commandType">Loại truy vẫn</param>
        /// <returns></returns>
        Task<T> DeleteAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        #endregion
    }
}
