﻿

/**
 * Hàm xử lý định dạng ngày
 * @param {any} date Bất kì kiểu dữ liệu nào
 * @param {string} format định dạng ngày muốn format, vd "dd/mm/yyyy"
 * Creared by dtnga (11/11/2020)
 * ModifiedBy dtnga (19/11/2020)
 */
function formatDate(date, format) {
    if (Date.isNaN)
        return ""
    else {

        var date = new Date(date);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();

        if (format.trim() == "dd/mm/yyyy")
            return day + "/" + month + "/" + year;
        else if (format.trim() == "yyyy-mm-dd")
            return  year + "-" + month + "-" + day;
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