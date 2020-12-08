$(document).ready(function () {
   
})
/**
 * Format dữ liệu ngày tháng sang ngày/tháng/năm
 * @param {any} date tham số có kiểu dữ liệu bất kỳ
 * CreatedBy: DVQuang (11/11/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return day + '/' + month + '/' + year;
    }
}

/**
 * Hàm định dạng hiển thị tiền tệ
 * @param {Number} money Số tiền
 * CreatedBy: DVQuang (11/11/2020)
 */
function formatMoney(money) {
    if (money) {
        //var salary = parseFloat(money.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
        var salary = parseFloat(money).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //var salary = money;
        //this.salary = parseFloat(this.salary.replace(/,/g, ""))
        //    .toFixed(0)
        //    .toString()
        //    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return salary;
    }
    else {
        return "";
    }
}

/**
 * hàm đưa format dữ liệu ngày tháng năm từ db lên form chi tiết
 * createdby: dvquang(19/11/2020)
 * @param {any} date
 */
function formatDateDoubleClick(date) {
    var d = new Date(date);
    if (Number.isNaN(d.getTime())) {
        return "";
    } else {
        var day = d.getDate(),
            month = d.getMonth() + 1,
            year = d.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return year + '-' + month + '-' + day;
    }
}
/**
 * show mess thông báo thành công
 * CreatedBy: DVQuang (04/12/2020)
 * */
function showSuccessMessenger() {
    var html = `<div class="box-toast-msg">Thành công</div>`;
    if ($('body').find('.box-toast-msg').length == 0) {
        $('body').append(html);
    }
    $('.box-toast-msg').toggle();
    setTimeout(function () {
        $('.box-toast-msg').toggle();
    }, 2000)

}