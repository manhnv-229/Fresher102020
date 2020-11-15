class BaseJS {
    /**
     * Hàm khởi tạo
     * 
     * */
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }
    
    /**
     * Hàm set url lấy data;
     * created by: HTANH;
     * */
    setDataUrl() {
    }

    initEvents() {
        /* ------------------------------------
         * Tắt/ẩn dialog
         */
        $('#btnX').click(hideDialog);
        $('#btnCancel').click(hideDialog);

        /* ------------------------------------
         * Hiển thị dialog
         */
        $('#btnAdd').click(addDialog);

        /* ------------------------------------
         * Làm mới dữ liệu trong bảng
         */ 
        $('#btnRefresh').click(refreshData.bind(this));

        /* ------------------------------------
         * Hiển thị dialog khi doubleclicks vào từng dòng trên bảng
         */
        $('table tbody').on('dblclick', 'tr', addDialog);


        /* ------------------------------------
         * Validate nhập dữ liệu:
         */
        $('input[required]').blur(validateEmpty);

        /* ------------------------------------
        * validate email đúng định dạng
        */
        $('input[type="email"]').blur(validateEmail);

        /**
         * Thực hiện kiểm tra và lưu dữ liệu vào database
         */
        $('#btnSave').click(function () {
            var arrow = this;
            var inputVaidates = $('input[required], input[type="email"]');
            $.each(inputVaidates, function (index,input) {
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.");
                inputNotValids[0].focus();
                return;
            }
            /*var a = $('.value-take, .m-dialog input[name="gender"]:checked'); khong dung vi khong co gender */
            var a = $('.value-take');
            var customer = {};
            //Thực hiện truyền data vào object
            $.each(a, function (index, data) {
                var test = $(data).attr('field');
                var value = $(data).val();
                customer[test] = value;
            })
            customer['CustomerGroupId'] = '3631011e-4559-4ad8-b0ad-cb989f2177da';
            console.log(customer);
            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: 'POST',
                data: JSON.stringify(customer),
                contentType: 'application/json'
            }).done(function (res) {
                alert('Dữ liệu đã được thêm thành công!');// đưa ra thông báo
                hideDialog(); // ẩn form điền
                arrow.loadData();// load lại dữ liệu
            }).fail(function (res) {
            })

        }.bind(this))
    }





    /**
     *  Load dữ liệu
     *  create by: HTANH (12/11/2020)
     * */
    loadData() {
        $('table tbody').empty();
        // lấy thông tin các cột dữ liệu
        console.log("test load");
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
                    //debugger;
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