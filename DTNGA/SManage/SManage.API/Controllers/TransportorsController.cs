using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Interfaces.Service;
using SManage.ApplicationCore.Interfaces.Service.Base;


namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TransportorsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly ITransportorService _transportorService;
        public TransportorsController(IBaseMemoryCache baseMemoryCache, ITransportorService transportorService)
        {
            _baseMemoryCache = baseMemoryCache;
            _transportorService = transportorService;
        }


        /// <summary>
        /// Thực hiện tính chi phí vận chuyển
        /// </summary>
        /// <param name="transportorId">Id đơn vị vận chuyển</param>
        /// <param name="shopId">Id cửa hàng</param>
        /// <param name="customerAreaId">Mã đơn vị hành chính của người nhận</param>
        /// <returns>Chi phí vận chuyển</returns>
        /// CreatedBy dtnga /(14/12/2020)
        [HttpGet("Calculator")]
        public async Task<ActionServiceResult> CalculateFeeExpectedDeliveryDateAsync([FromQuery] Guid transportorId, [FromQuery] Guid shopId, [FromQuery] Guid customerAreaId)
        {
            var response = new ActionServiceResult();
            if (transportorId == null || shopId == null || customerAreaId == null)
            {
                response.Success = false;
                response.MISACode = MISACode.NotFound;
                response.Message = ApplicationCore.Properties.Resources.NotFound;
                return response;
            }
            else
            {
                response.Data = await _transportorService.GetTransportData(transportorId, shopId, customerAreaId);
                return response;
            }
        }

        /// <summary>
        /// Lấy danh sách đơn vị vận chuyển
        /// </summary>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <param name="keySearch"></param>
        /// <param name="shopId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetByFilterAsync([FromQuery] int page, [FromQuery] int size, [FromQuery] string keySearch, [FromQuery] Guid shopId)
        {
            var filterValues = new Dictionary<string, object>
            {
                { "PageIndex", page },
                { "PageSize", size },
                { "KeySearch", keySearch },
                { "ShopId", shopId}
            };
            var pagingData = await _transportorService.GetByFilterAsync<Transportor>(filterValues);
            return Ok(pagingData);
        }

        /// <summary>
        /// Lấy thông tin đơn vị vận chuyển theo Id
        /// </summary>
        /// <param name="transportorId">Id đơn vị vận chuyển</param>
        /// <returns></returns>
        /// CreatedBy dtnga(16/12/2020)
        [HttpGet("{transportorId}")]
        public async Task<IActionResult> GetOrderById([FromRoute] Guid transportorId)
        {
            var transportor = _baseMemoryCache.GetCache<Transportor>(transportorId.ToString());
            if (transportor == null)
            {
                transportor = await _transportorService.GetByIdAsync<Transportor>(transportorId);
                _baseMemoryCache.SetCache(transportorId.ToString(), transportor);
            }
            return Ok(transportor);
        }
        /// <summary>
        /// Thêm nhân viên mới
        /// </summary>
        /// <param name="range">Thông tin nhân viên mới</param>
        /// <returns>Id hàng hóa mới được thêm thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpDelete]
        public async Task<IActionResult> DeleteTransportorAsync([FromBody] List<Guid> range)
        {
            try
            {
                if (range.Count == 0) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var response = await _transportorService.DeleteRangeAsync<Transportor>(range);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return Ok(range);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Thêm đơn vị vận chuyển mới
        /// </summary>
        /// <param name="newTrans">Thông tin nhân viên mới</param>
        /// <returns>Id hàng hóa mới được thêm thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<IActionResult> AddNewAsync([FromBody] Transportor newTrans)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var response = await _transportorService.InsertAsync<Transportor>(newTrans);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(201, newTrans.TransportorId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Cập nhật thông tin nhân viên
        /// </summary>
        /// <param name="newUser"></param>
        /// <returns>Id thương hiệu cập nhật thành công </returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<IActionResult> UpdateTransAsync([FromBody] Transportor newTrans)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var response = await _transportorService.UpdateAsync<Transportor>(newTrans);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(200, newTrans.TransportorId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

    }
}
