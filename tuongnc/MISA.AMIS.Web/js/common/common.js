/**
 * function định dạng ngày tháng năm -> ngày/tháng/năm
 * @param {any} dateValue
 * CreateBy: TuongNC (11/11/2020)
 */
function formatDate(dateValue) {
    var date = new Date(dateValue);
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))
        + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
        + '/' + date.getFullYear();

}

/**
 * function Định dạng tiền lương
 * @param {number} money là số tiền cần định dạng
 * CreateBy: TuongNC (11/11/2020)
 */
function formatSalary(money) {
    var value = money;
    if (value === null) {
        return 'Không';
    } else {
        return value = value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
}

/**
 * validate định dạng Email
 * @param {string} mail
 * CreatedBy: TuongNC (14/11/2020)
 */
function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}