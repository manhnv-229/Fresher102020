class BaseJS {
    /**
     * Hàm khởi tạo
     * 
     * */
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
       
    }
    
    /**
     * Hàm set url lấy data;
     * created by: HTANH;
     * */
    setDataUrl() {

    }


    /**
     *  Load dữ liệu
     *  create by: HTANH (12/11/2020)
     * */
    loadData() {
        // lấy thông tin các cột dữ liệu
        var ths = $('table thead th');
        var getDataUrl = this.getDataUrl;
        $.each(ths, function (index, item) {
            var fieldName = $(item).attr('fieldname')
        })

        $.ajax({
            url: getDataUrl,
            method: "GET",
        }).done(function (res) {
            $.each(res, function (index, obj) {
                var tr = $('<tr></tr>');
                $.each(ths, function (index, th) {
                    var td = $(`<td></td>`);
                    var fieldName = $(th).attr('fieldname');
                    var formatType = $(th).attr('formatType');
                    var value = obj[fieldName];
                    switch (formatType) {
                        case "ddmmyyyy":
                            value = formatDate(value);
                            break;
                        case "money":
                            value = formatMoney(value);
                            break;
                        default:
                            break;
                    }
                    debugger;
                    //var value = null;
                    //if (fieldName == 'DateOfBirth') {
                    //    value = obj[fieldName];

                    //} else {
                    //    
                    //}
                    
                    td.append(value);
                    $(tr).append(td);
                })
                $('table tbody').append(tr);
            })
        }).fail(function (res) {

        })
    }
}