using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Interfaces.Service
{
    public interface IOrderService : IBaseService
    {
        Task<ActionServiceResult> ProcessingOrder(Order order);
    }
}
