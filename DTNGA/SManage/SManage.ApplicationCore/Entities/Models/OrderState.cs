using System;
using System.Collections.Generic;


namespace SManage.ApplicationCore.Entities
{
    public partial class OrderState
    {
        public Guid OrderStateId { get; set; }
        public int OrderStateCode { get; set; }
        public string OrderStateName { get; set; }
    }
}
