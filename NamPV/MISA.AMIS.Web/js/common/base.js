class BaseJS {
    constructor() {
        this.host = `http://api.manhnv.net`
        this.api = null;
        this.setApi();
        this.loadData();
        this.initEvent();
    }
    /**
     * set url để get dữ liệu về 
     * CreatedBy: NamPV(13/11/2020)
     * */
    setApi() {

    }
    /**
     * Khởi tạo action cho các sự kiện trong trang
     * CreatedBy: NamPV (13/11/2020)
     * */
    initEvent() {
        // Sự kiện click khi nhấn thêm mới
        $(`.customer .btn-add`).click(this.btnAddOnClick.bind(this));

        // Sự kiện load lại trang
        $(`.btn-sync`).click(this.loadData.bind(this));

        // Ẩn form chi tiết khi bấm huỷ
        $(`.customer-add .dialog-footer .btn-cancel`).click(this.btnCancelOnClick.bind(this));

        // Hiển thị dialog xác nhận xoá bản ghi
        $(`.customer-add .dialog-footer .btn-delete`).click(this.btnDeleteOnClick.bind(this));

        // Thực hiện lưu dữ liệu khi nhấn button lưu
        $(`.customer-add .dialog-footer .btn-save`).click(this.btnSaveOnClick.bind(this));

        // Thêm attribute khi kích đúp vào 1 bản ghi
        $(`table tbody`).on(`dblclick`, `tr`, this.rowOnClick);

        //Hiển thị thông tin chi tiêt khi click đúp chuột 1 bản ghi trên danh sách dữ liệu, fill thông tin có sẵn vào form
        $(`table tbody`).on(`dblclick`, `tr`, this.dblClickOnRecord.bind(this));

        // Validate các trường cần điền đầy đủ thông tin
        $(`input[required]`).blur(this.validateInputRequired);

        // Validate email đúng định dạng
        $(`input[type="email"]`).blur(this.validateInputEmailData);

        // Ẩn dialog xác nhận xoá
        $(`.customer-delete .btn-cancel`).click(this.btnCancelDeleteOnClick.bind(this));

        // Xoá bản ghi khi nhấn đồng ý
        $(`.customer-delete .confirm-delete`).click(this.btnConfirmDeleteOnClick.bind(this));
    }

    /**
     *  Load dữ liệu cho trang 
     *  CreatedBy: NamPV (13/11/2020)
     * */
    loadData() {
        var me = this;
        try {
            $(`table tbody`).empty();
            var ths = $(`table thead th`);
            $(`.loading-data`).show();
            $.ajax({
                url: me.host + me.api,
                method: "GET"
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $.each(ths, function (index, th) {
                        var td = $(`<td></td>`);
                        var fieldname = $(th).attr(`fieldname`);
                        switch (true) {
                            case (fieldname.includes(`Code`)):
                                td.css(`min-width`, `90px`);
                                td.css(`max-width`, `90px`);
                                break;
                            case fieldname.includes(`Gender`):
                                td.css(`min-width`, `50px`);
                                td.css(`max-width`, `50px`);
                                break;
                            case fieldname.includes(`Email`) || fieldname.includes(`FullName`) || fieldname.includes(`CompanyName`):
                                td.css(`min-width`, `150px`);
                                td.css(`max-width`, `150px`);
                                break;
                            case fieldname.includes(`Address`):
                                td.css(`min-width`, `300px`);
                                td.css(`max-width`, `300px`);
                                break;
                            default:
                                break;
                        }
                        var value = obj[fieldname];
                        td.attr(`id`, fieldname);
                        var formatType = $(th).attr(`formatType`);
                        switch (formatType) {
                            case `ddmmyyyy`:
                                value = formatDate(value);
                                $(td).addClass(`text-align-center`);
                                $(th).addClass(`text-align-center`);
                                break;
                            case `Number`:
                                value = formatMoney(value);
                                $(td).addClass(`text-align-right`);
                                td.css(`min-width`, `100px`);
                                td.css(`max-width`, `100px`);
                                break;
                            default:
                        }
                        td.append(value);
                        tr.append(td);
                    })
                    tr.data(`recordId`, obj.CustomerId);
                    $(`table tbody`).append(tr);
                })
            }).fail(function (res) {
                showPopupNotification("Tải dữ liệu thất bại!")
            })
        } catch (e) {

        }
        $(`.loading-data`).hide();
        //showPopupNotification("Tải dữ liệu thành công!");
    }

    /**
     * Hiển thị dialog thêm bản ghi khi nhấn nút thêm
     * CreatedBy: NamPV (18/11/2020)
     * */
    btnAddOnClick() {
        this.FormMode = `Add`;
        var me = this;
        $(`.btn-delete`).addClass(`disable`);
        var inputs = $(`input[fieldname], select[fieldname]`);
        $.each(inputs, function (index, input) {
            if (input.type != `radio`)
                $(input).val(``);
        })
        $(`.loading-data`).show();
        me.getDataForSelectTag();
        $(`.loading-data`).hide();
        dialogDetail.dialog(`open`);
        // Lấy dữ liệu nhóm khách hàng
    }

    /**
     * Ẩn form chi tiết khi nhấn nút huỷ
     * CreatedBy: NamPV (17/11/2020)
     * */
    btnCancelOnClick() {
        dialogDetail.dialog(`close`);
    }

    /**
     * Thêm mới hoặc sửa dữ liệu khi nhấn nút lưu
     * CreatedBy: NamPV (18/11/2020)
     * */
    btnSaveOnClick() {
        var me = this;
        // Validate dữ liệu
        var inputValidates = $(`input[required], input[type="email"]`);
        $.each(inputValidates, function (index, input) {
            $(this).trigger('blur');
        })
        var inputNotValids = $(`input[validate="false"]`);
        if (inputNotValids && inputNotValids.length > 0) {
            alert("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại");
            inputNotValids[0].focus();
        }
        else {
            //Thu thập thông tin => build thành object
            var inputs = $(`input[fieldname], select[fieldname]`);
            var entity = {};
            $.each(inputs, function (index, input) {
                var fieldname = $(input).attr(`fieldname`);
                var value = $(input).val();
                if (this.type == `radio`) {
                    if (this.checked) {
                        entity[fieldname] = value;
                    }
                } else {
                    if (this.type == `select-one`) {
                        var fieldid = $(input).attr(`fieldid`);
                        entity[fieldid] = value;
                    }
                    else
                        entity[fieldname] = value;
                }

            })
            //Gọi API để đẩy lưu dữ liệu
            var method = `POST`;
            var msg = "Thêm mới"
            if (me.FormMode == `Edit`) {
                method = `PUT`;
                entity.CustomerId = $(`tr.row-selected`).data(`recordId`);
                msg = "Sửa"
            }
            $.ajax({
                url: me.host + me.api,
                method: method,
                data: JSON.stringify(entity),
                contentType: "application/json"
            }).done(function (res) {
                //Đưa ra thông báo thành công => ẩn form => load lại trang
                showPopupNotification(msg + ` thành công!`);
                dialogDetail.dialog(`close`);
                me.loadData();
            }).fail(function (res) {
                showPopupNotification(msg + ` thất bại!`);
            })
        }
    }
    /**
     * Hiển thị dialog xác nhận xoá bản ghi khi nhấn nút xoá
     * CreatedBy: NamPV (18/11/2020)
     * */
    btnDeleteOnClick() {
        dialogConfirm.dialog(`open`);
    }

    /**
     * Xoá bản ghi khi nhấn đồng ý xoá
     * CreatedBy: NamPV (18/11/2020)
     * */
    btnConfirmDeleteOnClick() {
        var me = this;
        var selectedRecord = $(`tr.row-selected`);
        $.ajax({
            url: me.host + me.api + `/` + selectedRecord.data(`recordId`),
            method: `DELETE`
        }).done(function (res) {
            dialogConfirm.dialog(`close`);
            dialogDetail.dialog(`close`);
            showPopupNotification(`Xoá thành công!`);
            me.loadData();
        }).fail(function (res) {
            showPopupNotification(`Xoá thất bại`);
        })
    }

    /**
     * Đóng dialog xác nhận xoá bản ghi
     * CreatedBy: NamPV (18/11/2020)
     * */
    btnCancelDeleteOnClick() {
        dialogConfirm.dialog(`close`);
    }

    /**
     * Lấy dữ liệu bản ghi được chọn rồi fill vào form
     * CreatedBy: PVNam (17/11/2020)
     */
    dblClickOnRecord() {
        this.FormMode = `Edit`;
        var me = this;
        $(`.btn-delete`).removeClass(`disable`);
        var selectedRecord = $(`tr.row-selected`);
        dialogDetail.dialog(`open`);
        var inputs = $(`input[fieldname], select[fieldname]`);
        //Lấy dữ liệu chi tiết của bản ghi
        $(`.loading-data`).show();
        me.getDataForSelectTag();
        $(`.loading-data`).hide();
        $.ajax({
            url: me.host + me.api + `/` + selectedRecord.data(`recordId`),
            method: "GET"
        }).done(function (res) {
            console.log(res);
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
                            value = formatDateReg(value);
                            break;
                        case `select-one`:
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
    }

    /**
     * Validate dữ liệu text khi nhập input
     * CreatedBy: PVNam (17/11/2020)
     * */
    validateInputRequired() {
        // Kiểm tra dữ liệu
        var value = $(this).val();
        if (!value) {
            $(this).addClass(`border-red`);
            $(this).attr('title', `Cần điền đầy đủ thông tin này`);
            $(this).attr(`validate`, `false`);
        } else {
            $(this).removeClass(`border-red`);
            $(this).removeAttr('title', `Cần điền đầy đủ thông tin này`);
            $(this).attr(`validate`, `true`);
        }
    }

    /**
     * Validate dữ liệu email khi nhập input
     * CreatedBy: PVNam (17/11/2020)
     * */
    validateInputEmailData() {
        var value = $(this).val();
        var testEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (testEmail.test(value)) {
            $(this).removeClass(`border-red`);
            $(this).removeAttr(`title`, `Email không đúng định dạng`);
            $(this).attr(`validate`, `true`);
        } else {
            $(this).addClass(`border-red`);
            $(this).attr(`title`, `Email không đúng định dạng`);
            $(this).attr(`validate`, `false`);
        }
    }

    /**
     * Lấy dữ liệu fill vào các combo-box
     * CreatedBy: NamPV (17/11/2020)
     * */
    getDataForSelectTag() {
        var me = this;
        var selects = $(`select[api]`);
        $.each(selects, function (index, select) {
            $.ajax({
                url: me.host + $(select).attr(`api`),
                method: "GET"
            }).done(function (res) {
                $(select).empty();
                $.each(res, function (index, obj) {
                    var fieldname = $(select).attr(`fieldname`);
                    var fieldid = $(select).attr(`fieldid`);
                    var option = $(`<option value=${obj[fieldid]}>${obj[fieldname]}</option>`);
                    $(select).append(option);
                })
            }).fail(function (res) {

            })
        })
    }

    /** 
     *  Thêm xoá attribute cho các hàng trong bảng khi được trỉ tới
     * CreatedBy: NamPV (17/11/2020)
     * */
    rowOnClick() {
        $(this).siblings().removeClass(`row-selected`);
        $(this).click().addClass(`row-selected`);
    }
}