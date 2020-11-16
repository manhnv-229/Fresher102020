class BaseJS {
    constructor() {
        this.dataUrl = null;
        this.setDataUrl();
        this.initEvents();
        this.loadData();
    }

    setDataUrl() { }

    initEvents() {
        var temp = this;
        //Sự kiện load lại dữ liệu:
        $('#btnRefresh').click(function () {
            temp.loadData();
        })
        //Lưu dữ liệu khi nhấn nút [Lưu]:
        $('#btnSave').click(function () {
            // validate dữ liệu:
            var inputValidates = $('input[required], input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert('Dữ liệu không hợp lệ, vui lòng kiểm tra lại!');
                inputNotValids[0].focus();
                return;
            }

            //thu thập thông tin dữ liệu được nhập -> build thành object:
            var employee = {
                'employeeCode': $('#txtEmployeeCode').val(),
                'fullName': $('#txtFullName').val(),
                'dateOfBirth': $('#dateOfBirth').val(),
                'genderName': $('#genderName').val(),
                'email': $('#email').val(),
                'phoneNumber': $('#phoneNumber').val(),
                'identity': $('#identity').val(),
                'position': $('#position').val(),
                'departmentName': $('#departmentName').val(),
                'salary': $('#salary').val(),
                'workStatusName': $('#workStatusName').val(),
                'address': $('#address').val()
            }
            
            //Gọi service tương ứng thực hiện lưu trữ dữ liệu:
            $.ajax({
                url: 'http://api.manhnv.net/api/employees',
                method: 'POST',
                data: JSON.stringify(employee),
                contentType: 'application/json'
            //Đưa ra thông báo, ẩn form chi tiết, load lại dữ liệu khi đã thêm thành công:
            }).done(function (res) {
                alert('Thêm thành công nhân viên mới!');
                $('#over, .logup').fadeOut(300, function () {
                    $('#over').remove();
                });
                temp.loadData();
            }).fail(function (res) {
            })
        })
        //Hiển thị thông tin chi tiết khi nhấn đúp chuột vào 1 bản ghi:
        $('table tbody').on('dblclick', 'tr', function () {
            var logupBox = $('a.logup-window').attr('href');
            $(logupBox).fadeIn(300);
            $('body').append('<div id="over">');
            $('#over').fadeIn(300);
        })

        /**
         * Validate bắt buộc nhập với các trường required
         * Author: TVHa (15/11/2020)
         * */
        $('input[required]').blur(function () {
            //Kiểm tran dữ liệu khi nhập, nếu để trống -> cảnh báo:
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('validate', false);
                $(this).attr('title', 'Trường này không được để trống!');
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
                $(this).removeAttr('title', 'Trường này không được để trống!');
            }
        })

        /**
         *Validate bắt buộc nhập và đúng định dạng với trường email
         * Author: TVHa (15/11/2020)
         * */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('validate', false);
                $(this).attr('title', 'Email không đúng định dạng!');
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
                $(this).removeAttr('title', 'Email không đúng định dạng!');
            }
        })
    }

    /**
    * Hàm load dữ liệu
    * Author: TVHa (12/11/2020)
    * Editor: Unknown (DD/MM/YYYY) - Do something
    * */
    loadData() {
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu:
            var columns = $('table thead th');
            var dataUrl = this.dataUrl;
            $.ajax({
                url: this.dataUrl,
                method: "GET",
                async: false,
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    // Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
                    $.each(columns, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
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
            }).fail(function (res) { })
        }
        catch (e) {
            console.log(e);
        }
    }
}