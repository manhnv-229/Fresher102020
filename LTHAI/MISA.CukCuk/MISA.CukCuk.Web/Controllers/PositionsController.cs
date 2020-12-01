using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interface.ServiceInterface;

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api danh mục chức vụ
    /// CreatedBy: LTHAI(23/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        #region Attribute
        private readonly IPositionService _positionService;
        #endregion

        #region Contructor
        public PositionsController(IPositionService positionService)
        {
            this._positionService = positionService;
        }
        #endregion

        /// <summary>
        /// Lấy toàn bộ thôn tin chức vụ
        /// </summary>
        /// <returns>Danh sách chức vụ</returns>
        [HttpGet]
        public IActionResult Get()
        {
            var positions = _positionService.Gets();
            return Ok(positions);
        }

        // GET api/<PositionsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PositionsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PositionsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PositionsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
