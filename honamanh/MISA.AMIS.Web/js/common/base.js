class Base {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.initEvent();
        this.loadData();
    }
    initEvent() {
        var me = this;
        //sự kiện click khi ấn nút chuyển trang
        $(".button-bottom-bar").focus(this.btnChangePageOnFocus);


        //sự kiện click khi nhấn vào thêm mới
        $("#btn-add-customer").click(function () {
            //hiển thị dialog thông tin chi tiết
            dialogDetail.dialog('open');
        });


        //load lại dữ liệu khi nhấn button nạp
        $("#btnRefresh").click(function () {
            // alert("nap du lieu")
            //  new CustomerJs();
            //  debugger;
            me.loadData();
        });


        //Ẩn form chi tiết khi ấn hủy
        $("#btnCancel").click(function () {
            dialogDetail.dialog('close');
        });


        //Thực hiện lưu dữ liệu khi ấn button lưu
        $("#btnSave").click(function () {
            //Validate dữ liệu
            var inputValidate = $("input[required], input[type='email']");
            $.each(inputValidate, function (index, input) {
                $(input).trigger('blur');
            });
            var inputNotValids = $('input[validate= false]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại");
                inputNotValids[0].focus();
                return;
            }

            //thu thập thông tin dữ liệu được nhập-> buil thành obj
            var inputs = $('input[fieldName]');
            var customer = {};
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr('fieldName');
                var value = $(this).val();
                customer[fieldName] = value;
                //debugger;
            });
            customer['CustomerGroupId'] = "3631011e-4559-4ad8-b0ad-cb989f2177da";


            //Gọi sevice tương ứng thực hiện lư dữ liệu
            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: "POST",
                data: JSON.stringify(customer),
                contentType: 'application/json',
            }).done(function (res) {
                //Sau khi lưu thành công:
                //+ đưa ra thông báo
                alert("Thêm khách hàng thành công")
                //+ ẩn form
                dialogDetail.dialog('close');
                //+ load lại dữ liệu
                me.loadData();
                debugger;
            }).fail(function (res) {
                debugger;
            })


        });

        //Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 dòng trong bảng
        //$('tr').dblclick(function () {
        //    dialogDetail.dialog('open');
        //});
        $("table tbody").on('dblclick', 'tr', function () {
            dialogDetail.dialog('open');
        })


        /*
         * Validate bắt buộc nhập
         *CreatedBy: HNANH (14/11/2020)
         * */
        $('input[required]').blur(function () {
            //kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
            var value = $(this).val();
            if (!value) {
                $(this).addClass("border-red");
                $(this).attr("title", "Trường này không được để trống");
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass("border-red");
                $(this).attr("validate", true);
            }
        });


        /*
         * Validate email nhập đúng định dạng
         *CreatedBy: HNANH (14/11/2020)
         * */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
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
        //$(".input-required").blur(function () {
        //    //kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
        //    var value = $(this).val();
        //    if (!value) {
        //        $(this).addClass("border-red");
        //        $(this).attr("title", "Trường này không được để trống");
        //    }
        //    else {
        //        $(this).removeClass("border-red");
        //    }
        //});


        //  debugger;
        //$(".btn-add").click(this.btnAddOnClick.bind(this));
        //$(".btn-cancel").click(this.btnCancelOnClick);
        //$(".btn-save").click(this.btnSaveOnClick);
        ////  $(".button-bottom-bar").click(this.btnChangePageOnClick);
        //$("#txtEmployeeCode").blur(this.checkRequire);
    }

    /**Load dữ liệu
     * CreatedBy: HNANH (12/11/2020)
     * */
    loadData() {
        try {
            //xóa hết dữ liệu bảng trước khi nạp, tránh bị nạp tiếp vào dữ liệu đã có
            $('table tbody').empty();
            //lấy thông tin các cột dữ liệu
            var ths = $("table thead th");
            var fieldName = []; /*những biến khi khai báo mà ko sử dụng sẽ tốn bộ nhớ, và sẽ được hiển thị mờ*/
            $.each(ths, function (index, item) {

            });

            var getDataUrl = this.getDataUrl;
            //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
            $.ajax({
                url: getDataUrl,
                method: "GET",
                async: false,
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
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
                                td.addClass("fix-width-table align-salary");
                                $(".fix-width-table").attr("title", value);
                            default:
                        }
                        $(td).append(value);
                        $(tr).append(td);
                    });
                    $("table tbody").append(tr);
                });
            }).fail(function (reject) {

            })
        } catch (e) {
            console.log(e);

        }

    }
    /**
     * Hàm xử lý sự kiện khi click vào nút thêm nhân viên
     * CreatedBy: HNANH (12/11/2020)
     * */
    btnAddOnClick() {
        //$(".dialog-model").show();
        //$(".dialog-content").show();

        //test lỗi this
        //  debugger;
        this.showDetail(); //this lúc này đang trỏ đến button nên lỗi. Giải pháp sử dụng bind(this)
    }

    /**
     * Hàm hiển thị dialog
     * CreatedBy: HNANH (12/11/2020)
     * */
    showDetail() {

        $(".dialog-model").show();
        $(".dialog-content").show();
        $("#txtEmployeeCode").focus();
    }

    /**
     * Hàm ẩn form dialog
     * CreatedBy: HNANH (12/11/2020)
     * */
    btnCancelOnClick() {
        $(".dialog-model").hide();
        $(".dialog-content").hide();
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
    btnSaveOnClick() {

        //validate dữ liệu nhập từ form (kiểm tra dữ liệu)
        var txtEmployeeCode = $("#txtEmployeeCode").val();
        var txtEmployeeName = $("#txtEmployeeName").val();
        if (!txtEmployeeCode) {
            //alert("Mã nhân viên không được bỏ trống");
            $("#txtEmployeeCode").addClass("require-input-empty");
            $("#txtEmployeeCode").focus();
            $("#txtEmployeeCode").attr("title", "Bạn phải nhập thông tin mã nhân viên");
            return;
        }
        if (!txtEmployeeName) {
            //alert("Tên nhân viên không được bỏ trống");
            $("#txtEmployeeName").addClass("require-input-empty");
            $("#txtEmployeeName").focus();
            return;
        }
        //thu thập dữ liệu nhập trên form

        //cất dữ liệu vào database
    }
    checkRequire() {
        debugger;
    }
    setDataUrl() {

    }

}