using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Repositories;
using SManage.ApplicationCore.Interfaces.Service.Base;

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        protected readonly IBaseService _baseService;
        protected readonly IBaseRepository _baseRepository;
        protected readonly IBaseMemoryCache _baseMemoryCache;

        public AccountsController(IBaseService baseService, IBaseRepository baseRepository, IBaseMemoryCache baseMemoryCache)
        {
            _baseService = baseService;
            _baseRepository = baseRepository;
            _baseMemoryCache = baseMemoryCache;
        }

        /// <summary>
        /// Kiểm tra thông tin tài khoản đăng nhập
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionServiceResult> Login([FromQuery] string username, [FromQuery] string password)
        {
            var response = new ActionServiceResult();
            var param = new DynamicParameters(new { UserName = username, Password = password });
            var userInfo = (await _baseRepository.GetAsync<UserInfo>("Proc_GetUserInfoByAccountNamePassword", param)).FirstOrDefault();
            if (userInfo != null)
            {
                HttpContext.Session.SetString("UserName", username);
                HttpContext.Session.SetString("PassWord", password);
                _baseMemoryCache.SetCache("currentUser", userInfo);
                response.Data = userInfo;
                return response;
            }
            return null;
        }

        /// <summary>
        /// Đăng xuất, xóa session
        /// </summary>
        /// <returns></returns>
        [HttpDelete("logout")]
        public ActionServiceResult Logout ()
        {
            HttpContext.Session.SetString("UserName", "");
            HttpContext.Session.SetString("PassWord", "");
            return new ActionServiceResult();
        }
        /// <summary>
        /// Lấy thông tin tài khoản theo Id, nếu có trả về thông tin đầy đủ về người dùng
        /// </summary>
        /// <param name="accountId"> Id tài khoản</param>
        /// <returns></returns>
        /// CreatedBy dtnga (22/12/2020)
        [HttpGet("{accountId}")]
        public async Task<ActionServiceResult> GetByIdAsync([FromRoute] Guid accountId)
        {
            var response = new ActionServiceResult();
            var account = (Account)(await _baseService.GetByIdAsync<Account>(accountId)).Data;
            if (account != null)
            {
                // Lấy thông tin Role
                var roleId = account.RoleId;
                var role = (Role)(await _baseService.GetByIdAsync<Role>(roleId)).Data;
                // Lấy thông tin UserInfo
                var userId = account.UserId;
                var userInfo = (UserInfo) (await _baseService.GetByIdAsync<UserInfo>(userId)).Data;
                account.Role = role;
                account.User = userInfo;
            }
            response.Data = account;
            return response;
        }

    }
}
