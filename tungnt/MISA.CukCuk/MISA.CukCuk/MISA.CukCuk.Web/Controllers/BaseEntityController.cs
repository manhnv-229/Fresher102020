using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseEntityController<T> : ControllerBase
    {
        IBaseService<T> _baseService;
        public BaseEntityController(IBaseService<T> baseService)
        {
            _baseService = baseService;
        }

        // GET: api/<BaseEntityController>
        [HttpGet]
        public IActionResult Get()
        {
            var entities = _baseService.Get();
            return Ok(entities);
        }

        // GET api/<BaseEntityController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var res = _baseService.GetById(id);
            return Ok(res);
        }

        // POST api/<BaseEntityController>
        [HttpPost]
        public IActionResult Post([FromBody] T entity)
        {
            var res = _baseService.Insert(entity);
            return Ok(res);
        }

        // PUT api/<BaseEntityController>/5
        [HttpPut("{id}")]
        public IActionResult Put(string id,[FromBody] T entity)
        {
            var keyProperty = entity.GetType().GetProperty($"{typeof(T).Name}Id");
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

        // DELETE api/<BaseEntityController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var res = _baseService.Delete(id);
            return Ok(res);
        }
    }
}
