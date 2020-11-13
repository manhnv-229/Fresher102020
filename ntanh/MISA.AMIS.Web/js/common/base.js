/**
 *  Class Dùng chung
 *  CreatedBy: NTANH (12/11/2020)
 * */

class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
    }
    /**
     *  Lấy url api 
     *  CreatedBy: NTANH (13/11/2020)
     * */
    setDataUrl() {

    }
    /**
     * Load dữ liệu 
     * CreatedBy: NTANH (12/11/2020)
     * */
    loadData() {
        try {
            //  Lấy thông tin các cột dữ liệu
            var columns = $("table thead th");
            var getDataUrl = this.getDataUrl;
            // Lấy thông tin dữ liệu sẽ map tương ứng với th
            //$.each(ths, function (index, item) {

            //})
            //Lấy dữ liệu về
            $.ajax({
                url: getDataUrl,
                method: "GET",
                async: false
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $.each(columns, function (index, th) {
                        var td = $(`<td></td>`);
                        var div = $(`<div></div>`);
                        var span = $(`<span></span>`);
                        var fieldName = $(th).attr('fieldname');
                        var formatType = $(th).attr('formatType');
                        var value = obj[fieldName];

                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            default:
                        }
                        span.append(value);
                        div.append(span);
                        td.append(div);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })
            }).fail(function (res) {

            })
        //binding dữ liệu
        } catch (e) {
            //Ghi log lỗi: 
            console.log(e);
        }
    }

    /**
     * Thêm mới dữ liệu
     * CreatedBy: NTA (12/11/2020)
     * */
    add() {
        
    }

    /**
     * Chỉnh sửa dữ liệu
     * CreatedBy: NTANH (12/11/2020)
     * */
    edit() {

    }

    /**
     * Xóa dữ liệu
     * CreatedBy: NTANH (12/11/2020)
     * */
    delete() {

    }
}