using System;
using System.Collections.Generic;
using System.Text;

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    

    /// <summary>
    /// Tên kiểu store sẽ thực thi
    /// </summary>
    /// CreatedBy dtnga (16/12/2020)
    public enum ProcdureTypeName
    {
        /// <summary>
        ///  Lấy dữ liệu
        /// </summary>
        Get,

        /// <summary>
        /// Lấy dữ liệu theo khóa chính
        /// </summary>
        GetById,
        /// <summary>
        /// Lấy dữ liệu theo 1 thuộc tính
        /// </summary>
        GetByProperty,

        /// <summary>
        /// Thêm mới
        /// </summary>
        Insert,

        /// <summary>
        /// Sửa/cập nhật dữ liệu
        /// </summary>
        Update,

        /// <summary>
        /// Xóa dữ liệu
        /// </summary>
        Delete,
        /// <summary>
        /// Lấy dữ liệu theo Id danh mục cha
        /// </summary>
        GetByParentId
    }

    /// <summary>
    /// Kiểu phương thức 
    /// </summary>
    public enum EntityState
    {
        /// <summary>
        /// Lấy dữ liệu
        /// </summary>
        GET,

        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        INSERT,

        /// <summary>
        /// Sửa dữ liệu
        /// </summary>
        UPDATE,

        /// <summary>
        /// Xóa dữ liệu
        /// </summary>
        DELETE
    }

    /// <summary>
    /// Các mã lỗi
    /// </summary>
    public enum MISACode
    {
        /// <summary>
        /// Thành công
        /// </summary>
        Success = 1001,
        /// <summary>
        /// Thêm thành công
        /// </summary>
        Created = 1002,

        /// <summary>
        /// Lỗi validate dữ liệu chung
        /// </summary>
        Validate = 1003,

        /// <summary>
        /// Lỗi validate dữ liệu không hợp lệ
        /// </summary>
        ValidateEntity = 1004,

        /// <summary>
        /// Lỗi validate dữ liệu do không đúng nghiệp vụ
        /// </summary>
        ValidateBussiness = 1005,

        /// <summary>
        /// Lỗi không tìm thấy
        /// </summary>
        NotFound = 1006,

        /// <summary>
        /// Lỗi Exception
        /// </summary>
        Exception = 1007,

        /// <summary>
        /// Lỗi Trùng dữ liệu
        /// </summary>
        Duplicate = 1008,

        /// <summary>
        /// Lỗi thêm mới entity
        /// </summary>
        ErrorAddEntity = 1009,

        /// <summary>
        /// Lỗi xóa entity
        /// </summary>
        ErrorDeleteEntity = 1010,
        /// <summary>
        /// Lỗi cập nhật entity
        /// </summary>
        ErrorUpdateEntity = 1011,


    }
    
    /// <summary>
    /// Kiểu Boolean
    /// </summary>
    public enum CheckBoolean
    {
        /// <summary>
        /// Đúng
        /// </summary>
        True = 1,
        /// <summary>
        /// Sai
        /// </summary>
        False = 0
    }
   

    /// <summary>
    /// Độ ưu tiên mã vùng
    /// </summary>
    public enum AreaKind
    {
        /// <summary>
        /// Quốc gia
        /// </summary>
        National = 0,
        /// <summary>
        /// Tỉnh/Thành phố
        /// </summary>
        Province = 1,
        /// <summary>
        /// Quận/Huyện
        /// </summary>
        District = 2,
        /// <summary>
        /// Xã/Phường
        /// </summary>
        Ward = 3
    }

    /// <summary>
    /// Chiều dài mã code các địa bàn hành chính
    /// </summary>
    public enum LengthOfAreaCode
    {
        /// <summary>
        /// Quốc gia
        /// </summary>
        National = 2,
        /// <summary>
        /// Tỉnh/Thành phố
        /// </summary>
        Province = 4,
        /// <summary>
        /// Quận/Huyện
        /// </summary>
        District = 7,
        /// <summary>
        /// Xã/Phường
        /// </summary>
        Ward = 12
    }

    /// <summary>
    /// Mức của hạng mục
    /// </summary>
    public enum LevelOfCategory
    {

    }
}
