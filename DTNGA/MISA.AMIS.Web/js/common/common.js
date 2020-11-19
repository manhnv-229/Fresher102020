

/**
 * Hàm xử lý định dạng ngày
 * @param {any} date Bất kì kiểu dữ liệu nào
 * Creared by dtnga (11/11/2020)
 */
function formatDate(date) {
    if (Date.isNaN)
        return ""
    else {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        day = day < 0 ? '0' + day : day;
        return day + "/" + month + "/" + year;
    }
}
/**
 * Hàm xử lý dữ liệu tiền tệ, có chứa đơn vị tiền tệ
 * @param {int} money Số tiền
 *
 * Created by dtnga (13/11/2020)
 */
function formatMoney(money) {
    const formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    })
    if (money)
        return formatter.format(money);
    else
        return "";
}
/**
 * Hàm xử lý dữ liệu tiền tệ, không chứa đơn vị tiền tệ
 * @param {int} money Số tiền
 * Created by dtnga (13/11/2020)
 */
function formatMoney(money) {
    if (money)
        return money.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    else
        return "";
}
