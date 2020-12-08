
class BaseJS {
    constructor() {
        this.host = "http://localhost:55758";
        this.apiRouter = null;
        this.objectName = null;
        this.setApiRouter();
        this.initEvents();
        this.loadData();
    }
    /**
     * set url cho các js kế thừa
     * */
    setApiRouter() {

    }

    /**
    * set objectName để gán cho mỗi sự kiện lấy dữ liệu
    * CreatedBy: DVQuang(03/12/2020)
    * */
    setObjectName() {

    }

    initEvents() {
        var me = this;
        // Sự kiện click khi nhấn thêm mới:
        $('#btnAdd').click(me.btnAddOnClick.bind(me));


        // Load lại dữ liệu khi nhấn button nạp:
        $('#btnRefresh').click(function () {
            me.loadData();
        })


        // Ẩn form chi tiết khi nhấn hủy:
        $('#btnClose').click(function () {
            // Hiển thị dialog thông tin chi tiết:
            dialogDetail.dialog('close');
            
        })
        // ẩn form xác nhận xóa lhi bẩm HỦY
        $('#btnCloseDialogDelete').click(function () {
            dialogConfirmDelete.dialog('close');
        })
        // ẩn dialog xác nhận thành công khi bấn OK
        $('#btnCloseDialogSucsess').click(function () {
            dialogSucsess.dialog('close');
        })
        // Thực hiện lưu dữ liệu khi nhấn button [Lưu] trên form chi tiết:
        $('#btnSave').click(me.btnSaveOnClick.bind(me));

        // sự kiện cho button click vào 1 row trong table
        $('table tbody').on('click', 'tr', this.btnClickSelectRow);

        // sự kiện gọi đến dialog xác nhận xóa 1 bản ghi
        $('#btnDelete').on('click', me.btnDeleteShowConfirm.bind(me));

        // sự kiện xác nhận xóa 1 bản ghi thông qua dialog xác nhận xóa bản ghi
        $('#btnDeleteConfirm').on('click', me.btnDeleteRowTable.bind(me));

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi trên danh sách dữ liệu:
        $('table tbody').on('dblclick', 'tr', this.btnDoubleClickRowTable.bind(this));

        // hàm định dạng lại tiền tệ trong input nhập lương
        $('#txtSalary').on('keyup', function () {

            this.value = parseFloat(this.value.replace(/,/g, ""))
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        });
        /* 
         * validate bắt buộc nhập::
         * CreatedBy: DVQuang (13/11/2020)
         */
        $('input[required]').blur(function () {
            // Kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo:
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

        me.valiDateEmail();
    }
    /* ------------------------------------
    * validate email đúng định dạng
    * CreatedBy: DVQuang (13/11/2020)
    */
    valiDateEmail() {

        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng.');
                $(this).attr("validate", false);
                $('.content-sucsess').text('Địa chỉ Email không đúng định dạng');
                $("span.ui-dialog-title").text('CẢNH BÁO');
                dialogSucsess.dialog('open');
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })
    }
    /** -----------------------------
     * Load dữ liệu
     * CreatedBy: DVQuang (11/11/2020)
     * */
    loadData() {
        var me = this;
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu:
            var columns = $('table thead th');

            $('.loading').show();
            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
                async: true,
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr class="el-table__row"></tr>`);
                    if (index == 0) {
                        tr.addClass('first');
                    }
                    $(tr).data('recordId', obj.EmployeeId);
                    //console.log(id);
                    // Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
                    $.each(columns, function (index, th) {
                        var td = $(`<td rowspan="1" colspan="1"><div class="cell"></div></td>`);
                        var fieldName = $(th).attr('fieldName');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyyy":
                                td.find('div').addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            case "locate":
                                td.addClass("text-address");
                                $(".text-address").attr("title", value);
                            default:
                                break;
                        }

                        td.find('div').append(value);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })

                $('.loading').hide();
                $('#tbListData').tableScroll({ height: 150 });

                $('#thetable2').tableScroll();

            }).fail(function (res) {
                $('.loading').hide();
            })
        } catch (e) {
            console.log(e);
        }
    }

    /** 
     * Hàm xử lý khi nhấn button thêm mới
     * Author: DVQuang (17/11/2020)
     * */
    btnAddOnClick() {
        try {
            var me = this;
            me.FormMode = 'Add';
            // Hiển thị dialog thông tin chi tiết:
            dialogDetail.dialog('open');
            $('input').val(null);
            // load dữ liệu cho các combobox:
            var selects = $('select[selectName]');
            //var api = selects.attr("api");
            selects.empty();
            // lấy dữ liệu nhóm :
            $('.loading').show();
            $.each(selects, function (index, select) {
                var api = $(this).attr("api");
                var fieldName = $(this).attr("selectName");
                var fieldValue = $(this).attr("selectValue");
                //lấy dữ liệu nhóm
                $.ajax({
                    url: me.host + api,
                    method: "GET",
                }).done(function (res) {
                    if (res) {
                        $.each(res, function (index, obj) {
                            var option = $(`<option value=` + obj[fieldName] + `>` + obj[fieldValue] + `</option>`)
                            $(select).append(option);
                        })
                    }
                    $(".loading").hide();
                    debugger
                }).fail(function (res) {
                    $(".loading").hide();

                    debugger
                })
            })
        } catch (e) {
            console.log(e);
        }
    }

    /** 
     * Hàm xử lý khi nhấn button Lưu
     * Author: DVQuang (17/11/2020)
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
            if ($(this).attr("typename") == 'money') {
                var money = value;
                $(this).val(money);
            }

            if (this.tagname == "select") {
                var propertyname = $(this).attr('fieldname');
                entity[propertyname] = value;
            }
        })
        var method = "POST";
        var endPoint = "";
        if (me.FormMode == 'Edit') {
            method = "PUT";
            entity.EmployeeId = me.recordId;
            endPoint = me.recordId;
        }
        // Gọi service tương ứng thực hiện lưu dữ liệu:
        $.ajax({
            url: me.host + me.apiRouter + `/${endPoint}`,
            method: method,
            data: JSON.stringify(entity),
            contentType: 'application/json'
        }).done(function (res) {
            // Sau khi lưu thành công thì: 
            // + đưa ra thông báo thành công, 
            // + ẩn form chi tiết, 
            // + load lại lại dữ liệu
            
            dialogDetail.dialog('close');
            $('.content-sucsess').text('Thành công');
            $("span.ui-dialog-title").text('CẢNH BÁO');
            dialogSucsess.dialog('open');
            me.loadData();
            debugger
        }).fail(function (res) {
            //console.log(me.host + me.apiRouter);
            debugger
        })
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


    btnDoubleClickRowTable() {
        try {
            var me = this;
            // load dữ liệu cho các combobox:
            var selects = $('select[selectName]');
            var api = selects.attr("api");
            selects.empty();
            $.each(selects, function (index, select) {
                // lấy dữ liệu nhóm khách hàng:
                var api = $(select).attr('api');
                var fieldName = $(select).attr('selectName');
                var fieldValue = $(select).attr('selectValue');
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
                            var option = $(`<option value="${obj[fieldName]}">${obj[fieldValue]}</option>`);
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

                    //// Đối với dropdowlist (select option):
                    //if (this.tagName == "SELECT") {
                    //    var propValueName = $(this).attr('fieldValue');
                    //    value = res[propValueName];

                    //}
                    if ($(this).attr('type') == "date") {
                        var date = formatDateDoubleClick(value);

                        $(this).val(date);

                    }
                    else if ($(this).attr("typename") == 'money') {
                        var money = formatMoney(value);
                        //var money = value;
                        $(this).val(money);
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
    * Hàm gọi ra dialog xác nhận xóa 1 bản ghi
    * createdby: dvquang (20/11/2020)
    * */
    btnDeleteShowConfirm() {
        //try {


        //    dialogConfirmDelete.dialog('open');
        //} catch (e) {

        //}
        try {
            var me = this;
            var tr = $("table tbody tr.row-select");

            // Lấy khóa chính của bản ghi:
            var recordId = tr.data('recordId');

            me.recordId = recordId;
            
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET",
            }).done(function (res) {
                var employeeName = res["FullName"];
                var employeeCode = res["EmployeeCode"];

                $(".content-delete").text("Bạn có chắc chắn muốn xóa nhân viên "
                    + employeeName + " (Mã nhân viên " + employeeCode + ") không ? ");
                $("span.ui-dialog-title").text('CẢNH BÁO');
                dialogConfirmDelete.dialog("open");
                //$(".m-seconds-button-2").blur();
            }).fail(function () {

            })
        } catch (e) {
            //console.log(e);
        }
    }
    /**
     * Hàm thực hiện chức năng xóa 1 bản ghi
     * CreatedBy: DVQuang (03/12/2020)
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
                showSuccessMessenger();
                dialogConfirmDelete.dialog('close');
                //$('.content-sucsess').text('Thành công');
                //$("span.ui-dialog-title").text('CẢNH BÁO');
                //dialogSucsess.dialog('open');

                me.loadData();
                //console.log(url);
            }).fail(function (res) {

            })
        } catch (e) {

        }
    }
    //messSucsess() {
    //    $('.content-sucsess').text('Thành công');
    //    $("span.ui-dialog-title").text('CẢNH BÁO');
    //    dialogSucsess.dialog('open');
    //}
}