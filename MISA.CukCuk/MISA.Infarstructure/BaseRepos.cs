using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using Z.Dapper.Plus;
using System.Linq;
using MISA.ApplicationCore.Interfaces.Base;

namespace MISA.Infarstructure
{
    public class BaseRepos<TModel>: IBaseRepos<TModel>
        where TModel: class
    {
        string connectionstring = "User Id=dev ;Host=35.194.135.168;Port= 3306; Password=12345678@Abc;Database =WEB1020_MISACukcuk_TQHuy ;Character Set=utf8";
        string _tableName;
        #region constructor
        public BaseRepos()
        {
            //lấy tên table trong cơ sở dữ liệu tương ứng với tên TModel
            _tableName = typeof(TModel).Name;
        }
        #endregion
        #region Method
        /// <summary>
        /// lấy tất cả bản ghi từ cơ sở dữ liệu
        /// </summary>
        /// <returns>MethodResult</returns>
        /// createdBy: tqhuy(25/11/2020)
        public IMethodResult<List<TModel>> GetAll()
        {
            using (var conn = new MySqlConnection(connectionstring))
            {
                string sql = $"select*from {_tableName}";
                var data = conn.Query<TModel>(sql).ToList();
                return MethodResult<List<TModel>>.ResultWithData(data, totalRecord: data.Count);
            }
        }
        /// <summary>
        /// lấy bản ghi từ cơ sở dữ liệu theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult</returns>
        /// createdBy: tqhuy(25/11/2020)
        public IMethodResult<TModel> GetById(Guid id)
        {
            using (var conn = new MySqlConnection(connectionstring))
            {
                string sql = $"select*from {_tableName} where {_tableName}ID = '{id}'";
                var data = conn.Query<TModel>(sql).FirstOrDefault();
                return MethodResult<TModel>.ResultWithData(data, totalRecord: 1);
            }
        }
        /// <summary>
        /// thêm một bản ghi vào cơ sở dữ liệu
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>MethodResult</returns>
        /// createdBy: tqhuy(25/11/2020)
        public IMethodResult Insert(TModel model)
        {
            using (var conn = new MySqlConnection(connectionstring))
            {
                var data = conn.BulkInsert(model);
                return MethodResult.ResultWithSuccess(message: "thêm dữ liệu thành công");
            }
        }

        /// <summary>
        /// update một bản ghi
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>MethodResult</returns>
        /// createdBy: tqhuy(25/11/2020)
        public IMethodResult Update(TModel model)
        {
            using (var conn = new MySqlConnection(connectionstring))
            {
                var data = conn.BulkUpdate(model);
                return MethodResult.ResultWithSuccess(message:"update dữ liệu thành công");
            }
        }

        /// <summary>
        /// xóa một bản ghi
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult</returns>
        /// createdBy: tqhuy(25/11/2020)
        public IMethodResult Delete(Guid id)
        {
            using (var conn = new MySqlConnection(connectionstring))
            {
                string sql = $"DELETE FROM {_tableName} WHERE {_tableName}ID = '{id}'";
                var data = conn.Query<TModel>(sql).FirstOrDefault();
                return MethodResult.ResultWithSuccess(message: "xóa dữ liệu thành công");
            }
        }
        #endregion
    }
}
