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
        /// Lấy thông tin người dùng hiện tại
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public UserInfo GetCurrentUser()
        {
            return (UserInfo)_baseMemoryCache.GetCache("currentUser");
        }

        /// <summary>
        /// Lấy danh sách cửa hàng theo Id người dùng
        /// </summary>
        /// <param name="userId">Id người dùng</param>
        /// <returns></returns>
        /// CreatedBy dtnga (22/12/2021)
        [HttpGet("{userId}/shops")]
        public async Task<ActionServiceResult> GetByUserId([FromRoute] Guid userId)
        {
            return await _baseService.GetByPropertyAsync<Shop>("UserId", userId);
        }
    }
}
