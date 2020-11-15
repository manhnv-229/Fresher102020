
/**
 * Định dạng date về dạng ngày/tháng/năm
 * @param {Date} date
 * CreatedBy: NamPV (12/11/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    day = day < 10 ? `0` + day : day;
    month = month < 10 ? `0` + month : month;
    return day + `/` + month + `/` + year;
}

/**
 * Định dạng hiển thị tiền tệ
 * @param {Number} money
 * CreatedBy: NamPV (12/11/2020)
 */
function formatMoney(money) {
    if (money) {
        return money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
}

/**
 * Ẩn hiện dialog
 * CreatedBy: NVManh (13/11/2020)
 */
dialogDetail = $(".dialog-modal").dialog({
    autoOpen: false,
    fluid: true,
    minWidth: 700,
    resizable: true,
    position: ({ my: "center", at: "center", of: window }),
    modal: true,
});