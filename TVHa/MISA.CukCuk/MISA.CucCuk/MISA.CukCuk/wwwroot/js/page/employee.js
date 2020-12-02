$(document).ready(function () {
    new EmployeeJS();

    dialogDetail = $(".m-dialog").dialog({
        autoOpen: false,
        fluid: true,
        minWidth: 700,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    });
})

/**
 * Class quản lý các sự kiện cho trang nhân viên:
 * Author: TVHa (14/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }

    /**
     * Override lại hàm getData của base.js
     * Author: TVHa (14/11/2020)
     * */
    getData() {
        try {
            var temp = this;
            var page = $('#txtPageNumber').val();
            var record = $("#txbNumberRecord").val();
            // Gọi api:
            $.ajax({
                url: "/api/employees?page=" + page + "&record=" + record,
                method: "GET",
                contentType: "application/json",
                dataType: "json",
                async: false
            }).done(function (res) {
                temp.Data = res.Data;
                // Cập nhật lại tổng số trang:
                $("#totalPage").text("trên " + res.TotalPage);
                $("#pageLast").data('totalPage', res.TotalPage);
                // Hiển thị tổng số bản ghi:
                $("#totalRecord").text(res.TotalRecord);
                //Cập nhật lại miền giá trị:
                if (page == res.TotalPage) {
                    $("#maxRecord").text(res.TotalRecord);
                } else {
                    $("#maxRecord").text(page * record);
                }
                $("#minRecord").text((page * record) - record + 1);
            }).fail(function (res) {
                debugger;
                //Hiện dialog báo lỗi:
                $(".dialog-modal.error").show();
                $("#errorMessage").html("Có lỗi khi truyền dữ liệu tới server, vui lòng thử lại!");
                $(".dialog-error").show();
            })
        } catch{
            $(".dialog-modal.error").show();
            $("#errorMessage").html("Có lỗi khi truyền dữ liệu tới server, vui lòng thử lại!");
            $(".dialog-error").show();
        }

    }

    /**
     * Override lại hàm getObjData của base.js
     * Author: Bui Trung Tu (28/9/2020)
     * @param {string} recordId id của đối tượng
     */
    getObjData(recordId) {
        try {
            var temp = this;
            // Gọi api
            $.ajax({
                url: "/api/employees/" + recordId,
                method: "GET",
                contentType: "application/json",
                dataType: "json",
                async: false
            }).done(function (employee) {
                if (employee.EmployeeId) {
                    temp.Obj = employee; // Truyền lại dữ liệu của đối tượng sang cho base.js xử lý tiếp
                    if (employee.Avatar) {
                        $('#avatar').attr('src', "/content/img/" + employee.Avatar);
                    }
                } else {
                    // hiện thông báo
                    $(".dialog-modal.error").show();
                    $("#errorMessage").html("Không tìm thấy nhân viên, vui lòng thử lại!");
                    $(".dialog-error").show();
                }
            }).fail(function () {
                // hiện dialog báo lỗi
                $(".dialog-modal.error").show();
                $("#errorMessage").html("Có lỗi khi truyền dữ liệu tới server, vui lòng thử lại!");
                $(".dialog-error").show();
            })
        } catch{
            $(".dialog-modal.error").show();
            $("#errorMessage").html("Có lỗi khi truyền dữ liệu tới server, vui lòng thử lại!");
            $(".dialog-error").show();
        }
    }

    /**
     * Lưu dữ liệu vào database
     * Author: TVHa (14/11/2020)
     * @param {object} employee đối tượng cần lưu vào database
     * @param {string} method phương thức lưu: POST hay là PUT
     */
    saveToDB(employee, method) {
        try {
            var temp = this;
            employee.EmployeeId = temp.recordId;
            // Gọi api:
            $.ajax({
                url: "/api/employees",
                method: method,
                data: JSON.stringify(employee),
                contentType: "application/json",
                dataType: "json",
                async: false
            }).done(function (res) {
                if (res > 0) {
                    // Lưu thành công, hiện lại dữ liệu:
                    temp.btnCloseOnClick();
                    temp.loadData();
                    temp.recordId = null;
                }
            }).fail(function (res) {
                //hiện dialog thông báo lỗi:
                $(".dialog-modal.error").show();
                var error = "";
                $.each(res.responseJSON.Msg, function (i, msg) {
                    error += ", " + msg;
                })
                error = error.substring(1);
                $("#errorMessage").html(error);
                $(".dialog-error").show();
            })
        } catch{
            $(".dialog-modal.error").show();
            $("#errorMessage").html("Có lỗi khi truyền dữ liệu tới server, vui lòng thử lại!");
            $(".dialog-error").show();
        }
    }

    /**
     * Override lại hàm deleteFromDB của base.js
     * Author: Bui Trung Tu (28/9/2020)
     * @param {any} employeeId mã của nhân viên cần xoá
     */
    deleteFromDB(employeeId) {
        try {
            var temp = this;
            // Gọi api:
            $.ajax({
                url: "/api/employees/" + employeeId,
                method: "DELETE"
            }).done(function (res) {
                if (res == true) {
                    // Xoá thành công:
                    temp.loadData();
                    temp.btnCloseOnClick();
                }
            }).fail(function (res) {
                if (res.responseJSON.Msg) {
                    // Thông báo kết quả nếu không thể xoá:
                    $(".dialog-modal.error").show();
                    $("#errorMessage").html(res.responseJSON.Msg[1]);
                    $(".dialog-error").show();
                } else {
                    // Thông báo lỗi:
                    $(".dialog-modal.error").show();
                    $("#errorMessage").html("Có lỗi khi truyền dữ liệu tới server, vui lòng thử lại!");
                    $(".dialog-error").show();
                }
            })
        } catch{
            $(".dialog-modal.error").show();
            $("#errorMessage").html("Có lỗi khi truyền dữ liệu tới server, vui lòng thử lại!");
            $(".dialog-error").show();
        }
    }
}