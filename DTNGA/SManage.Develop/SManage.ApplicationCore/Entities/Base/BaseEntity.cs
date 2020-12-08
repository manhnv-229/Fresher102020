using SManage.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore.Entities.Base
{
    public class BaseEntity
    {
        public EntityState EntityState = EntityState.GET;
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class Required : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class Unduplicated : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName : Attribute
    {
        public string name { get; set; }
        public DisplayName(string name)
        {
            this.name = name;
        }
    }

    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength : Attribute
    {
        public int maxLength { get; set; }
        public string errorMsg { get; set; }

        public MaxLength(int maxLength, string errorMsg)
        {
            this.maxLength = maxLength;
            this.errorMsg = errorMsg;
        }
    }

}


