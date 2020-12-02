using MISA.Infrastructure.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.Infrastructure.DatabaseContext
{
    public class DatabaseContext<T> : IDisposable, IDatabaseContext<T>
    {
        #region Property
        readonly string _connectionString = "User Id=dev;Password=12345678@Abc;Host=35.194.135.168;Database=WEB1020_MISACukcuk_TVHa;Port=3306;Character Set=utf8";
        MySqlConnection _sqlConnection;
        MySqlCommand _sqlCommand;
        public DatabaseContext()
        {
            // Khởi tạo kết nối:
            _sqlConnection = new MySqlConnection(_connectionString);
            _sqlConnection.Open();
            // Đối tượng xử lý command:
            _sqlCommand = _sqlConnection.CreateCommand();
            _sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        }
        #endregion Property
        #region Method
        #region Lấy dữ liệu
        /// <summary>
        /// Lấy dữ liệu phân trang
        /// Author: TVHa (27/11/2020)
        /// </summary>
        /// <param name="page"> Số trang </param>
        /// <param name="record"> Số bản ghi /param>
        /// <returns> Danh sách dữ liệu theo số lượng muốn lấy </returns>
        public IEnumerable<T> GetDataByPage(int page, int record)
        {
            try
            {
                var objects = new List<T>();
                var className = typeof(T).Name; // Lấy ra kiểu dữ liệu
                _sqlCommand.CommandText = $"Proc_Get{className}sByPage";
                _sqlCommand.Parameters.AddWithValue("PageLimit", record);
                _sqlCommand.Parameters.AddWithValue("Count", page);

                MySqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
                while (mySqlDataReader.Read())
                {
                    var obj = Activator.CreateInstance<T>(); // Tạo 1 đối tượng

                    for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                    {
                        var columnName = mySqlDataReader.GetName(i); // Lấy ra tên trường
                        var value = mySqlDataReader.GetValue(i); // Lấy giá trị trường
                        var propertyInfo = obj.GetType().GetProperty(columnName); // Lấy ra property có tên là columnName
                        if (propertyInfo != null && value != DBNull.Value)
                            propertyInfo.SetValue(obj, value);
                    }
                    objects.Add(obj);
                }
                mySqlDataReader.Close();
                return objects;
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Lấy dữ liệu không phân trang
        /// Author: TVHa (27/11/2020)
        /// </summary>
        /// <returns> Danh sách dữ liệu đầy đủ </returns>
        public IEnumerable<T> GetData()
        {
            try
            {
                var objects = new List<T>();
                var className = typeof(T).Name;
                _sqlCommand.CommandText = $"Proc_Get{className}";
                MySqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
                while (mySqlDataReader.Read())
                {
                    var obj = Activator.CreateInstance<T>();

                    for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                    {
                        var columnName = mySqlDataReader.GetName(i);// Lấy ra tên trường
                        var value = mySqlDataReader.GetValue(i);// Lấy giá trị trường
                        var propertyInfo = obj.GetType().GetProperty(columnName);// Lấy ra property có tên là columnName
                        if (propertyInfo != null && value != DBNull.Value)
                            propertyInfo.SetValue(obj, value);
                    }
                    objects.Add(obj);
                }
                mySqlDataReader.Close();
                return objects;
            }
            catch
            {
                return null;
            }

        }

        /// <summary>
        /// Lấy đối tượng theo Id
        /// Author: TVHa (27/11/2020)
        /// </summary>
        /// <param name="recordId"> Id của đối tượng </param>
        /// <returns> Đối tượng với Id tương ứng </returns>
        public T GetById(object recordId)
        {
            try
            {
                var className = typeof(T).Name;
                _sqlCommand.CommandText = $"Proc_Get{className}ById";
                MySqlCommandBuilder.DeriveParameters(_sqlCommand);
                if (_sqlCommand.Parameters.Count > 0)
                    _sqlCommand.Parameters[0].Value = recordId;
                MySqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
                var obj = Activator.CreateInstance<T>();
                if (mySqlDataReader.Read())
                {
                    for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                    {
                        var columnName = mySqlDataReader.GetName(i);// Lấy ra tên trường
                        var value = mySqlDataReader.GetValue(i);// Lấy giá trị trường
                        var propertyInfo = obj.GetType().GetProperty(columnName);// Lấy ra property có tên là columnName
                        if (propertyInfo != null && value != DBNull.Value)
                            propertyInfo.SetValue(obj, value);
                    }
                }
                mySqlDataReader.Close();
                return obj;
            }
            catch
            {
                return default(T);
            }

        }

        /// <summary>
        /// Lấy dữ liệu đối tượng theo Code
        /// Author: TVHa (27/11/2020)
        /// </summary>
        /// <param name="code"> Code của đối tượng </param>
        /// <returns> Đối tượng có code tương ứng </returns>
        public bool GetByCode(string code)
        {
            try
            {
                var objectType = typeof(T).Name;
                _sqlCommand.CommandText = $"Proc_Get{objectType}ByCode";
                MySqlCommandBuilder.DeriveParameters(_sqlCommand); //Lấy tham số của Proc
                if (_sqlCommand.Parameters.Count > 0)
                    _sqlCommand.Parameters[0].Value = code;
                MySqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
                if (mySqlDataReader.Read())
                {
                    mySqlDataReader.Close();
                    return true;
                }
                mySqlDataReader.Close();
                return false;
            }
            catch
            {
                return true;
            }

        }

        /// <summary>
        /// Lấy dữ liệu đối tượng có code lớn nhất
        /// Author: TVHa (27/11/2020)
        /// </summary>
        /// <returns> Đối tượng có code lớn nhất </returns>
        public string GetMaxEmployeeCode()
        {
            try
            {
                var objectType = typeof(T).Name;
                _sqlCommand.CommandText = $"Proc_GetMax{objectType}Code";
                return _sqlCommand.ExecuteScalar().ToString();
            }
            catch
            {
                return null;
            }

        }
        #endregion Lấy dữ liệu
        #region Thêm dữ liệu
        public int Insert(T obj)
        {
            try
            {
                var objectType = typeof(T).Name;
                _sqlCommand.CommandText = $"Proc_Insert{objectType}";
                MySqlCommandBuilder.DeriveParameters(_sqlCommand); //Lấy ra các tham số cần truyền của Proc
                var parameters = _sqlCommand.Parameters;
                foreach (MySqlParameter param in parameters)
                {
                    var paramName = param.ParameterName.Replace("@", "");
                    // Lấy ra property có tên là paramName và không phân biệt hoa thường
                    var property = obj.GetType().GetProperty(paramName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (property != null)
                        param.Value = property.GetValue(obj);
                }
                var affectRows = _sqlCommand.ExecuteNonQuery();
                return affectRows;
            }
            catch
            {
                return 0;
            }
        }
        #endregion Thêm dữ liệu
        #region Sửa dữ liệu
        public int Update(T obj)
        {
            try
            {
                var objectType = typeof(T).Name;
                _sqlCommand.CommandText = $"Proc_Update{objectType}";
                MySqlCommandBuilder.DeriveParameters(_sqlCommand);// Lấy ra các tham số cần truyền của Proc
                var parameters = _sqlCommand.Parameters;
                foreach (MySqlParameter param in parameters)
                {
                    var paramName = param.ParameterName.Replace("@", "");
                    // Lấy ra property có tên là paramName và không phân biệt hoa thường
                    var property = obj.GetType().GetProperty(paramName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (property != null)
                        param.Value = property.GetValue(obj);
                }
                var affectRows = _sqlCommand.ExecuteNonQuery();
                return affectRows;
            }
            catch
            {
                return 0;
            }

        }

        #endregion Sửa dữ liệu
        #region Xóa dữ liệu
        public int Delete(Guid recordId)
        {
            try
            {
                var objectType = typeof(T).Name;
                _sqlCommand.CommandText = $"Proc_Delete{objectType}";
                MySqlCommandBuilder.DeriveParameters(_sqlCommand);// Lấy ra các tham số cần truyền của Proc
                if (_sqlCommand.Parameters.Count > 0)
                {
                    _sqlCommand.Parameters[0].Value = recordId;
                }
                var affectRows = _sqlCommand.ExecuteNonQuery();
                return affectRows;
            }
            catch
            {
                return 0;
            }

        }
        #endregion Xoá dữ liệu
        #endregion Method

        //Đóng kết nối
        public void Dispose()
        {
            _sqlConnection.Close();
        }
    }
}