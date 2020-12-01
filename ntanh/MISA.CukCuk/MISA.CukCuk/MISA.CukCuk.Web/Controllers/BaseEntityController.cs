using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Enums;
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
        /// Lấy toàn bộ bảng ghi
        /// </summary>
        /// <returns>Danh sách bản ghi</returns>
        /// CreatedBy: NTANH 2/11/2020
        // GET: api/<BaseEntityController>
        [HttpGet]
        public IActionResult Get()
        {
            var entities = _baseService.GetTEntites();
            return Ok(entities);
        }

        /// <summary>
        /// Lấy danh sách entity theo id
        /// </summary>
        /// <param name="id">id của khách hàng</param>
        /// <param name="name">tên của khách hàng</param>
        /// <returns>Obj entity</returns>
        /// CreatedBy: NTANH 2/11/2020
        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var entity = _baseService.GetEntityById(id);
            return Ok(entity);
        }

        // POST api/<CustomersController>
        [HttpPost]
        public IActionResult Post(TEntity entity)
        {
            // Validate dữ liệu:
            // Check trường bắt buộc nhập
            var serviceResult = _baseService.AddEntity(entity);

            if (serviceResult.MISACode == MISACode.NotValid)
            {
                return BadRequest(serviceResult.Data);
            }

            if (serviceResult.MISACode == MISACode.IsValid && (int)serviceResult.Data > 0)
                return Created("adfd", entity);
            else
                return NoContent();
        }

        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] TEntity entity)
        {
            // Validate dữ liệu:
            // Check trường bắt buộc nhập
            var serviceResult = _baseService.UpdateEntity(entity);

            if (serviceResult.MISACode == MISACode.NotValid)
            {
                return BadRequest(serviceResult.Data);
            }

            if (serviceResult.MISACode == MISACode.IsValid && (int)serviceResult.Data > 0)
                return Created("adfd", entity);
            else
                return NoContent();
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public int Delete(string id)
        {
            var rowAffects = _baseService.DeleteEntity(id);
            return rowAffects;
        }
    }
}
