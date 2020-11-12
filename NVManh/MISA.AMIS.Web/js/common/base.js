


class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
    }

   
    setDataUrl() {

    }

    /** -----------------------------
     * Load dữ liệu
     * CreatedBy: NVMANH (11/11/2020)
     * */
    loadData() {
        try {
            // Lấy thông tin các cột dữ liệu:
            var columns = $('table thead th');
            var getDataUrl = this.getDataUrl;
            $.ajax({
                url: getDataUrl,
                method: "GET",
                async: false,
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    debugger;
                    var tr = $(`<tr></tr>`);
                    // Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
                    $.each(columns, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldname');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "Money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            default:
                                break;
                        }

                        td.append(value);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })
            }).fail(function (res) {

            })
        } catch (e) {
            console.log(e);
        }
    }
}