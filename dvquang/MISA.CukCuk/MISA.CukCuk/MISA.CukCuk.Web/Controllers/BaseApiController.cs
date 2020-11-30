
using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController<TEntity> : ControllerBase
    {
        IBaseService<TEntity> _baseService;
        public BaseApiController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }
        /// <summary>
        /// Get api
        /// </summary>
        /// <returns>200</returns>
        /// CreatedBy: DVQuang (24/11/2020)
        [HttpGet]
        public IActionResult Get()

        {
            var customers = _baseService.GetEntities();
            return Ok(customers);
        }

        /// <summary>
        /// GET api/<CustomersController>
        /// </summary>
        /// <param name="id"></param>
        /// <returns>200 ok</returns>
        /// CreatedBy: DVQuang (24/11/2020)
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var entity = _baseService.GetEntityById(Guid.Parse(id));

            return Ok(entity);
        }

        /// <summary>
        /// POST api/<CustomersController>
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>kết quả trạng thái</returns>
        /// CreatedBy: DVQuang (24/11/2020)
        [HttpPost]
        public IActionResult Post(TEntity entity)

        {

            var serviceResult = _baseService.Add(entity);
            if (serviceResult.MISACode == ApplicationCore.Enums.MISACode.NotValid)
            {
                return BadRequest(serviceResult);
            }
            else
            {
                return Ok(serviceResult);
            }
            

        }

        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute]string id, [FromBody] TEntity entity)
        {
            var keyProperty = entity.GetType().GetProperty($"{typeof(TEntity).Name}Id");
            if (keyProperty.PropertyType == typeof(Guid))
            {
                keyProperty.SetValue(entity, Guid.Parse(id));
            }
            else if(keyProperty.PropertyType == typeof(int))
            {
                keyProperty.SetValue(entity, int.Parse(id));
            }
            else
            {
                keyProperty.SetValue(entity, id);
            }
            var serviceResult = _baseService.Update(entity);
            if (serviceResult.MISACode == ApplicationCore.Enums.MISACode.NotValid)
            {
                return BadRequest(serviceResult);
            }
            else
            {
                return Ok(serviceResult);
            }
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var res = _baseService.Delete(id);
            return Ok(res);
        }
    }
}
