/**
 * class quan li cac su kien chung cho EmployessJS, CustomerJS
 * createdby: dvquang(12/11/2020)
 * */
class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.initEvents();
        this.loadData();
    }

    /**
     * set url cho EmployeeJS, CustomerJS
     * createdby: dvquang(13/11/2020)
     * */
    setDataUrl() {

    }

    initEvents() {
        var me = this;
        // sự kiện click thêm khach hàng mới
        $('#btnAdd').click(function () {
            // hiển thị dialog thông tin
            dialogDetail.dialog('open');
        })

        // sự kiện load lại dữ liệu sau khi thêm
    }

    /**
     * load dữ liệu
     * createdby: dvquang(12/11/2020)
     * */
    loadData() {
        try {
            // lấy thông tin các cột dữ liệu
            var columns = $('table thead th');
            var getDataUrl = this.getDataUrl;
            //lấy thông tin dữ liệu tương ứng với các cột
            $.ajax({
                url: getDataUrl,
                method: 'GET',
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $.each(columns, function (index, th) {
                        debugger;
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldname');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyy":
                                td.addClass('text-align-center');
                                value = formatDate(value);
                                break;
                            case "money":
                                td.addClass('text-align-right');
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
        }
        catch (e) {
            console.log(e);
        }
       
    }
}

