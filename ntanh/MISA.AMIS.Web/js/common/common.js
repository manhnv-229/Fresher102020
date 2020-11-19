/**--------------------------------------------------
 * Fortmat dữ liệu ngày tháng năm sang ngày/tháng/năm
 * @param {any} date có kiểu dữ liệu bất kỳ
 * @param {string} type có kiểu dữ liệu string
 * CreatedBy: NTANH (12/11/2020)
 */

function formatDate(date, type) {
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
        switch (type) {
            case "table":
                var DOB = day + '/' + month + '/' + year;
                break;
            case "dialog":
                var DOB = year + '-' + month + '-' + day;
                break;
            default:
                var DOB = "";
        }
        return DOB;
    }
}
/**------------------------------
 * Hàm định dạng hiển thị tiền tệ
 * @param {Number} money Số tiền
 * CreatedBy: NTANH (12/11/2020)
 */
function formatMoney(money) {
    if (money) {
        return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return "";
}
/**
 * Hàm định dạng hiển thị giới tính
 * @param {number} genderId
 * CreatedBy: NTANH (19/11/2020)
 */
function formatGender(genderId) {
    if (genderId == 0) {
        return "Nữ";
    }
    else if (genderId == 1) {
        return "Nam"
    }
    else return "Không xác định";
}
