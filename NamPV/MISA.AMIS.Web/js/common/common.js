
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
dialogConfirm = $(`.confirm-delete-dialog`).dialog({
    title: `Xác nhận xoá`,
    autoOpen: false,
    modal: true
})

// Khái báo popup thông báo thành công
popupSuccess = $(`#popup-success`).dialog({
    title: `Thành công`,
    position: {
        my: "left top", at: "left bottom"
    },
    autoOpen: false,
    beforeClose: function () {
        return closeable;
    },
    open: function () {
        var counter = 5;
        var intID = setInterval(function () {
            counter--;
            $('.delayTime').text(counter);
            if (counter == 0) {
                clearInterval(intID)
                closeable = true;
                $('#popup-success').dialog("close")
            }
        }, 1000)
    },
    show: { effect: "blind", duration: 800 },
    hide: { effect: "blind", duration: 800 },
})

// Khái báo popup thoogn báo thất bại
popupFail = $(`#popup-fail`).dialog({
    title: `Thất bại`,
    position: {
        my: "left top", at: "left bottom"
    },
    autoOpen: false,
    beforeClose: function () {
        return closeable;
    },
    open: function () {
        var counter = 5;
        var intID = setInterval(function () {
            counter--;
            $('.delayTime').text(counter);
            if (counter == 0) {
                clearInterval(intID)
                closeable = true;
                $('#popup-fail').dialog("close")
            }
        }, 1000)
    },
    show: { effect: "blind", duration: 800 },
    hide: { effect: "blind", duration: 800 },
})