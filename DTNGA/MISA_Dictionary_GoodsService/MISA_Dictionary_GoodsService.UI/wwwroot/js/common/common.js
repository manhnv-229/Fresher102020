
/**
 * Hàm xử lý định dạng ngày
 * @param {any} date Bất kì kiểu dữ liệu nào
 * @param {string} format định dạng ngày muốn format, vd "dd/mm/yyyy"
 * Creared by dtnga (11/11/2020)
 * ModifiedBy dtnga (19/11/2020)
 */
function formatDate(date, format) {
    if (Date.isNaN)
        return ""
    else {

        var date = new Date(Date.parse(date));
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        var hour = ("0" + date.getHours()).slice(-2);
        var minute = ("0" + date.getMinutes()).slice(-2);
        if (format.trim() == "dd/mm/yyyy")
            return day + "/" + month + "/" + year;
        else if (format.trim() == "yyyy-mm-dd")
            return hour + ":" + minute + " " + year + "-" + month + "-" + day;
        else if (format.trim() == "hh:mm dd/mm/yyyy")
            return hour + ":" + minute + " " + day + "/" + month + "/" + year;
    }
}


/**
 * Hàm xử lý dữ liệu tiền tệ, có chứa đơn vị tiền tệ
 * @param {int} money Số tiền
 *
 * Created by dtnga (13/11/2020)
 */
function formatMoney(money) {
    const formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    })
    if (money)
        return parseInt(formatter.format(money));
    else
        return 0;
}
/**
 * Hàm xử lý dữ liệu tiền tệ, không chứa đơn vị tiền tệ
 * @param {int} money Số tiền
 * Created by dtnga (13/11/2020)
 */
function formatMoney(money) {
    if (money)
        return money.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    else
        return "";
}

/**
 * Thực hiện chuyển đổi string sang số int
 * CreatedBy dtnga (01/12/2020)
 * @param {string} value
 */
function convertInt(value){
    return parseInt(value, 10);
}

/**
 * sắp sếp
 * CreatedBy:DvQuan(24/12/2020)
 * */
var sort = {
    sortOder() {
        $(`table`).find('th').each(function (col) {
            //remove class
            $('.repeatgridtop').removeClass('sorttop');
            $('.repeatgridbutoom').removeClass('sortbutton');
            $(this).hover(
                function () {
                    $(this).addClass('focus');
                },
                function () {
                    $(this).removeClass('focus');
                }
            );
            $(this).click(function () {
                debugger
                //remove class
                $('.repeatgridtop').removeClass('sorttop');
                $('.repeatgridbutoom').removeClass('sortbutton');
                //tăng
                if ($(this).is('.asc')) {
                    $('.repeatgridtop').removeClass('sorttop');
                    $('.repeatgridbutoom').removeClass('sortbutton');
                    //remove class
                    $(this).removeClass('asc');
                    //add class
                    $(this).addClass('desc selected');
                    $(this).find('.repeatgridbutoom').addClass('sortbutton');
                    sortOrder = -1;
                    //giảm
                } else {
                    //remove class
                    $('.repeatgridtop').removeClass('sorttop');
                    $('.repeatgridbutoom').removeClass('sortbutton');
                    //remove class desc
                    $(this).removeClass('desc');
                    //add class asc
                    $(this).addClass('asc selected');
                    $(this).find('.repeatgridtop').addClass('sorttop');
                    sortOrder = 1;
                }
                //remove class
                $(this).siblings().removeClass('asc selected');
                $(this).siblings().removeClass('desc selected');
                var arrData = $(this).closest('table').find('tbody >tr:has(td)').get();
                arrData.sort(function (a, b) {
                    var val1 = $(a).children('td').eq(col).text().toUpperCase();
                    var val2 = $(b).children('td').eq(col).text().toUpperCase();
                    if ($.isNumeric(val1) && $.isNumeric(val2))
                        return sortOrder == 1 ? val1 - val2 : val2 - val1;
                    else
                        return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
                });
                $.each(arrData, function (index, row) {
                    $('tbody').append(row);
                });
            });
        });
    }
}