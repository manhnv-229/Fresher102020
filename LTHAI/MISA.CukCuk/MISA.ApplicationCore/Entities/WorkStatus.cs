using MISA.ApplicationCore.Entities.BaseEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class WorkStatus: BaseEntity
    {
        public int WorkStatusId { get; set; }
        public string WorkStatusName { get; set; }
    }
}
