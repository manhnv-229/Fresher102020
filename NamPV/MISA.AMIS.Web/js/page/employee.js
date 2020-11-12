$(document).ready(function () {
    loadData();
    initEvent();
})

/**
 * Load dữ liệu
 * CreateBy: NamPV (12/11/2020)
 * */
function loadData() {
        $.ajax({
            url: "http://api.manhnv.net/api/employees",
            method: "GET",
        }).done(function (res) {
            var data = res;
            $.each(data, function (index, item) {
                var dateOfBirth = item[`DateOfBirth`];
                dateOfBirth = formatDate(dateOfBirth);
                var salary = formatMoney(item.Salary);
                var html = $(`
            <tr>
                <th>`+ item.EmployeeCode + `</th>
                <th>`+ item.FullName + `</th>
                <th>`+ item.GenderName + `</th>
                <th>`+ dateOfBirth + `</th>
                <th>`+ item.PhoneNumber + `</th>
                <th>`+ item.Email + `</th>
                <th>`+ item.Address + `</th>
                <th>`+ item.Salary + `</th>
                <th>`+ item.DepartmentName + `</th>
                <th>`+ item.WorkStatusName + `</th>
            </tr>`);
                $(`.grid-employee tbody`).append(html);
            })
        }).fail(function (res) {
            console.log("Fail");
        })
}

/**
 * Chuyển định dạng ngày tháng sang ngày/tháng/năm
 * @param {any} date bất cứ kiểu dữ liệu nào
 * CreateBy: NamPV (12/11/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) { return "" }
    else {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        day = day < 10 ? `0` + day : day;
        month = month < 10 ? `0` + month : month;
        return day + `/` + month + `/` + year;
    }
}
/**
 * Định dạng hiển thị tiền tệ
 * @param {Number} money
 * CreateBy: NamPV(12/11/2020)
 */
function formatMoney(money) {

}
/**
 * Khởi tạo các sự kiện
 * CreateBy: NamPV (12/11/2020)
 * */
function initEvent() {
    $(`.employee-content .header-content .content-feature .content-add-box .btn-add`).click(showDialog);
    $(`.dialog-modal .dialog .dialog-header .dialog-close-button`).click(hideDialog);
}
/**
 * Hiển thị dialog thêm lao động
 * CreateBy: NamPV (12/11/2020)
 * */
function showDialog() {
    $(`.dialog-modal`).show();
}

function hideDialog() {
    $(`.dialog-modal`).hide();
}