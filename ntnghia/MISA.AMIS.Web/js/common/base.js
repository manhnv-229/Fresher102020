class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }

    setDataUrl() {

    }

    /**
    * Sự kiện cho các button
    * CreatedBy:Nguyễn Trung Nghĩa (12/11/2020)
    */
    initEvents() {
        var me = this;
        //Sự kiện khi nhấn vào button thêm mới:
        $('#btnAdd').click(function () {
            //Hiển thị dialog thêm khách hàng
            $('.dialog-modal').css("display", "flex");
        })

        //Load lại dữ liệu khi nhấn nút Refresh:
        $('.btn-refresh').click(function () {
            me.loadData();
        })
        //có thể dùng bind(this) 

        //Sự kiện khi nhấn đóng dialog:
        $('.fa-times').click(function () {
            $('.dialog-modal').css("display", "none");
        })

        $('#cancel').click(function () {
            $('.dialog-modal').css("display", "none");
        })

        //Lưu dữ liệu khi nhấn nút lưu
        $('.save-button').click(function () {
            //validate dữ liệu:
            var inputValidates = $('.input-required, input[type="email"]');
            $.each(inputValidates, function (index, input) {
                var value = $(input).val();
                $(input).trigger('blur');
            })

            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert('Dữ liệu ko hợp lệ, vui lòng kiểm tra lại!');
                inputNotValids[0].focus();
                return;
            }

            //thu thập dữ liệu được nhập -> build thành object

            //var customer = {
            //    "CustomerCode": $('#customerCode').val(),
            //    "Fullname": $('#customerName').val(),
            //    "Address": $('#customerAddress').val(),
            //    "DateOfBirth": $('#dateOfBirth').val(),
            //    "Email": $('#customerEmail').val(),
            //    "PhoneNumber": $('#customerPhone').val(),
            //    "CustomerGroupId": "3631011e-4559-4ad8-b0ad-cb989f2177da",
            //    "MemberCardCode": $('#cardCode').val(),
            //    "IsStopFollow": false,
            //    "CustomerGroupName": $('#customerGroup').val()
            //}

            var customer = {}
            var elements = $('.dialog-content input');
            $.each(elements, function (index, input) {
                var attr = $(input).attr('id');
                customer[attr] = $(input).val();
            })
            //console.log(customer);


            //gọi service tương ứng thực hiện lưu trữ dữ liệu
            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: 'POST',
                data: JSON.stringify(customer),
                contentType:'application/json'
            }).done(function (res) {
                alert('Thêm thành công!');
                $('.dialog-modal').css("display", "none");
                me.loadData();             
            }).fail(function (res) {

            })

            //Sau khi lưu thành công:
            // + đưa ra thông báo
            // + ẩn form nhập
            // + load lại dữ liệu
        })

        //hiển thị thông tin chi tiết khi nhấn đúp chọn 1 bản ghi trên ds dữ liệu
        $('table tbody').on('dblclick', 'tr', function () {
            $('.dialog-modal').css("display", "flex");
        })
        //$('tr').dblclick(function () {
        //    $('.dialog-modal').css("display", "flex");
        //})


        //validate bắt buộc nhập
        $('.input-required').blur(function () {
            //Kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
            var value = $(this).val();
            if (!value) {
                //this.classList.add("border-red");
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống!');
                $(this).attr('validate', 'false');
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', 'true');
            }

        })

        //validate email đúng định dạng
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng!');
                $(this).attr('validate', 'false');
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', 'true');
            }
        })
    }

    /**
    * Load dữ liệu từ api
    * CreatedBy:Nguyễn Trung Nghĩa (12/11/2020)
    */
    loadData() {
        try {
            $('table tbody').empty();
            //Lấy thông tin các cột dữ liệu
            var columns = $('table thead th');
            var dataUrl = this.getDataUrl;

            $.ajax({
                url: dataUrl,
                method: "GET",
                //async: true
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr class="table-item"></tr>`);

                    // Lấy thông tin dữ liệu sẽ map với các cột tương ứng
                    $.each(columns, function (index, th) {
                        var td = $(`<td></td>`);
                        var fieldName = $(th).attr('fieldName');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "Date":
                                value = formatDate(value);
                                break;
                            case "Money":
                                value = formatMoney(value);
                                td.addClass("table-item-salary");
                                break;
                            case "Address":
                                td.addClass("table-item-address");
                                break;
                            case "Email":
                                td.addClass("table-item-email");
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