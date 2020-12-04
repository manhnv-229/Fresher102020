using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseController<TEntity> : ControllerBase
    {
        #region Declare
        IBaseService<TEntity> _baseService;
        #endregion

        #region Constructor
        public BaseController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }
        #endregion

        #region Property
        #endregion

        #region Method
        /// <summary>
        /// Lấy tất cả danh sách đối tượng
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            var entities = _baseService.GetEntities();
            return Ok(entities);
        }

        // GET api/<BaseController>/5


        // POST api/<BaseController>
        [HttpPost]
        public IActionResult Post([FromBody] TEntity entity)
        {
            var serviceResult = _baseService.Add(entity);
            if (serviceResult.MISACode == MISACode.Notvalid)
                return BadRequest(serviceResult);
            if (serviceResult.MISACode == MISACode.Isvalid)
                return Created("Thêm thành công", serviceResult);
            else
                return NoContent();
        }

        //[HttpPost]
        //public IActionResult Copy([FromRoute] Guid id, [FromBody] TEntity entity)
        //{
        //    entity.GetType().GetProperty($"{typeof(TEntity).Name}Id").SetValue(entity, id);
        //    var serviceResult = _baseService.Copy(entity);
        //    return Ok(serviceResult);
        //}

        // PUT api/<BaseController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] Guid id, [FromBody] TEntity entity)
        {
            entity.GetType().GetProperty($"{typeof(TEntity).Name}Id").SetValue(entity, id);
            var serviceResult = _baseService.Update(entity);
            return Ok(serviceResult);
        }

        // DELETE api/<BaseController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var serviceResult = _baseService.Delete(id);
            return Ok(serviceResult);
        }
        #endregion
    }
}
