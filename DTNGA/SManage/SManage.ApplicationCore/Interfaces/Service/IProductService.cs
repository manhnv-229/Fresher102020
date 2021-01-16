using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Interfaces.Service
{
    public interface IProductService: IBaseService
    {
        /// <summary>
        /// Lấy dữ liệu 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="param"></param>
        /// <returns></returns>
        Task<List<T>> GetByKeyword<T>(Dictionary<string, object> param);
    }
}
