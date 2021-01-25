using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        protected readonly IBaseService _baseService;
        protected readonly IBaseMemoryCache _baseMemoryCache;

        public UsersController(IBaseService baseService, IBaseMemoryCache baseMemoryCache)
        {
            _baseService = baseService;
            _baseMemoryCache = baseMemoryCache;
        }


        /// <summary>
        /// Lấy danh sách cửa hàng theo Id người dùng
        /// </summary>
        /// <param name="userId">Id người dùng</param>
        /// <returns></returns>
        /// CreatedBy dtnga (22/12/2021)
        [HttpGet("{userId}/shops")]
        public async Task<IActionResult> GetByUserId([FromRoute] Guid userId)
        {
            var shops= await _baseService.GetByPropertyAsync<Shop>("UserId", userId);
            return Ok(shops);
        }


        /// <summary>
        /// Thêm nhân viên mới
        /// </summary>
        /// <param name="newUser">Thông tin nhân viên mới</param>
        /// <returns>Id hàng hóa mới được thêm thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<IActionResult> AddNewAsync([FromBody] UserInfo newUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                newUser.UserInfoId = Guid.NewGuid();
                var response = await _baseService.InsertAsync<UserInfo>(newUser);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(201, newUser.UserInfoId);
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
        public async Task<IActionResult> UpdateUserAsync([FromBody] UserInfo newUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var response = await _baseService.UpdateAsync<UserInfo>(newUser);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(200, newUser.UserInfoId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Xóa nhân viên
        /// </summary>
        /// <param name="range">Thông tin nhân viên mới</param>
        /// <returns>Id hàng hóa mới được thêm thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpDelete]
        public async Task<IActionResult> DeleteUserAsync([FromBody] List<Guid> range)
        {
            try
            {
                if (range.Count == 0) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var response = await _baseService.DeleteRangeAsync<UserInfo>(range);
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
    }
}
