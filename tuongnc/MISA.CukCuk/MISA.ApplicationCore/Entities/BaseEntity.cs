using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Required:Attribute
    {

    }
    public class Unique:Attribute
    {

    }
    public class PrimaryKey:Attribute
    {

    }
    public class BaseEntity
    {
        [DisplayName("Mã RESFULL")]
        public EntityStage EntityStage { get; set; } = EntityStage.Add;
        [DisplayName("Ngày tạo")]
        public DateTime? CreatedDate { get; set; }
        [DisplayName("Được tạo bởi")]
        public string CreatedBy { get; set; }
        [DisplayName("Được sửa đổi bởi")]
        public string ModifiedBy { get; set; }
        [DisplayName("Ngày sửa đổi")]
        public DateTime? ModifiedDate { get; set; }
    }
}
