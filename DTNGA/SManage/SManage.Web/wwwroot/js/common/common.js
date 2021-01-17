
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
        return 0;
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
        $(`table`).find(`th`).on("click", function () {
            var th = $(this);
            var order = th.attr("order");
            // nếu chưa có thì gán mặc định là ASC (tăng dần)
            if (typeof order == typeof undefined)
                order = "asc";
            var tbody = th.closest(`table`).find(`tbody`);
            // sort
            $(tbody).find(`tr`).sort(function (a, b) {
                var col = $(th).index();
                var valueType = th.attr("formatType");
                var valueA= $(a).children('td').eq(col).text().toUpperCase();
                var valueB= $(b).children('td').eq(col).text().toUpperCase();
                if (typeof valueType !== typeof undefined) {
                    switch (valueType) {
                        case "money":
                            valueA = valueA.replaceAll('.', '');
                            valueB = valueB.replaceAll('.', '');
                            break;
                        case "hh:mm dd/mm/yyyy":
                            valueA = new Date(valueA);
                            valueB = new Date(valueB);
                            break;
                    }
                }
                if (order == 'asc') {
                    return valueA.localeCompare(valueB);
                }
                else {
                    return valueB.localeCompare(valueA);
                }
            }).appendTo(tbody);
            // đảo lại order
            if (order == "asc") th.attr("order", "desc");
            if (order == "desc") th.attr("order", "asc");

        });
    }
}