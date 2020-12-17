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
        Success = 200,

        /// <summary>
        /// Lỗi validate dữ liệu chung
        /// </summary>
        Validate = 400,

        /// <summary>
        /// Lỗi validate dữ liệu không hợp lệ
        /// </summary>
        ValidateEntity = 401,

        /// <summary>
        /// Lỗi validate dữ liệu do không đúng nghiệp vụ
        /// </summary>
        ValidateBussiness = 402,

        /// <summary>
        /// Lỗi không tìm thấy
        /// </summary>
        NotFound = 404,

        /// <summary>
        /// Lỗi Exception
        /// </summary>
        Exception = 500,

        /// <summary>
        /// Lỗi Trùng dữ liệu
        /// </summary>
        Duplicate = 501,

        /// <summary>
        /// Lỗi File không đúng định dạng
        /// </summary>
        FileFormat = 600,

        /// <summary>
        /// Lỗi File import không đúng định dạng
        /// </summary>
        ImportFileFormat = 601,

        /// <summary>
        /// Lỗi File Export không đúng định dạng
        /// </summary>
        ExportFileFormat = 602,

        /// <summary>
        /// Lỗi thêm mới entity
        /// </summary>
        ErrorAddEntity = 603,

        /// <summary>
        /// Lỗi xóa entity
        /// </summary>
        ErrorDeleteEntity = 604,
        /// <summary>
        /// Lỗi cập nhật entity
        /// </summary>
        ErrorUpdateEntity = 605,
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
