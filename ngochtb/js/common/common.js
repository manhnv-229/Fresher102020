$(document).ready(function () {
    /* new EmployeeJs();*/
})



/**
 * Hàm định dạng ngày/tháng/năm
 * @param {any} date
 * created by ngochtb(12/11/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    }
    else {
        var day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    }

}


/**
 * Hàm định dạng tiền tệ
 * @param {Number} money số tiền
 * created by ngochtb(12/11/2020)
 */

function formatMoney(money) {
    if (money === null)
        return "";
    else
        return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}

/**
 * Kiểm tra giá trị null
 * @param {any} item
 * created by ngochtb(12/11/2020)
 */

function checkNull(item) {
    if (item === null)
        return "";
    else
        return item;
}
