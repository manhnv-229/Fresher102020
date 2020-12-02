using MISA.ApplicationCore.Entities.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using Z.Dapper.Plus;
using System.Linq;
using MISA.ApplicationCore.Interfaces.Base;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Reflection;
using MISA.ApplicationCore.Entities.Enums;
using MISA.ApplicationCore.Class;

namespace MISA.Infarstructure
{
    public class BaseRepos<TModel>: IBaseRepos<TModel>
        where TModel: BaseEntity
    {
        string connectionstring;
        protected string _tableName;
        IConfiguration _configuration;
        protected MySqlConnection conn;
        #region constructor
        public BaseRepos(IConfiguration configuration)
        {
            //lấy tên table trong cơ sở dữ liệu tương ứng với tên TModel
            _tableName = typeof(TModel).Name;
            // lấy connection string
            _configuration = configuration;
            connectionstring = _configuration.GetConnectionString("MISACukcukConnectionString");
            conn = new MySqlConnection(connectionstring);
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
            var data = conn.Query<TModel>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure).ToList();
            return MethodResult<List<TModel>>.ResultWithData(data, totalRecord: data.Count);
        }
        /// <summary>
        /// lấy bản ghi từ cơ sở dữ liệu theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult</returns>
        /// createdBy: tqhuy(25/11/2020)
        public IMethodResult<TModel> GetById(Guid id)
        {
            var parameters = new DynamicParameters();
            parameters.Add($"{_tableName}ID", id, DbType.String);
            //string sql = $"select*from {_tableName} where {_tableName}ID = '{id}'";
            var data = conn.Query<TModel>($"Proc_Get{_tableName}ByID", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return MethodResult<TModel>.ResultWithData(data);
        }
        /// <summary>
        /// thêm một bản ghi vào cơ sở dữ liệu
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>MethodResult</returns>
        /// createdBy: tqhuy(25/11/2020)
        public IMethodResult Insert(TModel model)
        {
            model.GetType().GetProperty($"{_tableName}ID").SetValue(model, Guid.NewGuid());            
            var data = conn.BulkInsert(model);
            return MethodResult.ResultWithSuccess(totalRecord: data.Actions.Count());
        }

        /// <summary>
        /// update một bản ghi
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>MethodResult</returns>
        /// createdBy: tqhuy(25/11/2020)
        public IMethodResult Update(TModel model)
        {
            var data = conn.BulkUpdate(model);
            return MethodResult.ResultWithSuccess(totalRecord:data.Actions.Count());
        }

        /// <summary>
        /// xóa một bản ghi
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult</returns>
        /// createdBy: tqhuy(25/11/2020)
        public IMethodResult Delete(Guid id)
        {
            string sql = $"DELETE FROM {_tableName} WHERE {_tableName}ID = '{id}'";
            var data = conn.Execute(sql, commandType: CommandType.Text);
            return MethodResult.ResultWithSuccess(totalRecord: data);
        }

        public TModel GetEntityByProperty(PropertyInfo propertyInfo, TModel model)
        {
            var id = model.GetType().GetProperty($"{_tableName}ID").GetValue(model);
            if(model.State == EntityState.AddNew)
            {
                var sql = $"select * from {_tableName} where {propertyInfo.Name} = '{propertyInfo.GetValue(model)}'";
                var result = conn.Query<TModel>(sql, commandType: CommandType.Text).FirstOrDefault();
                return result;
            }
            else if (model.State == EntityState.Update)
            {
                var sql = $"select * from {_tableName} where {propertyInfo.Name} = '{propertyInfo.GetValue(model)}' AND {_tableName}ID <> '{id}'";
                var result = conn.Query<TModel>(sql, commandType: CommandType.Text).FirstOrDefault();
                return result;
            }
            else { return null; }
            
        }
        #endregion
    }
}
