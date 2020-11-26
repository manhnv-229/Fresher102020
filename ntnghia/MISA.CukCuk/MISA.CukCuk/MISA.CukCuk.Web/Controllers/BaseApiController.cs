﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api Danh mục entity
    /// CreatedBy: NTNghia (23/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseApiController<T> : ControllerBase
    {
        IBaseService<T> _baseService;

        #region Constructor
        public BaseApiController(IBaseService<T> baseService)
        {
            _baseService = baseService;
        }
        #endregion

        #region Method

        /// <summary>
        /// Lấy toàn bộ danh sách
        /// </summary>
        /// <returns>Danh sách entity</returns>
        /// CreatedBy: NTNghia (26/11/2020)    
        [HttpGet]
        public IActionResult Get()
        {
            var entities = _baseService.GetEntities();
            return Ok(entities);
        }

        /// <summary>
        /// Lấy entity theo id
        /// </summary>
        /// <returns>entity có id truyền vào</returns>
        /// CreatedBy: NTNghia (26/11/2020)      
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var entity = _baseService.GetEntityById(id);
            return Ok(entity);
        }

        /// <summary>
        /// Thêm mới entity
        /// </summary>
        /// <param name="entitiy">object cần thêm</param>
        /// <returns>Số bản ghi bị ảnh hưởng (thêm mới được)</returns>
        /// CreatedBy: NTNghia (26/11/2020)
        [HttpPost]
        public IActionResult Post(T entity)
        {
            var rowAffects = _baseService.Add(entity);
            return Ok(rowAffects);
        }

        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            return Ok(1);
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var rowAffects = _baseService.Delete(id);
            return Ok(rowAffects);
        }
        #endregion
    }
}
