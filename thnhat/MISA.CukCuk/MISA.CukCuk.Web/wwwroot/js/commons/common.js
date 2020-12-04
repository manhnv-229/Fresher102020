/** -----------------------------------------------
 * Format dữ liệu từ ngày tháng sang ngày/tháng/năm
 * @param {any} date tham số bất kỳ
 * CreatedBy: THNhat (12/11/2020)
 */
function formatDate(date) {
    var date = new Date(date);

    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    return day + '/' + month + '/' + year;
}
function detailFormatDate(date) {
    var date = new Date(date);

    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    return year + '-' + month + '-' + day;
}

/** -----------------------------
 * Hàm định dạng hiển thị tiền tệ
 * @param {Number} money Số tiền
 * CreatedBy: THNhat (12/11/2020)
 */
function formatMoney(money) {
    if (money) return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
function formatCurrency(input, blur) {
    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") { return; }


    input_val = formatNumber(input_val);

    input.val(input_val);
}