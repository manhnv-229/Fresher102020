/**
 * format dữ liệu sang dạng ngày/tháng/năm
 * @param {any} date tham số có kiểu dữ liệu bất kì
 * createdby: dvquang (13/11/2020)
 */
function formatDate(date) {
    var d = new Date(date);
    if (Number.isNaN(d.getTime())) {
        return "";
    } else {
        var day = d.getDate(),
            month = d.getMonth() + 1,
            year = d.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    }
}
/**
 * format muc luong
 * @param {Number} money so tien
 * createdby: dvquang (13/11/2020)
 */
function formatMoney(money) {
    if (money) {
        return money.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, '$1.');
    }
    return "";
}