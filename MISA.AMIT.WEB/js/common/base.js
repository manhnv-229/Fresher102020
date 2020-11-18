/**
 * class quan li cac su kien chung cho EmployessJS, CustomerJS
 * createdby: dvquang(12/11/2020)
 * */
class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.initEvents();
        this.loadData();
    }

    /**
     * set url cho EmployeeJS, CustomerJS
     * createdby: dvquang(13/11/2020)
     * */
    setDataUrl() {

    }

    /**
     * xử lí sự kiện cho form thêm khách hàng
     * createdby: dvquang(14/11/2020)
     * */
    initEvents() {
        
        // sự kiện click thêm khach hàng mới
        $('#btnAdd').click(function () {
            // hiển thị dialog thông tin
            dialogDetail.dialog('open');
        })

        // sự kiện load lại dữ liệu sau khi nhấn load
        $('#btnRefresh').click(function () {
            alert('load xong!');
            this.loadData();
        })

        // sự kiện ẩn form thêm khách hàng khi nhấn Hủy
        $('btnClose').click(function () {
            dialogDetail.dialog('close');
        })
        // sự kiện thêm mới khách hàng khi nhấn buttton [Lưu]
        $('#btnSave').click(function () {
            // validate dữ liệu
            var inputValidates = $('input[required], input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');
            })
            var inputNotValid = $('input[validate = "false"]');
            if (inputNotValid && inputNotValid.length > 0) {
                alert('Dữ liệu không hợp lệ. Vui lòng nhập lại!')
                inputNotValid[0].focus();
                return;
            }
            // thu thập thông tin dữ liệu được nhập
            var customer = {
                "CustomerCode": $('#txtCustomerCode').val(),
                "FullName": $('#txtFullName').val(),
                "Address": $('#txtAddress').val(),
                "DateOfBirth": $('#dtDateOfBirth').val(),
                "Email": $('#txtEmail').val(),
                "PhoneNumber": $('#txtPhoneNumber').val(),
                "CustomerGroupId": "3631011e-4559-4ad8-b0ad-cb989f2177da",
                "MemberCardCode": $('#txtMemberCardCode').val()
            }
            // gọi service tương ứng lưu dữ liệu -> build thành object

            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: 'POST',
                data: JSON.stringify(customer),
                contentType: 'application/json'
            }).done(function (res) {
                alert('Thêm dữ liệu thành công!');
                //dialogDetail.dialog('close');
                //me.loadData();
                debugger;
            }).fail(function (res) {
                debugger;
            })
            // sau khi lưu thành công: đưa ra thông báo, ẩn form, load loại dữ liệu

        }.bind(this))


        // hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi
        $('table tbody').on('dblclick', 'tr', function () {
            dialogDetail.dialog('open');
        })

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
     * load dữ liệu
     * createdby: dvquang(12/11/2020)
     * */
    loadData() {
        try {
            $('table tbody').empty;
            // lấy thông tin các cột dữ liệu
            var columns = $('table thead th');
            var getDataUrl = this.getDataUrl;
            //lấy thông tin dữ liệu tương ứng với các cột
            $.ajax({
                url: getDataUrl,
                method: 'GET',
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
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
}

