using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore.Entities.Base
{
    public class TransportData
    {
        /// <summary>
        /// Phí giao hàng
        /// </summary>
        public double ShippingFee { get; set; }
        /// <summary>
        /// Ngày giao hàng dự kiến
        /// </summary>
        public DateTime ExpectedDeliveryDate { get; set; }
    }
}
