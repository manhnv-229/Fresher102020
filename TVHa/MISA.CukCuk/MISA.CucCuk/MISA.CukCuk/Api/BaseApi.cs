using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.Common.Models;

namespace MISA.CukCuk.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApi<T> : ControllerBase
    {
        #region Property
        IBaseService<T> _baseService;
        #endregion Properrty
        #region Constructor
        public BaseApi(IBaseService<T> baseService)
        {
            _baseService = baseService;
        }
        #endregion Constructor
        #region Method
        #region GET
        /// <summary>
        /// Lấy dữ liệu có phân trang
        /// </summary>
        /// <param name="page"> Trang </param>
        /// <param name="record"> Bản ghi </param>
        /// Author: TVHa (15/11/2020)
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get([FromQuery] int page, [FromQuery] int record)
        {
            var pagingObject = new PagingObject();
            pagingObject.TotalRecord = _baseService.GetData().Count();
            pagingObject.TotalPage = Convert.ToInt32(Math.Ceiling((decimal)pagingObject.TotalRecord / (decimal)record));
            pagingObject.Data = _baseService.GetDataByPage(record * (page - 1), record);
            if (pagingObject.Data != null)
                return Ok(pagingObject);
            else
                return NoContent();
        }

        /// <summary>
        /// Lấy dữ liệu của 1 đối tượng
        /// </summary>
        /// <param name="recordId">ID của đối tượng</param>
        /// Author: TVHa (15/11/2020)
        /// <returns></returns>
        [HttpGet("{recordId}")]
        public IActionResult Get([FromRoute] Guid recordId)
        {
            //TODO: Sửa db phần lấy thông tin
            var obj = _baseService.GetById(recordId);
            if (obj != null)
                return Ok(obj);
            else
                return NoContent();
        }
        [HttpGet("GetData")]
        public IActionResult Get()
        {
            var data = _baseService.GetData();
            if (data != null) return Ok(data);
            else return NoContent();
        }
        #endregion GET
        #region POST
        /// <summary>
        /// Thêm 1 đối tượng
        /// </summary>
        /// <param name="obj">đối tượng</param>
        /// Author: TVHa (15/11/2020)
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post([FromBody] T obj)
        {
            var serviceResponse = _baseService.Insert(obj);
            var affectRows = serviceResponse.Data != null ? ((int)serviceResponse.Data) : 0;
            if (affectRows > 0)
                return CreatedAtAction("POST", affectRows);
            else
                return BadRequest(serviceResponse);
        }
        #endregion POST
        #region PUT
        /// <summary>
        /// Sửa thông tin 
        /// </summary>
        /// <param name="obj">đối tượng</param>
        /// Author: TVHa (15/11/2020)
        /// <returns></returns>
        [HttpPut]
        public IActionResult Put([FromBody] T obj)
        {
            var serviceResponse = _baseService.Update(obj);
            var affectRows = serviceResponse.Data != null ? ((int)serviceResponse.Data) : 0;
            if (affectRows > 0)
                return CreatedAtAction("PUT", affectRows);
            else
                return BadRequest(serviceResponse);
        }
        #endregion PUT
        #region DELETE
        /// <summary>
        /// Xóa 1 đối tượng
        /// </summary>
        /// <param name="recordId"> Id của đối tượng </param>
        /// Author: TVHa (15/11/2020)
        /// <returns></returns>
        [HttpDelete("{recordId}")]
        public IActionResult Delete([FromRoute] Guid recordId)
        {
            var serviceResponse = _baseService.Delete(recordId);
            var affectRows = serviceResponse.Data != null ? ((int)serviceResponse.Data) : 0;
            if (affectRows > 0)
                return CreatedAtAction("DELETE", affectRows);
            else
            {
                serviceResponse.Msg.Add("Không tìm thấy nhân viên này!");
                return BadRequest(serviceResponse);
            }
        }
        #endregion DELETE
        #endregion Method
    }
}