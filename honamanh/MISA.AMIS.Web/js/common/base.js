

class Base {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.initEvent();
        this.loadData();
    }
    setApiRouter() {

    }
    initEvent() {
        var me = this;
        //#region "Sự kiện với các nút" // dùng region để gộp các đoạn code giúp dễ quản lý và sửa đổi  
        //sự kiện click khi nhấn vào thêm mới
        $("#btn-add-customer").click(this.btnAddOnClick.bind(this));

        //sự kiện click khi nhấn vào sửa
        $(".btn-edit-customer").click(this.btnEditOnClick.bind(this));

        //load lại dữ liệu khi nhấn button nạp
        $("#btnRefresh").click(function () {
            me.loadData();
        });

        //Ẩn form chi tiết khi ấn hủy
        $("#btnCancel").click(function () {
            dialogDetail.dialog('close');
        });

        //Thực hiện lưu dữ liệu khi ấn button lưu
        $("#btnSave").click(this.btnSaveOnClick.bind(this));

        //Thực hiện xóa dữ liệu khi ấn button xóa
        $('.btn-delete-customer').click(this.btnDeleteOnClick.bind(this));

        // sự kiện click vào button hủy để tắt cảnh báo
        $(".btn-cancel-warning").click(function () {
            dialogWarning.dialog("close");
        })

        // Sự kiện khi click vào button xóa để xác nhận thực hiện xóa
        $(".btn-accept-warning").click(function () {
            try {
                var tr = $('table tbody tr.rowSelected');
                var recordId = tr.data("recordid");
                $.ajax({
                    url: me.host + me.apiRouter + `/${recordId}`,
                    method: "Delete",
                }).done(function (res) {
                    //hiện thị thông báo xóa thành công
                    //$.notify(
                    //    "Xóa thành công", { className: "success", position: 'bottom left' }
                    //);
                    //  debugger

                    // đóng form xác nhận xóa
                    dialogWarning.dialog("close");

                    //load lại dữ liệu
                    me.loadData();

                    //hiện thị thông báo xóa thành công
                    me.openPopUpMessenger("success", "Thực hiện xóa thành công");
                }).fail(function (res) {
                    me.openPopUpMessenger("danger", "Thực hiện lỗi, vui lòng kiểm tra lại");
                    dialogWarning.dialog("close");
                    debugger;
                })
            } catch (e) {
                me.openPopUpMessenger("danger", "Thực hiện lỗi, vui lòng kiểm tra lại");
                debugger
            }
        })

        //#endregion Dialog

        //#region "Sự kiện với chuột" // dùng region để gộp các đoạn code giúp dễ quản lý và sửa đổi  

        //Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 dòng trong bảng
        $("table tbody").on('dblclick', 'tr', this.btnEditOnClick.bind(this));

        $("table tbody").on("click", 'tr', function () {
            $(this).siblings().removeClass("rowSelected");
            $(this).addClass("rowSelected");
        })

        //$("table tbody").on('contextmenu', 'tr', function (e) {
        //    //alert("mouse right on click")

        //    //hiện thị menu
        //    $(this).siblings().removeClass('rowSelected');
        //    $(this).addClass('rowSelected');
        //    $('.menu-show').css({
        //        top: e.pageY + 'px',
        //        // left: e.pageX + 'px'
        //        right: 16 + 'px'
        //    }).show();
        //    //   me.showDialogOnClick();
        //    debugger
        //    return false;
        //});

        //sự kiện click khi ấn nút chuyển trang
        $(".button-bottom-bar").focus(this.btnChangePageOnFocus);

        //#endregion "Sự kiện với chuột"

        //#region "Validate Kiểm tra input" // dùng region để gộp các đoạn code giúp dễ quản lý và sửa đổi

        /*
         * Validate bắt buộc nhập
         *CreatedBy: HNANH (14/11/2020)
         * */
        $('input[required]').blur(function () {
            //kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
            var value = $(this).val().trim();  //.trim() để đảm bảo khi người dùng nhập toàn dấu cách thì value vẫn sẽ là null;
            if (!value) {
                $(this).addClass("border-red");
                $(this).attr("title", "Trường này không được để trống");
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass("border-red");
                $(this).removeAttr("title");
                $(this).attr("validate", true);
            }
        });


        /*
         * Validate email nhập đúng định dạng
         *CreatedBy: HNANH (14/11/2020)
         * */
        $('input[type="email"]').blur(function () {
            var value = $(this).val().trim();
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(value)) {
                $(this).addClass("border-red");
                $(this).attr("title", "Email không đúng định dạng");
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass("border-red");
                $(this).attr("validate", true);
            }
        });
        $(".input-required").blur(function () {
            //kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
            var value = $(this).val();
            if (!value) {
                $(this).addClass("border-red");
                $(this).attr("title", "Trường này không được để trống");
            }
            else {
                $(this).removeClass("border-red");
            }
        });

        //#endregion "Validate Kiểm tra input"
    }

    /**Load dữ liệu
    * CreatedBy: HNANH (12/11/2020)
    * */
    loadData() {
        var me = this;
        try {

            $(".loading").show();
            //xóa hết dữ liệu bảng trước khi nạp, tránh bị nạp tiếp vào dữ liệu đã có
            $('table tbody').empty();
            //lấy thông tin các cột dữ liệu
            var ths = $("table thead th");
            var fieldName = []; /*những biến khi khai báo mà ko sử dụng sẽ tốn bộ nhớ, và sẽ được hiển thị mờ*/
            $.each(ths, function (index, item) {

            });


            //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
            $.ajax({
                url: this.host + this.apiRouter,
                method: "GET",
            }).done(function (res) {


                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    tr.data("recordid", obj["CustomerId"]);
                    tr.data("customer", obj);
                    $.each(ths, function (index, th) {
                        var td = $(`<td></td>`);

                        var fieldName = $(th).attr("fieldName");
                        var value = obj[fieldName];
                        var formatType = $(th).attr("formatType");
                        switch (formatType) {
                            case "ddmmyyyy":
                                value = formatDate(value);
                                td.addClass("align-center");
                                break;
                            case "money":
                                value = formatMoney(value);
                                td.addClass("align-right");
                                break;
                            case "address":
                                debugger
                                td.addClass("fix-width-table align-salary");
                                //TODO: Cần sửa lỗi tooltip sau khi sử dựng jquery ui
                                $(".fix-width-table").attr("title", value);
                                $(".fix-width-table").tooltip();
                            default:
                        }
                        $(tr).data('keyId', obj['CustomerId']);
                        $(tr).data('data', obj);
                        //  debugger
                        $(td).append(value);
                        $(tr).append(td);
                    });
                    $("table tbody").append(tr);
                    $(".loading").hide();
                });
            }).fail(function (res) {
                $(".loading").show();
                me.openPopUpMessenger("danger", "Thực hiện lỗi, vui lòng kiểm tra lại");
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm xử lý sự kiện khi nhấn button thêm
     * CreatedBy: HNANH (18/11/2020)
     * */
    btnAddOnClick() {
        var me = this;
        try {
            me.FormMode = "Add";
            dialogDetail.dialog('open');

            // Xử lý làm trống các thành phần input khi mở lại form
            var inputs = $("input");
            $.each(inputs, function (index, input) {
                debugger
                if ($(this).attr("type") == "radio") {
                    if ($(this).attr("checked")) {
                        $(this).prop("checked", true);
                    }
                }
                else {
                    $(this).val("");
                }
            })

            //load dữ liệu cho các combobox 
            var selects = $('select[fieldName]');
            var api = selects.attr("api");

            //xử lý xóa các option trước để tránh bị trùng khi nhấn button add các lần tiếp theo
            //$('select option').remove();
            selects.empty();

            //hiện thị icon load khi dữ liệu đang được tải
            $(".loading").show();

            $.each(selects, function (index, select) {
                var api = $(this).attr("api");
                var fieldName = $(this).attr("fieldName");
                var fieldValue = $(this).attr("fieldValue");
                //lấy dữ liệu nhóm khách hàng
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
                    me.openPopUpMessenger("danger", "Thực hiện lỗi, vui lòng kiểm tra lại");
                    debugger
                })
            })

        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm xử lý sự kiện khi nhấn button lưu
     * CreatedBy: HNANH (18/11/2020)
     * */
    btnSaveOnClick() {
        try {
            var me = this;
            //Validate dữ liệu
            var inputValidate = $("input[required], input[type='email']");
            $.each(inputValidate, function (index, input) {
                $(input).trigger('blur');
            });
            var inputNotValids = $('input[validate= false]');
            if (inputNotValids && inputNotValids.length > 0) {
                //alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại");
                me.openPopUpMessenger("warning", "Dữ liệu không hợp lệ, vui lòng kiểm tra lại");
                inputNotValids[0].focus();
                return;
            }

            //thu thập thông tin dữ liệu được nhập-> buil thành obj

            // lấy tất cả các control nhập liệu
            var inputs = $('input[fieldName], select[fieldName]');
            var emtity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(input).attr('fieldName');
                var value = $(input).val();
                if ($(input).val()) {
                    value = $(input).val().trim();
                }

                //check với trường hợp là radio, thì chỉ lấy value của input có attribute là checked

                if ($(this).attr("type") == 'radio') {
                    if ($(this).is(":checked")) {
                        emtity[propertyName] = value;
                        // debugger
                    }
                }
                else {
                    emtity[propertyName] = value;
                }
            });
            //debugger;
            //Gọi sevice tương ứng thực hiện lưu dữ liệu
            var method = "POST";
            if (me.FormMode == "Edit") {
                method = "PUT";
                emtity["CustomerId"] = me.recordId;
            }
            $.ajax({
                url: me.host + me.apiRouter,
                method: method,
                data: JSON.stringify(emtity),
                contentType: 'application/json',
            }).done(function (res) {

                //Sau khi lưu thành công:

                //+ đưa ra thông báo

                me.openPopUpMessenger("success", "Thành công");

                //+ ẩn form
                dialogDetail.dialog('close');
                //+ load lại dữ liệu
                me.loadData();
            }).fail(function (res) {
                me.openPopUpMessenger("danger", "Thực hiện lỗi, vui lòng kiểm tra lại");
                debugger;
            })
        } catch (e) {
            console.log(e);
        }

    }
    /**
         * Hàm xử lý khi nhấn button sửa hoặc ấn dblclick
         * CreatedBy: HNANH (12/11/2020)
         * */
    btnEditOnClick() {
        try {
            var me = this;
            //load dữ liệu cho các combobox 
            var selects = $('select[fieldName]');
            var api = selects.attr("api");
            //xử lý xóa các option trước để tránh bị trùng khi nhấn button add các lần tiếp theo
            //$('select option').remove();
            selects.empty();

            //hiện thị icon load khi dữ liệu đang được tải
            $(".loading").show();
            $.each(selects, function (index, select) {
                var api = $(this).attr("api");
                var fieldName = $(this).attr("fieldName");
                var fieldValue = $(this).attr("fieldValue");

                //lấy dữ liệu nhóm khách hàng
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
                }).fail(function (res) {
                    $(".loading").hide();
                    me.openPopUpMessenger("danger", "Thực hiện lỗi, vui lòng kiểm tra lại");
                    debugger
                })
            })

            me.FormMode = "Edit";
            var tr = $("table tbody tr.rowSelected");
            if (tr.html() == null) {
                me.openPopUpMessenger("info", "Vui lòng chọn bản ghi muốn sửa");
                return;
            }

            dialogDetail.dialog("open");
            //lấy thông tin khóa chính của bản ghi
            var recordId = tr.data('recordid');
            me.recordId = recordId;
            // var recordId = $(this).attr("recordId");

            //gọi service để lấy thông tin chi tiết
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET",
            }).done(function (res) {

                //Build thành obj vào đẩy tương ứng vào form
                var datas = res;
                var inputs = $('input[fieldName], select[fieldName]');
                $.each(inputs, function (index, input) {
                    var propertyName = $(input).attr('fieldName');
                    var value = datas[propertyName];
                    //check với trường hợp là radio, thì chỉ lấy value của input có attribute là checked
                    if ($(this).attr("type") == 'date') {
                        var date = getDateStringYYYYMMDD(value);
                        $(this).val(date);
                    }
                    else if ($(this).attr("type") == 'radio') {
                        if ($(this).val() == value) {
                            $(this).prop("checked", true);
                            //   $("#male").prop("checked", false);
                        }
                        else {
                            $(this).prop("checked", false);
                        }
                    }
                    else {
                        $(this).val(value).change();
                    }
                });
            }).fail(function (res) {
                me.openPopUpMessenger("danger", "Thực hiện lỗi, vui lòng kiểm tra lại");
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
        * Hàm xử lý khi nhấn button xóa
        * CreatedBy: HNANH (12/11/2020)
        * */
    btnDeleteOnClick() {
        var me = this;
        //lấy thông tin bản ghi đã chọn trong danh sách
        var tr = $('table tbody tr.rowSelected');

        if (tr.html() == null) {
            me.openPopUpMessenger("info", "Vui lòng chọn bản ghi muốn xóa");
            return;
        }
        //lấy thông tin chi tiết của bản ghi đã chọn
        var recordId = tr.data("recordid");

        //mở dialog cảnh báo khi thực hiện xóa
        me.openDialogWarning(recordId);
    }

    /**
     * Hàm mở dialog thông báo: thành công, cảnh báo, lỗi,..
     * CreatedBy: HNANH (21/11/2020)
     * */
    openPopUpMessenger(status, messenger) {
        //   debugger;
        $(".toast-messenger .title-messenger").text(messenger);

        //Thực hiện remove các class được thêm trước đó
        var classes = $(".div-icon-messenger").attr("class").split(/\s+/);;
        var classesIconCloseMess = $(".btn-close-messenger .icon-close-messenger").attr("class").split(/\s+/);;
        var l = classes.length;
        for (var i = 1; i < l; i++) {
            // debugger
            $(".div-icon-messenger").removeClass(classes[i]);
            $(".btn-close-messenger .icon-close-messenger").removeClass(classesIconCloseMess[i]);
        }
        switch (status) {
            case "success":
                $(".div-icon-messenger").addClass("icon-messenger-success");
                $(".btn-close-messenger .icon-close-messenger").addClass("icon-close-messenger-success");
                break;
            case "danger":
                $(".div-icon-messenger").addClass("icon-messenger-danger");
                $(".btn-close-messenger .icon-close-messenger").addClass("icon-close-messenger-danger");
                break;
            case "warning":
                $(".div-icon-messenger").addClass("icon-messenger-warning");
                $(".btn-close-messenger .icon-close-messenger").addClass("icon-close-messenger-warning");
                break;
            case "info":
                $(".div-icon-messenger").addClass("icon-messenger-info");
                $(".btn-close-messenger .icon-close-messenger").addClass("icon-close-messenger-info");
                break;
            default:
        }
        $(".show-toast-messenger").css("visibility", "visible");
        setTimeout(function () {
            $(".show-toast-messenger").css("visibility", "hidden");
        }, 3000);

    }
    /**
     * Hàm mở dialog xác nhận
     * @param {any} recordId tham số là recordId: mã khách hàng muốn xóa
     * CreatedBy: HNANH (20/11/2020)
     */
    openDialogWarning(recordId) {
        try {
            var me = this;
            var recordId = recordId;
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET",
            }).done(function (res) {
                var customerName = res["FullName"];
                var customerCode = res["CustomerCode"];

                $(".body-pop-up .content-pop-up-warning").text("Bạn có chắc chắn muốn xóa khách hàng "
                    + customerName + " (Mã khách hàng " + customerCode + ") không ? ");
                $("span.ui-dialog-title").text('Xác nhận xóa bản ghi');
                dialogWarning.dialog("open");
                $(".m-seconds-button-2").blur();
            }).fail(function () {

            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm xử lý đổi màu nút thay đổi trang
     * CreatedBy: HNANH (12/11/2020)
     * */
    btnChangePageOnFocus() {
        $(this).siblings().removeClass("button-change-page-select");
        $(this).addClass("button-change-page-select");
    }


    /**
     * Hàm lưu dữ liệu nhập từ dialog
     * CreatedBy: HNANH (12/11/2020)
     * */
    checkRequire() {
        debugger;
    }

}