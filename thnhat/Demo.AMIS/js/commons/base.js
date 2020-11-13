class BaseJs {
    constructor() {
        this.getUrl = null;
        this.setUrl();
        this.dataLoad();
    }
    setUrl() {

    }

    /**-----------------------------
    * Load dữ liệu
    * CreateBy: THNhat (12/11/2020)
    * */
    dataLoad() {
        // Lấy thông tin các cột dữ liệu:
        var columns = $('table thead th');
        $.ajax({
            url: this.getUrl,
            method: 'GET'
        }).done(function (res) {
            // Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
            $.each(res, function (index, obj) {
                var tr = $(`<tr></tr>`);
                $.each(columns, function (index, item) {
                    var td = $(`<td><div><span></span></div></td>`);
                    var fieldName = $(item).attr('fieldname');
                    var value = obj[fieldName];
                    var formatType = $(item).attr('formatType');
                    switch (formatType) {
                        case "ddmmyyyy":
                            value = formatDate(value);
                            break;
                        case "money":
                            td.find('div').addClass("text-align-right");
                            value = formatMoney(value);
                            break;
                        case "checkbox":
                            if (value > 0) {
                                value = `<input type="checkbox" checked>`;
                            } else {
                                value = `<input type="checkbox">`;
                            }
                            td.find('div').addClass("text-align-center");
                        default:
                            break;
                    }
                    td.find('span').append(value);
                    tr.append(td);
                })
                $('table tbody').append(tr);
            })
        }).fail(function (res) {

        })
    }
}