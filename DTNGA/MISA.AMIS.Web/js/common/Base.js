
class BaseJS {
    constructor() {
        this.getUrl();

        this.loadData();
    }
    /** Lấy thông tin url */
    getUrl() {
        return "";
    }
    /**Hàm load dữ liệu cho table
     * created by dtnga (12/11/2020)
     * */
    loadData() {
        var me = this;
        var getUrl = me.getUrl();
        //Lấy th từ html
        var ths = $('table tr th');
        $.ajax({
            url: getUrl,
            method: "GET"
        }).done(function (res) {
            var data = res;
            $.each(data, function (index, obj) {
                var tr = $('<tr></tr>');
                $.each(ths, function (index, th) {
                    var td = $('<td><div><span></span></div></td>');
                    // Lấy fielname th
                    var fieldName = $(th).attr('fieldName');
                    //Lấy giá trị của thuộc tính tương ứng với fieldName trong obj
                    var value = obj[fieldName];
                    // định dạng lại
                    var formatType = $(th).attr('formatType');
                    switch (formatType) {
                        case "Money":
                            value = formatMoney(value);
                            td.addClass("text-align-right");
                            break;
                        case "ddmmyy":
                            value = formatDate(value);
                            td.addClass("text-align-center");
                            break;
                        default:
                            break;
                    }
                    // gán vào td -> tr
                    td.append(value);
                    tr.append(td);
                })
                $('table#tbListEmployee tbody').append(tr);
            })
        }).fail(function (res) {
            alert("fail roi :<");
        })
    }

}