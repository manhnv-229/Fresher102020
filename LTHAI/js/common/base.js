/**
 * Class chung để quản lý các sự kiện chung của chương trình
 * CreatedBy: LTHAI(12/11/2020)
 * */
class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }
    /**
     * Quy định dữ liệu được sử dụng để lấy dữ liệu
     * CreatedBy: LTHAI(12/11/2020)
     * */
    setDataUrl() {

    }
    /**
     * Khởi tạo các sự kiện được thực hiện trong trang
     * CreatedBy: LTHAI(15/11/2020)
     * */
    initEvents() {
         let me = this;

         /**
         * Hiển thị dialog khi nhấn nút thêm khách hàng hoặc khu nhấn vào từng dòng trong bảng
         * CreatedBy: LTHAI(15/11/2020)
         * */
        $('#btn-add-customer').click(function () {
            $('#d-dialog').css("display", "block");
            // focus vào mã khách hàng khi mở dialog
            $('#txtCustomerCode').focus();
        })

        /**
        * Hiển thị dialog khi nhấn 2 lần vào từng dòng trong bảng
        * CreatedBy: LTHAI(15/11/2020)
        * */
        $('table tbody').on('dblclick', 'tr', function () {
            $('#d-dialog').css("display", "block");
            // focus vào mã khách hàng khi mở dialog
            $('#txtCustomerCode').focus();
        })


        /**
        * Thoát khỏi dialog bằng icon hủy hoặc nút hủy
        * CreatedBy: LTHAI(15/11/2020)
        * */
        $('#d-btn-exit, #d-btn-cancel').click(function () {
            RefreshDialog();
        })

        /**
        * Load lại dữ liệu
        * CreatedBy: LTHAI(15/11/2020)
        * */
        $('#btn-refresh').click(function () {
            me.loadData();
            alert("Bạn đã load dữ liệu thành công !");
        })

        /**
        * Kiểm tra giá trị input bắt buộc nhập
        * CreatedBy: LTHAI(15/11/2020)
        * */
        $('input[required]').blur(function () {
            let value = $(this).val();
            if (!value) {
                $(this).addClass("border-red");
                $(this).attr('title', `${$(this).attr('name')} không được để trống`)
                $(this).attr("validated", false);
            } else {
                $(this).removeClass("border-red");
                $(this).attr("validated", true);
            }
           
        })
        /**
        * Kiểm tra định dạng của email
        * CreatedBy: LTHAI(15/11/2020)
        * */
        $("input[type = 'email']").blur(function () {
            var value = $(this).val();
            var regexEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!regexEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng.');
                $(this).attr("validated", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validated", true);
            }
        })
        /**
        * Thêm mới dữ liệu khi ấn nút lưu trong dialog
        * CreatedBy: LTHAI(15/11/2020)
        * */
        $('#d-btn-save').click(function () {
            let self = this;
            // Validate dữ liệu
            let inputValidates = $('input[required], input[type = "email"]')
            $.each(inputValidates, function (index, input) {
                 $(input).trigger('blur');
            })
            // Lấy các thẻ input có thuộc tính validated = false
            let inputNotValids = $('input[validated = "false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.");
                inputNotValids[0].focus();
                return;
            }
            // Xây dựng dữ liệu được lấy thành object
            // + Lấy các thẻ input,select trong dialog
            let inputs = $('#d-dialog input,#d-dialog select');
            let customer = {
                "CustomerGroupId": "3631011e-4559-4ad8-b0ad-cb989f2177da"
            }
            $.each(inputs, function (index, input) {  
                let property = $(input).attr("bind-data");
                if (property) {
                    customer[property] = $(input).val();
                }
            })
            // Gọi service thực hiện lưu dữ liệu
            try {
                $.ajax({
                    url: 'http://api.manhnv.net/api/customers',
                    method: 'POST',
                    data: JSON.stringify(customer),
                    contentType: 'application/json'
                }).done(function (res) {
                    // Sau khi load dữ liệu thành công
                    // + Hiện thị thông báo thêm thành công
                    alert('Thêm khách hàng thành công!');
                    // + Đóng dialog
                    RefreshDialog();
                    // + Load lại dữ liệu 
                    self.loadData();
                    
                }).fail(function (res) {
                    debugger
                })
            } catch (e) {
                console.log(e);
            }
           
            

        }.bind(this))
    }
    /**
     * Thực hiện load dữ liệu
     * CreatedBy: LTHAI(12/11/2020)
     **/
    loadData() {
        // Xóa thông tin trong table khi load lại nội dung
        $("#render-data").empty();
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu
            let columns = $('table thead tr th');
            $.ajax({
                url: this.getDataUrl,
                method: "GET"
            }).done(function (data) {
                $.each(data, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    // Lấy thông tin dữ liệu sẽ map tương ứng với các cột
                    $.each(columns, function (index, item) {
                        let td = $(`<td><span></span></td>`);
                        let fieldName = $(item).attr("fieldName");
                        let value = obj[fieldName];
                        //Lấy thông tin các cột có thuộc tính formatType để format dữ liệu theo chuẩn
                        let formatType = $(item).attr("formatType");
                        // Duyệt qua từng trường hợp 
                        switch (formatType) {
                            case "ddmmyyyy": {
                                td.addClass("text-align-center");
                                value = formatDateOfBirth(value);
                                break;
                            }
                            case "Money": {
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        // Thêm nội dung vào thẻ tr trong tbody
                        td.find('span').append(value);
                        $(tr).append(td);
                    })
                    $("#render-data").append(tr);
                })
            }).fail(function (res) {

            })
        } catch (e) {
            alert("Can't get data");
            console.log(e);
        }
    }
}