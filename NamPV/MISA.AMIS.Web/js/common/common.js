
/**
 * Định dạng date về dạng ngày/tháng/năm
 * @param {Date} date
 * CreatedBy: NamPV (12/11/2020)
 */
function formatDate(date) {
    try {
        var date = new Date(date);
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? `0` + day : day;
        month = month < 10 ? `0` + month : month;
        return day + `/` + month + `/` + year;
    } catch (e) {

    }
}

/**
 * Định dạng hiển thị tiền tệ
 * @param {Number} money
 * CreatedBy: NamPV (12/11/2020)
 */
function formatMoney(money) {
    try {
        if (money) {
            return money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }
    } catch (e) {

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
    title: `Thông tin khách hàng`
});

/**
 * Chuyển đổi string về ngày tháng
 * @param {string} string
 * CreatedBy: NamPV (16/11/2020)
 */
function formatDateReg(date) {
    var arr = formatDate(date).split(`/`);
    return arr[2] + '-' + arr[1] + '-' + arr[0];
}

// Khai báo dialog xác nhận xoá bản ghi
dialogConfirm = $(`.popup-alert`).dialog({
    title: `Xác nhận xoá`,
    autoOpen: false,
    modal: true,
    open: function () {
        $('.FullName').text($(`.row-selected td[id="FullName"]`).html());
        $(`.CustomerCode`).text($(`.row-selected td[id="CustomerCode"]`).html());
    }
})

/**
 * Hiển thị popup thông báo
 * @param {any} msg
 * CreatedBy: NamPV (19/11/2020)
 */
function showPopupNotification(msg) {
    $(`#popup-notification`).text(msg).show(1000).delay(2000).hide(1000);
}