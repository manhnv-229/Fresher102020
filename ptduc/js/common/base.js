$(document).ready(function () {});
class BaseJS {
  constructor() {
    this.initEvents();
    this.linkAPI = "";
  }
  setLinkAPI(linkAPI) {
    this.linkAPI = linkAPI;
  }

  /**
   * Kiểm tra email truyền vào có đúng định dạng không
   * @param {string} email : email cần kiểm tra, truyền vào dạng string
   */
  validateEmail(email) {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(email)) return true;
    return false;
  }

  /**
   * Thêm sự kiện click các nút trên màn hình
   */
  initEvents() {
    // Sự kiện click khi nhấn thêm mới:
    $(".add-user-m-btn").click(() => {
      $(".include-content").css("display", "block");
    });

    //Nhấn nút sync để nạp lại dữ liệu
    $("#sync-button").click(() => {
      alert("abc");
    });

    // Ẩn form chi tiết khi nhấn hủy:
    $("#btn-cancle-dialog, #btnCancel").click(() => {
      $(".include-content").css("display", "none");
    });

    // Thực hiện lưu dữ liệu khi nhấn button "Lưu" trên form chi tiết:
    $("#btnSave")
      .click(() => {
        var self = this;
        var check = true;
        var customer = {};
        //lấy tất cả các input từ form HTML để build object và validate
        var allInputField = $("[inputField]");

        //validate dữ liệu 
        $.each(allInputField, function (index, input) {
          if ($(input).prop("required")) {
            if (!$(input).val()) {
              $(input).addClass("border-red");
              alert("Chưa điền đủ các trường bắt buộc");
              check = false;
              return false;
            }
          }
          if ($(input).attr("type") == "email") {
            if (!self.validateEmail($(input).val())) {
              alert("Định dạng email chưa chính xác");
              $(input).addClass("border-red");
              check = false;
              return false;
            }
          }
          
        // thu thập thông tin dữ liệu được nhập -> build thành object:
          if ($(input).attr("type") === "radio") {
            if ($(input).is(":checked")) {
              let inputField = $(input).attr("inputField");
              let value = $(input).val();
              customer[inputField] = value;
            }
          } else {
            let inputField = $(input).attr("inputField");
            let value = $(input).val();
            customer[inputField] = value;
          }
        });
        customer.CustomerGroupId= "3631011e-4559-4ad8-b0ad-cb989f2177da";
        //Gọi API thêm dữ liệu lên server
        console.log(customer);
        if (check) {
          $.ajax({
            url: "http://api.manhnv.net/api/customers",
            method: "POST",
            data: JSON.stringify(customer),
            contentType: "application/json",
          })
            .done(function (res) {
              // Sau khi lưu thành công thì:
              // + đưa ra thông báo thành công,
              // + ẩn form chi tiết,
              // + load lại lại dữ liệu
              alert("thêm thành công!");
              $("#btn-cancle-dialog, #btnCancel").click(() => {
                $(".include-content").css("display", "none");
              });
              self.loadData();
            })
            .fail(function (e) {
              console.log(e);
            });
        }
      })
      .bind(this);

    // Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi trên danh sách dữ liệu:
    $("table tbody").on("dblclick", () => {
      alert("click");
    });

    /* 
     * Kiểm tra các trường bắt buộc nhập khi out focus khỏi input
     * CreatedBy: PTDuc (14/11/2020)
     */
    $("input[required]").blur(function () {
      // Kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo:
      var value = $(this).val();
      if (!value) {
        $(this).addClass("border-red");
        $(this).attr("title", "Trường này không được phép để trống");
      } else {
        $(this).removeClass("border-red");
      }
    });

    /* 
     * Kiểm tra email đúng định dạng khi out focus khỏi input
     * CreatedBy: PTDuc (14/11/2020)
     */
    var self = this;
    $('input[type="email"]').blur(function () {
      var value = $(this).val();
      if (!self.validateEmail(value)) {
        $(this).addClass("border-red");
        $(this).attr("title", "Email không đúng định dạng.");
      } else {
        $(this).removeClass("border-red");
      }
    });
  }

  /**
   * Đưa ngày tháng ra theo định dạng
   * @param {string} date : date truyền vào là 1 string
   * @param {string} type: type là kiểu định dạng ngày tháng trả về VD:ddmmyyyy,..
   */
  formatDate(data, type) {
    let date = new Date(data);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let year = date.getFullYear();
    switch (type) {
      case "ddmmyyyy":
        return day + "/" + month + "/" + year;
        break;
      case "mmddyyyy":
        return month + "/" + day + "/" + year;
        break;
      default:
        return "";
    }
  }

  /**
   * Format lại data thành dạng tiền tệ
   * @param {string} data : data là giá trị cần định dạng tiền tệ
   */
  formatMoney(data) {
    return data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
  }
  loadData() {
    //Lấy thông tin các cột dữ liệu
    try {
      var ths = $("table thead th");
      var fieldName = [];
      var self = this;
      $.each(ths, function (index, value) {
        fieldName.push();
      });

      //Map dữ liệu lên UI
      $.ajax({
        type: "GET",
        url: this.linkAPI,
        async: false,
      }).done((res) => {
        $.each(res, function (index, value) {
          var tr = $("<tr></tr>");
          $.each(ths, (ind, val) => {
            var fieldName = $(val).attr("fieldName");
            var typeFormat = $(val).attr("formatType");

            var data = value[fieldName];
            if (data) {
              if (typeFormat === "ddmmyyyy" || typeFormat === "mmddyyyy") {
                data = self.formatDate(data, typeFormat);
              } else if (typeFormat === "money") {
                data = self.formatMoney(data)
              }
            } else {
              data = "";
            }
            var td = `<td class="alight-left-table">${data}</td>`;
            tr.append(td);
          });

          $(".table-content").first().append(tr);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
