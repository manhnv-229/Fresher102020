using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseEntityController<TEntity> : ControllerBase
    {
        IBaseService<TEntity> _baseService;
        public BaseEntityController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }
        /// <summary>
        /// Lấy toàn bộ khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy:NTDong(23/11/2020)
        [HttpGet]
        public IActionResult Get()
        {
            var enities = _baseService.GetEntities();
            return Ok(enities);
        }

        /// <summary>
        /// Lấy danh sách khách hàng theo id và tên
        /// </summary>
        /// <param name="id">id cuả khách hàng </param>
        /// <param name="name">tên của khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NTDong(23/11/2020)
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var entity = _baseService.GetEntityByID(Guid.Parse(id));
            return Ok(entity);
        }

        /// <summary>
        /// Thêm mới một khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <returns>Thông tin khách hàng đã được lưu</returns>
        /// CreatedBy: NTDong(23/11/2020)
        [HttpPost]
        public IActionResult Post(TEntity entity)
        {
            var rowAffect = _baseService.Add(entity);
            return Ok(rowAffect);

        }

        /// <summary>
        /// Chỉnh sửa thông tin khách hàng
        /// </summary>
        /// <param name="id">Id của khách hàng</param>
        /// <param name="value">Thông tin khách hàng chỉnh sửa</param>
        /// CreatedBy: NTDong(23/11/2020)
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute]string id, [FromBody] TEntity entity)
        {
            var keyProperty = entity.GetType().GetProperty($"{typeof(TEntity).Name}Id");
            if (keyProperty.PropertyType == typeof(Guid))
            {
                keyProperty.SetValue(entity, Guid.Parse(id));
            }
            else if (keyProperty.PropertyType == typeof(int))
            {
                keyProperty.SetValue(entity, int.Parse(id));
            }
            else
            {
                keyProperty.SetValue(entity, id);
            }

            var rowAffects = _baseService.Update(entity);
            return Ok(rowAffects);
        }

        /// <summary>
        /// Xóa thông tin khách hàng
        /// </summary>
        /// <param name="id">id của khách hàng muốn xóa</param>
        /// CreatedBy : NTDong(23/11/2020)
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var res = _baseService.Delete(id);
            return Ok(res);
        }
    }
}
