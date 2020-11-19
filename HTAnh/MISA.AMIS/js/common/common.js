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
function formatDateHigh(date) {
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
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
    $('input[required],input[type="email"]').removeClass('warning');
    $('input[required],input[type="email"]').attr("validate", true);
}

/**
 * Hàm hiện dialog thêm dữ liệu
 * Created by: HTANH
 * */
function addDialog() {
    var host = this.host;
    $('.m-dialog').removeClass('hide');
    $('input').val(null);
    var select = $('select#cbxCustomerGroup');
    select.empty();
    $('.loading').show();
    $.ajax({
        url: host+"/api/customergroups",
        method: "GET"
    }).done(function (res) {
        if (res) {
            $.each(res, function (index, object) {
                var option = $(`<option field="CustomerGroupId" name="CustomerGroup" value="${object.CustomerGroupId}">${object.CustomerGroupName}</option>`);
                select.append(option);
            })
        }  
        $('.loading').hide();
    }).fail(function (res) {
        $('.loading').hide();
    })
}





/**
 * Hiển thị dialog sửa thông tin khách hàng
 * */
//function editData(arrow) {
//    addDialog();
//    var host = arrow.host;
//    var apiRouter = arrow.apiRouter;

//    var recordId = $(this).attr('recordId');
//    var url = host + apiRouter + `/${recordId}`;
//    console.log(url);
//    // Goị service lấy thông tin chi tiết qua id
//    $.ajax({
//        url: ,
//        method: "GET"
//    }).done(function (res) {
//        console.log(res);
//    }).fail(function (res) {

//    })
//}


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