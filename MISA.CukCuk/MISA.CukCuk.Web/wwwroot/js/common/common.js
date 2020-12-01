/**
 * hàm định dạng hiển thị ngày/tháng/năm
 * createdby: tqhuy (15/11/2020)
 * @param {any} date
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
 * hàm định dạng hiển thị tiền
 * createdby: tqhuy (15/11/2020)
 * @param {any} money
 */
function formatMoney(money) {
    if (money) {
        return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return "";
}