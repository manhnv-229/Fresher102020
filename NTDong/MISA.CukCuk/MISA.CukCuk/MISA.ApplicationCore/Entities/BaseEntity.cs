﻿using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Required:Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckDuplicate:Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey:Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength:Attribute
    {
        public int Value { get; set; }
        public string  ErrorMsg { get; set; }
        public MaxLength(int length, string erroMsg = null)
        {
            this.Value = length;
            this.ErrorMsg = erroMsg;
        }
    }
    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName:Attribute
    {
        public string Name { get; set; }
        public DisplayName(string name = null)
        {
            this.Name = name;
        }
    }
    public class BaseEntity
    {
        public EntityState EntityState { get; set; } = EntityState.AddNew;
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public string ModifyBy { get; set; }

    }
}
