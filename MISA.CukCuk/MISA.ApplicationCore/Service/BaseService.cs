using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Enums;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.Base;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;

namespace MISA.ApplicationCore.Service
{
    public class BaseService<TModel> : IBaseService<TModel>
    {
        IBaseRepos<TModel> _baseRepos;

        public BaseService(IBaseRepos<TModel> baseRepos)
        {
            _baseRepos = baseRepos;
        }
        #region Method
        /// <summary>
        /// lấy danh sách tất cả bản ghi
        /// </summary>
        /// <returns>MethodResul</returns>
        /// createdBy: tqhuy(24/11/2020)
        public virtual IMethodResult<List<TModel>> GetAll()
        {
            var result = _baseRepos.GetAll();
            if (result.Data != null)
            {
                result.TotalRecord = result.Data.Count;
                result.Status = MISACode.Success;
            }
            else
            {
                result.Message = Properties.Resources.Msg_NotData;
            }
            return result;

        }
        /// <summary>
        /// lấy bản ghi theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResul</returns>
        public virtual IMethodResult<TModel> GetById(Guid id)
        {
            var result = _baseRepos.GetById(id);
            if (result.Data != null)
            {
                result.TotalRecord = 1;
                result.Status = MISACode.Success;
            }
            else
            {
                result.Message = String.Format(Properties.Resources.Msg_NotDataByID, id);
            }
            return result;
        }
        /// <summary>
        /// thêm bản ghi
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>MethodReult-số bản ghi bị ảnh hưởng</returns>
        /// createdBy: tqhuy(24/11/2020)
        public virtual IMethodResult Insert(TModel model)
        {
            model.GetType().GetProperty("State").SetValue(model, EntityState.AddNew);
            var isValidate = Validate(model);
            if (isValidate.Status != MISACode.NotValid)
            {
                var result = _baseRepos.Insert(model);
                if (result.TotalRecord != 0)
                {
                    result.Message = Properties.Resources.Msg_InsertSuccess;
                    result.Status = MISACode.Success;
                }
                else
                {
                    result.Message = Properties.Resources.Msg_InsertError;
                }
                return result;
            }
            else
            {
                return isValidate;
            }
        }

        public virtual IMethodResult Update(Guid id,TModel model)
        {
            model.GetType().GetProperty($"{typeof(TModel).Name}ID").SetValue(model, id);
            model.GetType().GetProperty("State").SetValue(model, EntityState.Update);
            var isValidate = Validate(model);
            if (isValidate.Status != MISACode.NotValid)
            {
                var result = _baseRepos.Update(model);
                if (result.TotalRecord != 0)
                {
                    result.Message = Properties.Resources.Msg_UpdateSuccess;
                    result.Status = MISACode.Success;
                }
                else
                {
                    result.Message = Properties.Resources.Msg_UpdateError;
                }
                return result;
            }
            else
            {
                return isValidate;
            }            
        }
        /// <summary>
        /// Xóa bản ghi theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult-số bản ghi bị ảnh hưởng</returns>
        /// createdBy: tquy(24/11/2020)
        public virtual IMethodResult Delete(Guid id)
        {
            var result = _baseRepos.Delete(id);
            if (result.TotalRecord == 0)
            {
                result.Message = Properties.Resources.Msg_DeleteError;

            }
            else
            {
                result.Message = Properties.Resources.Msg_DeleteSuccess;
                result.Status = MISACode.Success;
            }
            return result;
        }

        public IMethodResult Validate(TModel model)
        {
            MethodResult methodResult = new MethodResult();
            List<string> msg = new List<string>();
            var properties = model.GetType().GetProperties();
            foreach (var property in properties)
            {
                var displayNameAtt = property.GetCustomAttributes(typeof(DisplayName), true);
                var displayName = string.Empty;
                var propertyValue = property.GetValue(model);
                if (displayNameAtt.Length > 0)
                {
                    displayName = (displayNameAtt[0] as DisplayName).Name;
                }
                if (property.IsDefined(typeof(Required), false))
                {
                    
                    if (propertyValue == null)
                    {
                        msg.Add(string.Format(string.Format(Properties.Resources.Msg_Required, displayName)));
                        methodResult.Status = MISACode.NotValid;
                        methodResult.Success = false;
                    }
                }
                if(property.IsDefined(typeof(PhoneNumber), false))
                {
                    string pattern = @"[\Wa-zA-Z]";
                    RegexOptions options = RegexOptions.Multiline;
                    Regex regex = new Regex(pattern, options);
                    Match result = regex.Match(propertyValue.ToString());
                    if(result.Success)
                    {
                        msg.Add(Properties.Resources.Msg_isNotPhoneNumber);
                        methodResult.Status = MISACode.NotValid;
                        methodResult.Success = false;
                    }

                }
                if(property.IsDefined(typeof(Email), false))
                {
                    try
                    {
                        MailAddress m = new MailAddress(propertyValue.ToString()); 
                    }
                    catch (FormatException)
                    {
                        msg.Add(Properties.Resources.Msg_isNotEmail);
                        methodResult.Status = MISACode.NotValid;
                        methodResult.Success = false;
                    }
                }
                if (property.IsDefined(typeof(CheckDuplicate), false))
                {
                    var entity = _baseRepos.GetEntityByProperty(property, model);
                    if (entity != null)
                    {
                        msg.Add(string.Format(Properties.Resources.Msg_Duplicate, displayName));
                        methodResult.Status = MISACode.NotValid;
                        methodResult.Success = false;
                    }
                }
            }
            methodResult.Message = msg;
            return methodResult;
        }
        #endregion
    }
}
