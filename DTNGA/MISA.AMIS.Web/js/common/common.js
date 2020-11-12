

/**
 * Hàm xử lý định dạng ngày
 * @param {any} date Bất kì kiểu dữ liệu nào
 * Creared by dtnga (11/11/2020)
 */
function formatDate(date) {
    if (Date.IsNaN)
        return ""
    else {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        day = day<0 ? '0'+day : day;
        return day + "/" + month + "/" + year;
    }
}
/**
 * Hàm xử lý dữ liệu tiền tệ
 * @param {int} money Số tiền
 */
function formatMoney(money) {

}