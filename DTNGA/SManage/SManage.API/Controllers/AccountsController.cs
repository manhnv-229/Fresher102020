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
            var userInfo = (await _baseRepository.GetAsync<UserInfo>
                                    ("Proc_GetUserInfoByAccountNamePassword", param)).FirstOrDefault();
            if (userInfo != null)
            {
                HttpContext.Session.SetString("UserName", username);
                HttpContext.Session.SetString("PassWord", password);
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

    }
}
