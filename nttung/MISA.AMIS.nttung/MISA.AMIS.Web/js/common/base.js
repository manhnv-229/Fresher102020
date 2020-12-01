class BaseJS {
    constructor() {
        var me = this;
        this.host = "http://api.manhnv.net";
        this.apiRoutor = null;
        this.setApiRouter();
        this.loadData();
        this.initEvents();
        me.FormMode = null;
        me.RecordId = null;

    }
    //đổi tên biến bôi đên biến rồi ctrl + r + r
    setApiRouter() {

    }
    setDataUrl() {

    }
    /**
     * hàm quản lý các sự kiện
     * createdby nttung (10/11/2020)
     * */
    initEvents() {
        var me = this;
        $('#btnAdd').click(this.btnAddOnClick.bind(this));
        $('#btnReload').click(this.btnReloadOnClick.bind(this));
        $('#btnCanel').click(this.btnCanelOnClick.bind(this));
        $('.title-close-button').click(this.btnCanelOnClick.bind(this));
        $("input[required]").blur(this.checkRequired);
        $("#btnSave").click(me.btnSaveOnClick.bind(this));
        //$('table tbody').on('dblclick', 'tr', me.btnEditOnClick);

        //them attribute khi click vao 1 bản ghi
        $(`table tbody`).on(`dblclick`, `tr`, this.rowOnClick);

        //hien thi thong tin chi tiet ban ghi khi double click vao
        $(`table tbody`).on(`dblclick`, `tr`, this.dblClickOnRecord.bind(this));

        //Hiển thị cảnh báo xóa bản ghi
        $('#btnDelete').click(this.showPopUpComfirm.bind(this));
        //Click đồng ý để xóa bản ghi
        $('#btnConfirm').click(this.btnConfirmOnClick.bind(this));

        // Đóng pop-up xác nhận xóa;
        $('#btnClose').click(this.hidePopUpConfirm.bind(this));
        $('#btnClosePopUp').click(this.hidePopUpConfirm.bind(this));
        
    }
    /**
     * tải lại bảng hiển thị thông tin
     * createdby nttung (12/11/2020)
     * */
    btnReloadOnClick() {
        $('table tbody').empty();
        this.loadData();
    }
    /**
     * Hiển thị DialogDetail
     * createdby nttung (10/11/2020)
     * */
    showDialogDetail() {
        $(' .dialog-model').show();
        $(' .dialog').show();
        $("#txtEmployeeCode").focus();
    }
    /**
    * ẩn DialogDetail
    * createdby nttung (10/11/2020)
    * */
    hideDialogDetail() {
        $(' .dialog-model').hide();
        $(' .dialog').hide();
    }
    /**
     * Show form thêm khách hang
     * createdby nttung (12//11/2020)
     * */
    btnAddOnClick() {
        var me = this;
        me.FormMode = 'Add';
        $('input[type="text"]').val('');
        this.showDialogDetail();
        this.loadDataForComboBox();
    }
    /**
     * btn hủy tại dialog chi tiết
     * createdby nttung (12/11/2020)
     * */
    btnCanelOnClick() {
        this.hideDialogDetail();
    }
    /**
     * Hiển thị cảnh báo pop-up
     * createdby nttung (19/11/2020)
     * */
    showPopUpComfirm() {
        $('.pop-up-layout').show();
        $('.pop-up').show();
    }
    /**
     * Ẩn pop-up cảnh báo
     * createdby nttung (19/11/2020)
     * */
    hidePopUpConfirm() {
        $('.pop-up').hide()
        $('.pop-up-layout').hide();
    }
    /**
     * Hiển thị thông báo thành công
     * cretedby nttung (19/11/2020)
     * */
    showNotification() {
        $('.notification').delay(300).show(1000);
    }
    hideNotification() {
        $('.notification').delay(1300).hide(1000);
    }
    /**
     * Hiển thị thông báo thất bại
     * createdby nttung (19/11/2020)
     * */
    showNotificationFail() {
        try {
            $('.notification-fail').delay(300).show(1000);
        } catch (e) {
            console.log(e);
        }
    }
    hideNotificationFail() {
        try {
            $('.notification-fail').delay(1300).hide(1000);
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * Load dữ liệu 
     * createdby nttung(12/11/2020)
     * */
    loadData() {
        try {
            var me = this;
            var ths = $('table thead th');
            var strUrl = me.host + me.apiRoutor;
            $('.loading-box').show();
            $.ajax({
                url: strUrl,
                method: "GET",
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $(tr).data('recordId', obj.CustomerId);
                    var sortNumber = index;
                    //Lấy thông tin dữ liệu map vào các cột tương ứng
                    $.each(ths, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldName');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyyy":
                                td.find('div').addClass("text-align-center");
                                value = fomatDate(value);
                                break;
                            case "Money":
                                td.addClass("text-align-right");
                                value = fomatMoney(value);
                                break;
                            case "Gender":
                                value = fomatGender(value);
                                break;
                            default:
                                break;
                        }

                        td.find('div').append(value);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })
                $('.loading-box').hide();
            }).fail(function (res) {
                me.showNotificationFail();
            })
            me.hideNotificationFail();
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * button kiểm tra và lưu dữ liệu cho thêm mới và chỉnh sửa
     * createdy nttung (10/11/2020)
     * */
    btnSaveOnClick() {
        try {
            var me = this;
            var strUrl = me.host + me.apiRoutor;
            //validate dữ liệu
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
            // add
            //thu thập thông tin dữ liệu được nhập -> build thành object
            var inputs = $('input[fieldName], select[fieldName]');
            var entity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldname');
                var value = $(this).val();
                //check radio input
                if ($(this).attr('type') == "radio") {
                    if (this.checked) {
                        entity[propertyName] = value;
                    }
                } else {
                    entity[propertyName] = value;
                }
            })
            var method = "POST";
            //gọi service tương ứng thực hiện lưu dữ liệu cho customer
            if (me.FormMode == 'Edit') {
                method = "PUT";
                entity.CustomerId = me.RecordId;
            }
            // goi api tuong ứng
            $('.loading-box').show();
            $.ajax({
                url: strUrl,
                method: method,
                data: JSON.stringify(entity),
                contentType: 'application/json'
            }).done(function (res) {
                //đưa ra thông báo thành công,
                me.showNotification();
                //ẩn form chi tiết
                me.hideDialogDetail();
                //load lại lại dữ liệu
                me.hideNotification();
                me.btnReloadOnClick();
            }).fail(function (res) {
                me.showNotificationFail();
                me.hideNotificationFail();
            })
            $('.loading-box').hide();

        }catch (e) {
            console.log(e);
        }
    }
    /**
     * Xóa khách hàng duoc chọn
     * createdby nttung (18/11/2020)
     * */
    btnConfirmOnClick() {
        try {
            var me = this;
            var selectedRecord = $(`tr.row-selected`);
            $.ajax({
                url: me.host + me.apiRoutor + `/` + selectedRecord.data(`recordId`),
                method: `DELETE`
            }).done(function (res) {
                me.hideDialogDetail();
                me.hidePopUpConfirm();
                me.showNotification();
                me.btnReloadOnClick();
                me.hideNotification();
            }).fail(function (res) {
                me.showNotificationFail();
                me.hideNotificationFail();
            })
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * kiểm tra vaild cho dữ liệu chưa nhập vào DialogDetail
     * createdby nttung (10/11/2020)
     * */
    checkRequired() {
        try {
            var val = $(this).val();
            if (!val) {
                $(this).addClass('required-error');
                //$("#txtEmployeeCode").focus();
                $(this).attr("title", "Bạn phải nhập trường này");
            }
            else {
                $(this).removeClass('required-error');
            }
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * Load combo box nhóm khách hàng cho dialog customer
     * ceatedby nttung(18/11/2020)
     * */
    loadDataForComboBox() {
        try {
            var me = this;
            var select = $('select#ddlCustomerGroupName');
            select.empty();
            // laays du lieu nhom khach hang
            $('.loding-box').show();
            $.ajax({
                url: me.host + "/api/customergroups",
                method: "GET"
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                        select.append(option);
                    })
                }
            }).fail(function (res) {

            })
            $('.loding-box').hide();
        } catch (e) {
            console.log(e);
        }
    }
    /** 
    * Thêm xoá attribute cho các hàng trong bảng khi trỏ vào 
    * CreatedBy: ntung (17/11/2020)
    * */
    rowOnClick() {
        try {
            $(this).siblings().removeClass(`row-selected`);
            $(this).click().addClass(`row-selected`);
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * Load dữ liệu chi tiết khi double click vào bản ghi
     * Createdby nttung(17/11/2020)
     * */
    dblClickOnRecord() {
        try {
            var me = this;
            me.FormMode = `Edit`;
            $(`.btn-delete`).removeClass(`disable`);
            var selectedRecord = $(`tr.row-selected`);
            me.RecordId = selectedRecord.data(`recordId`);
            $('.dialog-model').show();
            $('.dialog').show();
            var inputs = $(`input[fieldname], select[fieldname]`);
            //Lấy dữ liệu của combobox
            $(`.loading-data`).show();
            me.loadDataForComboBox();
            $(`.loading-data`).hide();
            $.ajax({
                url: me.host + me.apiRoutor + `/` + me.RecordId,
                method: "GET"
            }).done(function (res) {
                // Binding dữ liệu vào các input
                $.each(inputs, function (index, input) {
                    var fieldname = $(input).attr(`fieldname`);
                    var value = res[fieldname];
                    if (input.type == `radio`) {
                        if (input.value == value) {
                            this.checked = true;
                        }
                    } else {
                        switch (input.type) {
                            case `date`:
                                value = fomatDateYYYYMMdd(value);
                                break;
                            case `radio`:
                                var fieldid = $(input).attr(`fieldid`);
                                value = res[fieldid];
                                break;
                            default: value = res[fieldname];
                                break;
                        }
                        $(input).val(value);
                    }
                })
            }).fail(function (res) {
                
            })
        } catch (e) {
            console.log(e);
        }

    }
}
