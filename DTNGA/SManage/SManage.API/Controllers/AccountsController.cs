using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Service.Base;

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        protected readonly IBaseService _baseService;

        public AccountsController(IBaseService baseService)
        {
            _baseService = baseService;
        }

        [HttpGet]
        public async Task<ActionServiceResult> GetByAuthen([FromHeader] string username, [FromHeader] string password)
        {
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
