/**
 * Format giới tính nhân viên 
 * @param {Number} pGender : kiểu dữ liệu số
 * Createdby: nttung (11/11/2020)
 */
function fomatGender(pGender) {
    if (pGender == 0) {
        return "Nam";
    } else if (pGender == 1) {
        return "Nữ";
    } else {
        return "Khác";
    }
}
/**
 * Định dạng tiền tệ
 * @param {Number} Salary kiểu số liệu Number
 * Createdby: nttung (11/11/2020)
 */
function fomatMoney(Salary) {
    if (Salary != null) {
        return Salary.toLocaleString({ style: 'currency', currency: 'VND' });
    } else {
        return "";
    }
}
/**
 * Format dữ liệu về dạng ngày/tháng/năm
 * @param {Date} date tham số có kiểu dữ Date
 * Createdby: nttung (11/11/2020)
 */
function fomatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime)) {
        return "";
    } else if (date != null) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    }
}
/*
* validate email đúng định dạng
* CreatedBy:nttung (13/11/2020)
*/
$('input[type="email"]').blur(function () {
    var value = $(this).val();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (!testEmail.test(value)) {
        $(this).addClass('required-error');
        $(this).attr('title', 'Email không đúng định dạng.');
        $(this).attr("validate", false);
    } else {
        $(this).removeClass('required-error');
        $(this).attr("validate", true);
        $(this).removeAttr('title', 'Email không đúng định dạng.');
    }
})
    
