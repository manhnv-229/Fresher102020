class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.initEvents();
        this.loadData();
    }


    setDataUrl() {

    }

    initEvents() {
        var c = this;
        // Sự kiện click khi nhấn thêm mới:
        $('#btnAdd').click(function () {
            // Hiển thị dialog thông tin chi tiết:
            dialogDetail.dialog('open');
        })

        // Load lại dữ liệu khi nhấn button nạp:
        $('#btnRefresh').click(function () {
            c.loadData();
        })

        $('#btnRefresh').click(function () {
            c.loadData();
        })

        // Ẩn form chi tiết khi Cancel:
        $('#btnCancel').click(function () {
            // Hiển thị dialog 
            dialogDetail.dialog('close');
        })

        // Thực hiện lưu dữ liệu khi nhấn button [Save] trên dialog:
        $('#btnSave').click(function () {
            var save = this;
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
             var customer = {
            //     "CustomerCode": $('#txtCustomerCode').val(),
            //     "FullName": $('#txtFullName').val(),
            //     "Address": $('#txtAddress').val(),
            //     "DateOfBirth": $('#dtDateOfBirth').val(),
            //     "Email": $('#txtEmail').val(),
            //     "PhoneNumber": $('#txtPhoneNumber').val(),
                "CustomerGroupId": "3631011e-4559-4ad8-b0ad-cb989f2177da",
            //     "MemberCardCode": $('#txtMemberCardCode').val()
             }
            // 
            
            var field = $('input[fieldNameSave]');
            $.each(field , function(index , data){
                var fieldNameSave = $(data).attr('fieldNameSave');
                var value = $(this).val();
                customer[fieldNameSave] = value;
            })


            


            // Gọi service thực hiện thêm mới
            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: 'POST',
                data: JSON.stringify(customer),
                contentType: 'application/json'
            }).done(function (res) {
                // Sau khi lưu thành công thì: 
                // thông báo thành công , reload data , close dialog
                alert('thêm thành công!');
                dialogDetail.dialog('close');
                c.loadData();
                
            }).fail(function (res) {
                
            })


        }.bind(this))


        // Hiện thi thông tin 1 bản ghi khi double click
        $('table tbody').on('dblclick', 'tr', function () {
            dialogDetail.dialog('open');
        })

        /* ------------------------
         * validate không được để trống:
         * CreatedBy: NTDong (13/11/2020)
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

        /* ------------------------------------
        * validate email theo định dạng 
        * CreatedBy: NVDong (14/11/2020)
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

    /** ------------------------
     * Load dữ liệu
     * CreatedBy: NTDong (12/11/2020)
     * */
    loadData() {
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu:
            var columns = $('table thead th');
            var getDataUrl = this.getDataUrl;
            $.ajax({
                url: getDataUrl,
                method: "GET",
                async: false,
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    // Lấy thông tin dữ liệu tương ứng với các cột:
                    $.each(columns, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldname');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "Money":
                                td.addClass("text-align-right");
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
        } catch (e) {
            console.log(e);
        }
    }
}