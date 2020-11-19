

/**
 * Class quản lý 
 * created by ngochtb(13/11/2020)*/
class BaseJS {
    constructor() {
        this.getDataURL = null;
        this.setDataURL();
        this.initEvent();
        this.loadData();

    }

    setDataURL() {

    }

    initEvent() {
        var me = this;
        //Sự kiện click khi nhấn vào thêm mới
        $('#btnAdd').click(function () {
            //Hiển thị dialog thông tin chi tiết
            dialogDetail.dialog('open');
        })

        //Load lại dữ liệu khi nhấn button nạp:
        $('#btnRef').click(function () {
            me.loadData();
        })

        //Ẩn form chi tiết khi nhấn huỷ
        $('#btnCancel').click(function () {
            dialogDetail.dialog('close');
        })

        //Thực hiện lưu dữ liệu khi nhấn button lưu trên form chi tiết
        $('#btnSave').click(function () {
            //validate dữ liệu
            var inputValidates = $('.input-required, #txtEmail');
                $.each(inputValidates, function (index,input) {
                    $(input).trigger(`blur`);
                })
            var notInput = $('input[validate=false]');
            if (notInput && notInput.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại!");
                notInput[0].focus();
                return;
            }

            //thu thập thông tin dữ liệu được nhập
            var customer = {
                "CustomerCode": $('#txtCustomerCode').val(),
                "FullName": $('#txtFullName').val(),
                "Address": $('#txtAddress').val(),
                "DateOfBirth": $('#txtDateOfBirth').val(),
                "Email": $('#txtEmail').val(),
                "PhoneNumber": $('#txtPhoneNumber').val(),
                "CustomerGroupId": "3631011e-4559-4ad8-b0ad-cb989f2177da",
                "MemberCardCode": $('#txtCode').val(),
            }

            //gọi service tương ứng thực hiện lưu trữ dữ liệu
            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: 'POST',
                data: JSON.stringify(customer),
                contentType:'application/json'
            }).done(function (res) {
                debugger;
            }).fail(function () {
                debugger;
            })
            //sau khi lưu thành công:
                //+đưa ra thông báo, 

                //+ẩn form chi tiết, 

                //+load lại dữ liệu
        })

        //Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi
        $('table tbody').on('dblclick', 'tr', function () {
            dialogDetail.dialog('open');
        })

        //Kiểm tra trường để trống
        $('.input-required').blur(function () {
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })

        //Kiểm tra định dạng email
        $('#txtEmail').blur(function () {
            var value = $(this).val();
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })
    }

    loadData() {
        $('table tbody').empty();
        //Lấy thông tin cột dữ liệu
        var columns = $('table thead tr th');
        var fieldNames = [];
        var getDataURL = this.getDataURL;
        $.ajax({
            url: getDataURL,
            method: "GET",
        }).done(function (res) {

            $.each(res, function (index, obj) {
                var tr = $(`<tr></tr>` );
                 //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
                $.each(columns, function (index, th) {
                    var td = $(`<td></td>`); 
                    var fieldName = $(th).attr('fieldName');
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
    }
}
