/**
 *  Class Dùng chung
 *  CreatedBy: NTANH (12/11/2020)
 * */

class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
        this.activeItem();
        this.trOnSelected();
    }
    /**
     *  Lấy url api 
     *  CreatedBy: NTANH (13/11/2020)
     * */
    setDataUrl() {

    }
    /**
     *  Khởi tạo Event
     *  CreatedBy: NTANH (15/11/2020)
     * */
    initEvents() {
        var me = this;
        // Sự kiện click khi nhấn thêm mới
        $('#btnAdd').click(function () {
            // Hiển thị dialog thông tin chi tiết
            dialogDetail.dialog('open');
        })

        // Load lại dữ liệu khi nhấn button nạp
        $('#btnRefresh').click(function () {
            me.loadData();
        })

        // Ẩn form chi tiết khi nhấn hủy, back_def, button close
        $('.btnClose').click(function () {
            dialogDetail.dialog('close');
        })

        // Thực hiện lưu dữ liệu khi nhấn button Lưu trên form chi tết
        $('#btnSave').click(function () {
            //Validate dữ liệu
            var inputValidates = $('input[required], input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');
            })
  
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại");
                inputNotValids[0].focus();
                return;
            }
            // Thu thập thông tin dữ liệu
            var customer = {
                "CustomerCode": $('#txtCustomerCode').val(),
                "FullName": $('#txtFullName').val(),
                "Address": $('#txtAddress').val(),
                "DateOfBirth": $('#dtDateOfBirth').val(),
                "Email": $('#txtEmail').val(),
                "PhoneNumber": $('#txtPhoneNumber').val(),
                "CustomerGroupId": "19165ed7-212e-21c4-0428-030d4265475f",
                "MemberCardCode": $('#txtMemberCardCode').val() 
            }
            console.log(customer);
            // Gọi service thực hiện lưu dữ liệu
            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: 'POST',
                data: JSON.stringify(customer),
                contentType: 'application/json'
            }).done(function (res) {
            // Đưa ra thông báo và ẩn form chi tiết và load lại dữ liệu
                alert('Thêm thành công');
                dialogDetail.dialog('close');
                me.loadData();
            }).fail(function (res) {
                debugger;
            })
            
        })

        // Hiển thị thông tin chi tiết cho 1 bản ghi khi ấn đúp chuột
        $('table tbody').on('dblclick', 'tr', function () {
            dialogDetail.dialog('open');
        })
        /*
         * Validate bắt buộc nhập
         * CreatedBy: NTANH 15/11/2020
         */
        $('input[required]').blur(function () {
            // Kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })

        /*
         *  Valide email đúng định dạng
         *  CreatedBy: NTANH 15/11/2020
         */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })
    }
    /**
     * Load dữ liệu 
     * CreatedBy: NTANH (12/11/2020)
     * */
    loadData() {
        try {
            //  Lấy thông tin các cột dữ liệu
            var columns = $("table thead th");
            var getDataUrl = this.getDataUrl;
            // Lấy thông tin dữ liệu sẽ map tương ứng với th
            //$.each(ths, function (index, item) {

            //})
            //Lấy dữ liệu về
            $.ajax({
                url: getDataUrl,
                method: "GET",
                async: false
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $.each(columns, function (index, th) {
                        var td = $(`<td></td>`);
                        var div = $(`<div></div>`);
                        var span = $(`<span></span>`);
                        var fieldName = $(th).attr('fieldname');
                        var formatType = $(th).attr('formatType');
                        var value = obj[fieldName];

                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            default:
                        }
                        span.append(value);
                        div.append(span);
                        td.append(div);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })
            }).fail(function (res) {

            })
        //binding dữ liệu
        } catch (e) {
            //Ghi log lỗi: 
            console.log(e);
        }
    }

    /**
     * Thêm mới dữ liệu
     * CreatedBy: NTA (12/11/2020)
     * */
    add() {
        
    }

    /**
     * Chỉnh sửa dữ liệu
     * CreatedBy: NTANH (12/11/2020)
     * */
    edit() {

    }

    /**
     * Xóa dữ liệu
     * CreatedBy: NTANH (12/11/2020)
     * */
    delete() {

    }

    /*
     * Active item menu
     * CreatedBy: NTANH(17/11/2020)
     */
    activeItem() {
        //var listItems = $('.item_menu');
        $.each($('.item_menu'), function (index, item) {
            if ($(item).attr('statuss') == "active") {
                $(item).addClass('bacbackground-primary');
            }
        })

        $.each($('.m-btn-footer'), function (index, item) {
            $(item).click(function () {
                $.each($('.m-btn-footer'), function (index, subIitem) {
                    $(subItem).removeAttr('statuss');
                })
                $(item).attr('statuss', 'active');
                $(item).addClass('active');
            })
        })
        
        console.log("a")
    }

    trOnSelected() {
        //var listRows = $('table tbody tr');
        //$.each(listRows, function (index, row) {
        //    row.click(function () {
        //        console.log("alo");
        //        debugger;
        //    })

        //})
        $('table tbody').on('click', 'tr', function () {
            $(this).addClass('row-selected');
        })
    }
}