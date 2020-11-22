$(document).ready(function () {

})
/**
 * Hàm định dạng hiển thị ngày/tháng/năm
 * @param {any} date tham số có kiểu dữ liệu bất kỳ
 * Author: TVHa (12/11/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime()) == NaN)
        return '';
    else {
        var day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();
        if (day < 10)
            day = '0' + day;
        if (month < 10)
            month = '0' + month;
        return day + '/' + month + '/' + year;
    }
}

/**
 * Hàm định dạng hiển thị tiền tệ
 * @param {Number} money Tham số truyền vào dạng số
 * Author: TVHa (12/11/2020)
 */
function formatMoney(money) {
    var num = 0;
    if (money !== null) {
        num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        return num;
    }
    else
        return '';
}