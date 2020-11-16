$(document).ready(function () {
    new EmployeeJS();
    $('a.logup-window').click(function () {
        //lấy giá trị thuộc tính href - chính là phần tử "#logup-box"
        var logupBox = $(this).attr('href');

        //cho hiện hộp đăng nhập trong 300ms
        $(logupBox).fadeIn(300);

        // thêm phần tử id="over" vào sau body
        $('body').append('<div id="over">');
        $('#over').fadeIn(300);

        return false;
    });

    // khi click đóng hộp thoại
    $(document).on('click', "a.close, #over, #btnCancel", function () {
        $('#over, .logup').fadeOut(300, function () {
            $('#over').remove();
        });
        return false;
    });
})

class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }
    setDataUrl() {
        this.dataUrl = 'http://api.manhnv.net/api/employees';
    }
}


/**
 * Hàm load dữ liệu có phân trang
 * @param {number} pageIndex chỉ số trang
 * @param {number} totalRecord số bản ghi/trang
 * Author: TVHa (10/11/2020)
 * Editor: Temp (DD/MM/YYYY) - Sửa lỗi...
 */
function loadPaging(pageIndex, totalRecord) {

}