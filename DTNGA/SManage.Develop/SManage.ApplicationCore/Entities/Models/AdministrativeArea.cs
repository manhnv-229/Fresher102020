using System;
using System.Collections.Generic;

#nullable disable

namespace SManage.ApplicationCore.Entities
{
    public partial class AdministrativeArea
    {
        public Guid AdministrativeAreaId { get; set; }
        public string AdministrativeAreaCode { get; set; }
        public string AdministrativeAreaName { get; set; }
        public int Kind { get; set; }
    }
}
