$(document).ready(function () {
    setSizeInputPlaceholder();
})

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

commonJS = {
    /**
     * Ẩn hiện dialog
     * CreatedBy: NVManh (13/11/2020)
     */
    dialogDetail: $(".dialog-modal").dialog({
        autoOpen: false,
        fluid: true,
        minWidth: 700,
        resizable: true,
        position: ({
            my: "center",
            at: "center",
            of: window
        }),
        modal: true,
        title: `Thông tin khách hàng`
    }),
    /**
     * Khai báo dialog xác nhận xoá bản ghi
     * CreatedBy: NamPV (16/11/2020)
     */
    dialogConfirm: $(`.customer-delete`).dialog({
        title: `Xác nhận xoá`,
        autoOpen: false,
        modal: true,
        open: function () {
            $('.FullName').text($(`.row-selected td[id="FullName"]`).html());
            $(`.CustomerCode`).text($(`.row-selected td[id="CustomerCode"]`).html());
        }
    }),
    /**
     * Khai báo popup thông báo dữ liệu không hợp lệ
     * CreatedBy: NamPV (22/11/2020)
     */
    dialogNotify: $(`.data-invalid`).dialog({
        title: `Thông báo`,
        autoOpen: false,
        modal: true
    })
}

/**
 * Chuyển đổi string về ngày tháng
 * @param {string} string
 * CreatedBy: NamPV (16/11/2020)
 */
function formatDateReg(date) {
    var arr = formatDate(date).split(`/`);
    return arr[2] + '-' + arr[1] + '-' + arr[0];
}

/**
 * Hiển thị popup thông báo
 * @param {any} msg
 * CreatedBy: NamPV (19/11/2020)
 */
function showPopupNotification(msg) {
    $(`#popup-notification`).text(msg).slideDown(1000).delay(2000).slideUp(1000);
}

/**
 *  Set kích thước các input có placholder
 * CreatedBy: NamPV (21/11/2020)
 */
function setSizeInputPlaceholder() {
    $("input[placeholder]").each(function () {
        $(this).attr('size', $(this).attr('placeholder').length);
    })
};