/**
 * class quan li cac su kien chung cho EmployessJS, CustomerJS
 * createdby: dvquang(12/11/2020)
 * */
class BaseJS {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.initEvents();
        this.loadData();
    }

    /**
     * set url cho EmployeeJS, CustomerJS
     * createdby: dvquang(13/11/2020)
     * */
    setApiRouter() {

    }

    /**
     * xử lí sự kiện cho form thêm khách hàng
     * createdby: dvquang(14/11/2020)
     * */
    initEvents() {
        var me = this;
        // sự kiện click thêm khach hàng mới
        $('#btnAdd').click(me.btnAddOnClick.bind(me));

        // sự kiện load lại dữ liệu sau khi nhấn load
        $('#btnRefresh').click(function () {
            alert('load xong!');
            me.loadData();
        })

        // sự kiện ẩn form thêm khách hàng khi nhấn Hủy
        $('#btnClose').click(function () {
            dialogDetail.dialog('close');
        })
        // sự kiện thêm mới khách hàng khi nhấn buttton [Lưu]
        $('#btnSave').click(me.btnSaveOnClick.bind(me));

        // sự kiện cho button click vào 1 row trong table
        $('table tbody').on('click', 'tr', this.btnClickSelectRow);

        // sự kiện gọi đến dialog xác nhận xóa 1 bản ghi
        $('#btnDelete').on('click', me.btnDeleteShowConfirm.bind(me));

        // sự kiện xác nhận xóa 1 bản ghi thông qua dialog xác nhận xóa bản ghi
        $('#btnDeleteConfirm').on('click', me.btnDeleteRowTable.bind(me));

        // hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi
        $('table tbody').on('dblclick', 'tr', this.btnDoubleClickRowTable.bind(this));


        /*
         *validate bắt buộc nhập
         * createdby: dvquang(14/11/2020)
         */
        $('input[required]').blur(function () {
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }

        })

        /*
        *validate email
        * createdby: dvquang(14/11/2020)
        */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng.');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })
    }

    /**
     * Hàm sửa dữ liệu khách hàng khi bấm double click vào bản ghi trong table
     * createdby: dvquang(20/11/2020)
     * */
    btnDoubleClickRowTable() {
        try {
            var me = this;
            // load dữ liệu cho các combobox:
            var selects = $('select[fieldName]');
            selects.empty();
            $.each(selects, function (index, select) {
                // lấy dữ liệu nhóm khách hàng:
                var api = $(select).attr('api');
                var fieldName = $(select).attr('fieldName');
                var fieldValue = $(select).attr('fieldValue');
                $('.loading').show();
                //console.log(api);
                $.ajax({
                    url: me.host + api,
                    method: "GET",

                }).done(function (res) {
                    if (res) {
                        //console.log(res);
                        //console.log(me.host);
                        $.each(res, function (index, obj) {
                            var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                            //console.log(select);
                            $(select).append(option);
                            //console.log(option);
                        })
                    }
                    $('.loading').hide();
                }).fail(function (res) {
                    $('.loading').hide();
                })
            })

            me.FormMode = 'Edit';
            var tr = $("table tbody tr.row-select");

            // Lấy khóa chính của bản ghi:
            var recordId = tr.data('recordId');

            me.recordId = recordId;
            console.log(recordId);

            // Gọi service lấy thông tin chi tiết qua Id:

            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET",

            }).done(function (res) {
                // Binding dữ liệu lên form chi tiết:

                // Lấy tất cả các control nhập liệu:
                var inputs = $('input[fieldName], select[fieldName]');

                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldName');
                    var value = res[propertyName];

                    // Đối với dropdowlist (select option):
                    if (this.tagName == "SELECT") {
                        var propValueName = $(this).attr('fieldValue');
                        value = res[propValueName];

                    }
                    if ($(this).attr('type') == "date") {
                        var date = formatDateDoubleClick(value);

                        $(this).val(date);

                    }
                    // Đối với các input là radio:
                    else if ($(this).attr('type') == "radio") {
                        var inputValue = this.value;

                        if (value == inputValue) {
                            this.checked = true;
                        } else {
                            this.checked = false;
                        }
                    } else {
                        $(this).val(value);
                    }

                })
            }).fail(function (res) {

            })
            dialogDetail.dialog('open');
        }
        catch (e) {
        }
    }

    /**
     * Hàm chọn 1 row trong table
     * createdby: dvquang (20/11/2020)
     * */
    btnClickSelectRow() {
        try {
            $(this).siblings().removeClass('row-select');
            $(this).addClass('row-select');

        } catch (e) {
        }
    }

    /**
     * Hàm gọi ra dialog xác nhận xóa 1 bản ghi
     * createdby: dvquang (20/11/2020)
     * */
    btnDeleteShowConfirm() {
        try {

            
            dialogConfirmDelete.dialog('open');
        } catch (e) {

        }

    }
    /**
     * Hàm xác nhận xóa 1 bản ghi
     * createdby: dvquang(23/11/2020)
     * */
    btnDeleteRowTable() {
        try {
            
            var me = this;
            var tr = $("table tbody tr.row-select");

            // Lấy khóa chính của bản ghi:
            var recordId = tr.data('recordId');

            console.log(recordId);
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: 'delete',
                contenttype: "application/json",
            }).done(function (res) {
                // đóng dialog xác nhận xóa và load lại dữ liệu
                dialogConfirmDelete.dialog('close');
                me.loadData();
                
            }).fail(function (res) {
                
            })
        } catch (e) {

        }
    }

    /**
     * load dữ liệu
     * createdby: dvquang(12/11/2020)
     * */
    loadData() {
        var me = this;
        try {
            $('table tbody').empty();
            // lấy thông tin các cột dữ liệu
            var columns = $('table thead th');
            //lấy thông tin dữ liệu tương ứng với các cột
            //$('.loading').show();
            $.ajax({
                url: me.host + me.apiRouter,
                method: 'GET',
                async: true,
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    tr.data("recordId", obj["CustomerId"]);
                    $.each(columns, function (index, th) {

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
                            case "locate":
                                td.addClass("text-address");
                                $(".text-address").attr("title", value);
                            default:

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

        }

    }

    /**
     * Hàm sử lí khi nhấn button thêm khách hàng
     * createdby: dvquang(18/11/2020)
     * */
    btnAddOnClick() {
        try {
            var me = this;
            me.FormMode = 'Add';
            // Hiển thị dialog thông tin chi tiết:
            dialogDetail.dialog('open');
            $('input').val(null);
            // load dữ liệu cho các combobox:
            var select = $('select#cbxCustomerGroup');
            select.empty();
            // lấy dữ liệu nhóm khách hàng:
            $('.loading').show();
            $.ajax({
                url: me.host + "/api/customergroups",
                method: "GET"
            }).done(function (res) {
                if (res) {
                    //console.log(res);
                    $.each(res, function (index, obj) {
                        var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                        select.append(option);
                        //console.log(option);
                    })
                }
                $('.loading').hide();
            }).fail(function (res) {
                $('.loading').hide();
            })
        } catch (e) {
            //console.log(e);
        }
    }

    /**
     * Hàm sử lí khi nhấn button [LƯU] khách hàng mới
     * createdby: quangdv (18/11/2020)
     * */
    btnSaveOnClick() {
        var me = this;
        // validate dữ liệu:
        var inputVaidates = $('input[required], input[type="email"]');
        $.each(inputVaidates, function (index, input) {
            $(input).trigger('blur');
        })
        var inputNotValids = $('input[validate="false"]');
        if (inputNotValids && inputNotValids.length > 0) {
            alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.");
            inputNotValids[0].focus();
            return;
        }
        // thu thập thông tin dữ liệu được nhập -> build thành object:
        // Lấy tất cả các control nhập liệu:
        var inputs = $('input[fieldName], select[fieldName]');
        var entity = {};
        $.each(inputs, function (index, input) {
            var propertyName = $(this).attr('fieldName');
            var value = $(this).val();

            // Check với trường hợp input là radio, thì chỉ lấy value của input có attribute là checked:
            if ($(this).attr('type') == "radio") {
                if (this.checked) {
                    entity[propertyName] = value;
                }
            } else {
                entity[propertyName] = value;
            }

            if (this.tagName == "SELECT") {
                var propertyName = $(this).attr('fieldValue');
                entity[propertyName] = value;
            }
        })
        var method = "POST";
        if (me.FormMode == 'Edit') {
            method = "PUT";
            entity.CustomerId = me.recordId;
        }
        // Gọi service tương ứng thực hiện lưu dữ liệu:
        $.ajax({
            url: me.host + me.apiRouter,
            method: method,
            data: JSON.stringify(entity),
            contentType: 'application/json'
        }).done(function (res) {
            // Sau khi lưu thành công thì: 
            // + đưa ra thông báo thành công, 
            // + ẩn form chi tiết, 
            // + load lại lại dữ liệu

            //alert('them khach hang thanh cong!')
            dialogDetail.dialog('close');
            me.loadData();

        }).fail(function (res) {

        })

    }
}

