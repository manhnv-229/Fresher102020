$(document).ready(function () {
})

var validateData = {
    /**
     * hàm validate dữ liệu bắt buộc nhập
     * @param {input} input đầu vào là input
     * CreateBy: HNANH (17/11/2020)
     */
    validateRequired: function (input) {
      //  debugger
        var value = $(input).val().trim();
        if (!value) {
            $(input).addClass("border-red");
            $(input).attr("title", "Không được bỏ trống");
            return false;
        }     
        else {
            $(input).removeClass("border-red");
            $(input).removeAttr("title");
            return true;
        }
    },

    /**
     * Hàm validate email
     * @param {any} input  tham số đầu vào là input có type: email
     * CreateBy: HNANH (17/11/2020)
     */
    validateEmail: function (input) {

    },
    /**
     * Hàm validate ngày tháng năm
     * @param {Date} date  tham số đầu vào dạng date
     * CreateBy: HNANH (17/11/2020)
     */
    validateFormatData: function (date) {

    }
}