/**
 * Hàm format dữ liệu ngày tháng -> ngày/tháng/năm
 * @param {any} date 
 *Created by: HTAnh
 */
function formatDate(date) {
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

/**
 * hàm định dạng tiền tệ
 * Created by: HTAnh
 */
function formatMoney(money) {
    if (money) return num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1.");
    return "";
}

/**
 * Hàm ẩn dialog thêm dữ liệu
 * Created by: HTANH
 * */
function hideDialog() {
    $('.m-dialog').addClass('hide');
}

/**
 * Hàm hiện dialog thêm dữ liệu
 * Created by: HTANH
 * */
function addDialog() {
    $('.m-dialog').removeClass('hide');
}


function refreshData() {
    this.loadData();
    alert('da load thanh cong');
}

/**
 * Hàm validate định dạng của trường email của dialog
 * */
function validateEmail() {
    var value = $(this).val();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (!testEmail.test(value)) {
        $(this).addClass('warning');
        $(this).attr('title', 'Email không đúng định dạng.');
        $(this).attr("validate", false);
    } else {
        $(this).removeClass('warning');
        $(this).attr("validate", true);
    }
}

/**
 * Hàm validate trường không bị bỏ trống
 * */
function validateEmpty() {
    var value = $(this).val();
    if (!value) {
        $(this).addClass('warning');
        $(this).attr('title', 'Trường này không được phép để trống');
        $(this).attr("validate", false);
    } else {
        $(this).removeClass('warning');
        $(this).attr("validate", true);
    }
}