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
        $('btnClose').click(function () {
            dialogDetail.dialog('close');
        })
        // sự kiện thêm mới khách hàng khi nhấn buttton [Lưu]
        $('#btnSave').click(me.btnSaveOnClick.bind(me));
        $('table tbody').on('click', 'tr', this.btnClickSelectRow);
        $('#btnDelete').on('click', me.DeleteRowTable.bind(me));
        // hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi
        $('table tbody').on('dblclick', 'tr', function () {
            //$(this).find('td').addClass('row-selected');
            //var api = selects.attr("api");
            // load form:
            // load dữ liệu cho các combobox:
            var selects = $('select[fieldName]');
            selects.empty();
            $.each(selects, function (index, select) {
                // lấy dữ liệu nhóm khách hàng:
                var api = $(select).attr('api');
                var fieldName = $(select).attr('fieldName');
                var fieldValue = $(select).attr('fieldValue');
                $('.loading').show();
                $.ajax({
                    url: me.host + api,
                    method: "GET",
                    async: true
                }).done(function (res) {
                    if (res) {
                        console.log(res);
                        $.each(res, function (index, obj) {
                            var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                            console.log(select);
                            $(select).append(option);
                            console.log(option);
                        })
                    }
                    $('.loading').hide();
                }).fail(function (res) {
                    $('.loading').hide();
                })
            })

            me.FormMode = 'Edit';
            //var tr  = $('table tbo')
            // Lấy khóa chính của bản ghi:
            var recordId = $(this).data('recordId');
            me.recordId = recordId;
            //console.log(recordId);
            // Gọi service lấy thông tin chi tiết qua Id:
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET",

            }).done(function (res) {
                // Binding dữ liệu lên form chi tiết:
                //console.log(res);

                // Lấy tất cả các control nhập liệu:
                var inputs = $('input[fieldName], select[fieldName]');

                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldName');
                    var value = res[propertyName];

                    // Đối với dropdowlist (select option):
                    if (this.tagName == "SELECT") {
                        var propValueName = $(this).attr('fieldValue');
                        value = res[propValueName];
                        debugger;
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
        })
        //chọn click vào tr của bảng
        $('tr').click(me.btnClickSelectRow);
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
     * Hàm chọn 1 row trong table
     * createdby: dvquang (20/11/2020)
     * */
    btnClickSelectRow() {
        $(this).siblings().removeClass('row-select');
        $(this).addClass('row-select');
        var select = $('table .row-select');
        var id = select.data('recordId');

    }
    /**
     * Hàm xóa 1 row đã được select trong table
     * createdby: dvquang (20/11/2020)
     * */
    DeleteRowTable() {
        var me = this;
        var select = $('table .row-select');
        var id = select.data('recordId');
        //var link = me.host + me.apiRouter + `/${id}`;
        //console.log(me.apiRouter);
        //console.log(this.apiRouter);
        //console.log(link);
        $.ajax({
            url: me.host + me.apiRouter + `/${id}`,
            method: 'DELETE',
            contentType: "application/json",
        }).done(function (res) {
            alert('xoa thanh cong!');
            me.loadData();
        }).fail(function (res) {
            alert('xoa khong thanh cong');
        })
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
                    console.log(res);
                    $.each(res, function (index, obj) {
                        var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                        select.append(option);
                        console.log(option);
                    })
                }
                $('.loading').hide();
            }).fail(function (res) {
                $('.loading').hide();
            })
        } catch (e) {
            console.log(e);
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
            //showSuccessMessenger();
            alert('them khach hang thanh cong!')
            dialogDetail.dialog('close');
            me.loadData();
            debugger
        }).fail(function (res) {
            debugger
        })

    }
}

