using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces.Base;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public  class BaseController<IModelService,TModel> : ControllerBase
        where IModelService: IBaseService<TModel>
        where TModel: class
    {
        IModelService _iModelService;
        public BaseController(IModelService iModelService)
        {
            _iModelService = iModelService;
        }
        // GET: api/<modelsController>
        /// <summary>
        /// lấy danh sách tất cả bản ghi
        /// </summary>
        /// <returns>MethodResult</returns>
        /// CreatedBy: tqhuy(25/11/2020)
        [HttpGet]
        public IActionResult Get()
        {
            var data = _iModelService.GetAll();
            return Ok(data);
        }

        // GET api/<modelsController>/5
        /// <summary>
        /// lấy bản ghi theo id
        /// </summary>
        /// <param name="id"> id của object</param>
        /// <returns>MethodResult</returns>
        /// CreatedBy: tqhuy(25/11/2020)
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var item = _iModelService.GetById(id);
            return Ok(item);
        }

        // POST api/<modelsController>
        /// <summary>
        /// thêm mới một bản ghi
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>MethodResult</returns>
        /// CreatedBy: tqhuy(25/11/2020)
        [HttpPost]
        public IActionResult Post(TModel model)
        {           
            var newItem = _iModelService.Insert(model);
            return Ok(newItem);
        }

        // PUT api/<modelsController>/5
        /// <summary>
        /// update bản ghi theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <param name="model">object</param>
        /// <returns>MethodResult</returns>
        /// CreatedBy: tqhuy(25/11/2020)
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] TModel model)
        {           
            var newItem = _iModelService.Update(id,model);
            return Ok(newItem);
        }

        // DELETE api/<modelsController>/5
        /// <summary>
        /// xóa một object
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult</returns>
        /// CreatedBy: tqhuy(25/11/2020)
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var item = _iModelService.Delete(id);
            return Ok(item);
        }
    }
}
