using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CucCuk.Web.Api
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseApi<T> : ControllerBase
    {
        #region Property
        IBaseService<T> _baseService;
        #endregion Property
        #region Constructor
        public BaseApi(IBaseService<T> baseService)
        {
            _baseService = baseService;
        }
        #endregion Contructor
        #region Method
        #region GET
        /// <summary>
        /// Lấy dữ liệu có phân trang
        /// </summary>
        /// <param name="page"> Trang </param>
        /// <param name="record"> Bản ghi </param>
        /// Author: TVHa (24/11/2020)
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
        /// <param name="objectId"> Id của đối tượng </param>
        /// Author: TVHa (24/11/2020)
        /// <returns> Đối tượng có Id tương ứng </returns>
        [HttpGet("{objectId}")]
        public IActionResult Get([FromRoute] Guid objectId)
        {
            var obj = _baseService.GetById(objectId);
            if (obj != null)
                return Ok(obj);
            else
                return NoContent();
        }

        /// <summary>
        /// Lấy ra toàn bộ bản ghi trong bảng
        /// Author: TVHa (24/11/2020)
        /// </summary>
        /// <returns>Toàn bộ bản ghi trong bảng</returns>
        [HttpGet("GetData")]
        public IActionResult Get()
        {
            var data = _baseService.GetData();
            if (data != null)
                return Ok(data);
            else
                return NoContent();
        }
        #endregion GET
        #region POST
        /// <summary>
        /// Thêm 1 đối tượng
        /// </summary>
        /// <param name="obj"> Đối tượng </param>
        /// Author: TVHa (24/11/2020)
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
        /// <param name="obj"> Đối tượng </param>
        /// Author: TVHa (24/11/2020)
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
        /// Xoá 1 đối tượng
        /// </summary>
        /// <param name="objectId"> Id của đối tượng </param>
        /// Author: BTTu (17/10/2020)
        /// <returns></returns>
        [HttpDelete("{objectId}")]
        public IActionResult Delete([FromRoute] Guid objectId)
        {
            var serviceResponse = _baseService.Delete(objectId);
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