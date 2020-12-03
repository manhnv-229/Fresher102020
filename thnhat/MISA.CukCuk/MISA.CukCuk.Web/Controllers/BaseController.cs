using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.Enums;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseController<TEntity> : ControllerBase
    {
        IBaseService<TEntity> _baseService;
        public BaseController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }
        // GET: api/<BaseController>
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
    }
}
