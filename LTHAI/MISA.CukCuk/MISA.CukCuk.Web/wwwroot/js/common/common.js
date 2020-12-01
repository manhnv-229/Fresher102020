/**
 * Định dạng ngày tháng theo chuẩn ngày/tháng/năm
 * @param {any} date dữ liệu thời gian 
 * CreatedBy: LTHAI (11/11/2020)
 * EditBy: LTHAI(12/11/2020) : Kiểm tra dữ liệu đầu vào 
 * nếu là string, NaN thì trả về giá trị rỗng
 */
function formatDateOfBirth(date) {
    date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        let day = date.getDate()
        day = day < 10 ? ("0" + day) : day;
        let month = date.getMonth() + 1;
        month = month < 10 ? ("0" + month) : month;
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
}
/**
 * Định dạng năm-tháng-ngày
 * @param {any} date Dữ liệu có dạng datetime
 * CreatedBy: LTHAI (19/11/2020)
 */
function formatDateOfBirthyyyyMMdd(date) {
    date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        let day = date.getDate()
        day = day < 10 ? ("0" + day) : day;
        let month = date.getMonth() + 1;
        month = month < 10 ? ("0" + month) : month;
        let year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
}
/**
 * Định dạng tiền (dạng 2500 => 2.500)
 * @param {any} money dữ liệu số tiền
 *  CreatedBy: LTHAI (11/11/2020)
 */
function formatMoney(money) {
    if (money == null || typeof (money) == "string" || Number.isNaN(money)) {
        return "";
    } else {
        return money.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, '$1.');
    }
}
/**
 * Làm mới lại trang dialog
 * CreatedBy: LTHAI (15/11/2020)
 * EditedBy: LTHAI(20/11/2020)
 * Làm mới thêm trường hợp radio button
 * */
function RefreshDialog() {
    let inputs = $('#d-dialog input,#d-dialog select');
    $.each(inputs, function (index, input) {
        $(input).val('');
        $(input).removeAttr('validated');
        $(input).removeClass("border-red");
        if ($(input).attr('type') == "radio") {
             $(input).prop("checked", false);
        }
    })
    $('#d-dialog').css("display", "none");
}


/**
* Đưa ra cảnh báo cho những sự kiện cần xác nhận
* @param {any} title Thông tin tiêu đề
* @param {any} body Nội dung của cảnh báo
* CreatedBy: LTHAI(19/11/2020)
*/
function ShowPopUp(title, body) {
    $('.pop-up-title').text(title);
    $('.pop-up-inf').text(body);
    $('.p-pop-up').css('display', 'block');
}

/**
* Kiểm tra các trường bắt buộc
* @param {any} self đại diện cho đối tượng input
* CreatedBy: LTHAI(15/11/2020)
* */
function EventsValidateRequiredWhenInputBlur(self) {
    let value = $(self).val();
    if (!value) {
        $(self).addClass("border-red");
        $(self).attr('title', `${$(self).attr('name')} không được để trống`)
        $(self).attr("validated", false);
    } else {
        $(self).removeClass("border-red");
        $(self).attr("validated", true);
    }
}
