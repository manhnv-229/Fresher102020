using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntitiesController<TEntity> : ControllerBase
    {
        IBaseService<TEntity> _baseService;
        public EntitiesController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }
        // GET: api/<EntitiesController>
        [HttpGet]
        public IActionResult Get()
        {
            var entities = _baseService.GetEntities();
            return Ok(entities);
        }

        // GET api/<EntitiesController>/5
        [HttpGet("{entityId}")]
        public IActionResult Get(string entityId)
        {
            var entity = _baseService.GetEntityById(entityId);
            return Ok(entity);
        }

        // POST api/<EntitiesController>
        [HttpPost]
        public IActionResult Post(TEntity entity)
        {
            var serviceResult = _baseService.Insert(entity);
            if (serviceResult.MISACode == MISACode.NotValid)
            {
                return BadRequest(serviceResult);
            }
            else return Created("Thêm thành công", serviceResult);
        }

        // PUT api/<EntitiesController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute]string id, TEntity entity)
        {
            var entityIdType = entity.GetType().GetProperty($"{typeof(TEntity).Name}Id").PropertyType;
            if (entityIdType == typeof(Guid))
            {
                entity.GetType().GetProperty($"{typeof(TEntity).Name}Id").SetValue(entity, Guid.Parse(id));
            }
            else
            {
                var entiIdConvert = Convert.ChangeType(id, entityIdType);
                entity.GetType().GetProperty($"{typeof(TEntity).Name}Id").SetValue(entity, entiIdConvert);
            }

            var serviceResult = _baseService.Update(entity);
            if (serviceResult.MISACode == MISACode.NotValid)
            {
                return BadRequest(serviceResult);
            }
            else return Ok(serviceResult);
        }

        // DELETE api/<EntitiesController>/5
        [HttpDelete("{entityId}")]
        public IActionResult Delete(string entityId)
        {
            var serviceResult = _baseService.Delete(entityId);
            if (serviceResult.MISACode == MISACode.NotFound)
            {
                return NotFound();
            }
            else return Ok(serviceResult);
        }
    }
}
