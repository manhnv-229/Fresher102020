/**--------------------------------------------------
 * Fortmat dữ liệu ngày tháng năm sang ngày/tháng/năm
 * @param {any} date có kiểu dữ liệu bất kỳ
 * CreatedBy: NTANH (12/11/2020)
 */

function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date)) {
        return "";
    }
    else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    }
}
/**------------------------------
 * Hàm định dạng hiển thị tiền tệ
 * @param {Number} money Số tiền
 */
function formatMoney(money) {
    if (money) {
        return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return "";
}