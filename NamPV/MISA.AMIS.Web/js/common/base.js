class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvent();
    }

    /**
     * set url để get dữ liệu về 
     * CreatedBy: NamPV(13/11/2020)
     * */
    setDataUrl() {

    }
    /**
     * Khởi tạo action cho các sự kiện trong trang
     * CreatedBy: NamPV (13/11/2020)
     * */
    initEvent() {
        var me = this;
        // Sự kiện click khi nhấn thêm mới
        $(`.employee-content .header-content .content-feature .content-add-box .btn-add`).click(function () {
            dialogDetail.dialog(`open`);
        })

        // Sự kiện load lại trang
        $(`.employee-content .header-content .content-feature .btn-sync`).click(function () {
            me.loadData();
        })

        // Ẩn form chi tiết khi bấm huỷ
        $(`.dialog-modal .dialog-footer .btn-cancel`).click(function () {
            dialogDetail.dialog(`close`);
        })

        // Thực hiện lưu dữ liệu khi nhấn button lưu
        $(`.dialog-modal .dialog-footer .btn-save`).click(function () {
            // Validate dữ liệu
            var inputValidates = $(`input[required], input[type="email"]`);
            $.each(inputValidates, function (index, input) {
                $(this).trigger('blur');
            })
            var inputNotValids = $(`input[validate="false"]`);
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại");
                inputNotValids[0].focus();
                return;
            }

            //Thu thập thông tin => build thành object
            var customer = {
                "CustomerCode": $(`#txtCustomerCode`).val(),
                "FullName": $(`#txtFullName`).val(),
                "Address": $(`#txtAddress`).val(),
                "DateOfBirth": $(`#dtDateOfBirth`).val(),
                "Email": $(`#txtEmail`).val(),
                "PhoneNumber": $(`#txtPhoneNumber`).val(),
                "CustomerGroupId": "3631011e-4559-4ad8-b0ad-cb989f2177da",
                "MemberCardCode": $(`#txtMemberCardCode`).val(),
                "CustomerGroupName": $(`#txtCustomerGroupName`).val(),
            };

            //Gọi API để đẩy lưu dữ liệu
            $.ajax({
                url: `http://api.manhnv.net/api/customers`,
                method: "POST",
                data: JSON.stringify(customer),
                contentType: "application/json"
            }).done(function (res) {
                //Đưa ra thông báo thành công => ẩn form => load lại trang
                alert(`Thành công`);
                dialogDetail.dialog(`close`);
                me.loadData();
            }).fail(function (res) {

            })
        })

        //Hiển thị thông tin chi tiêt khi click đúp chuột 1 bản ghi trên danh sách dữ liệu, fill thông tin có sẵn vào form
        $(`table tbody`).on(`dblclick`, `tr`, function () {
            dialogDetail.dialog(`open`);
            var inputs = $(`#dialog input`);
            var tds = this.getElementsByTagName(`td`);
            $.each(tds, function (index, td) {
                var id = td.id;
                var value = td.textContent;
                $.each(inputs, function (index, input) {
                    if (input[`id`].indexOf(id) >= 0) {
                        var html = `#` + input[`id`];
                        if (input.type == `date`) {
                            value = stringToDate(value);
                            $(html).val(value);
                        } else {
                            $(html).val(value);
                        }
                    }
                })

            })
        })

        // Validate các trường cần điền đầy đủ thông tin
        $(`input[required]`).blur(function () {
            // Kiểm tra dữ liệu
            var value = $(this).val();
            if (!value) {
                $(this).addClass(`border-red`);
                $(this).attr('title', `Cần điền đầy đủ thông tin này`);
                $(this).attr(`validate`, `false`);
            } else {
                $(this).removeClass(`border-red`);
                $(this).attr(`validate`, `true`);
            }
        })

        // Validate email đúng định dạng
        $(`input[type="email"]`).blur(function () {
            var value = $(this).val();
            var testEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (testEmail.test(value)) {
                $(this).removeClass(`border-red`);
                $(this).removeAttr(`title`, `Email không đúng định dạng`);
                $(this).attr(`validate`, `true`);
            } else {
                $(this).addClass(`border-red`);
                $(this).attr(`title`, `Email không đúng định dạng`);
                $(this).attr(`validate`, `false`);
            }
        })
    }

    /**
     *  Load dữ liệu cho trang 
     *  CreatedBy: NamPV (13/11/2020)
     * */
    loadData() {
        try {
            var getDataUrl = this.getDataUrl;
            var ths = $(`table thead th`);
            $.ajax({
                url: getDataUrl,
                method: "GET"
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $.each(ths, function (index, th) {
                        var td = $(`<td></td>`);
                        var fieldname = $(th).attr(`fieldname`);
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
                                break;
                            default:
                        }
                        td.append(value);
                        tr.append(td);
                    })
                    $(`table tbody`).append(tr);
                })
            }).fail(function (res) {

            })
        } catch (e) {

        }
    }
}