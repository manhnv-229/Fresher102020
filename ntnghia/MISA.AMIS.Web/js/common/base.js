class BaseJS {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.loadData();
        this.initEvents();
    }

    setApiRouter() {

    }

    /**
    * Sự kiện cho các button
    * CreatedBy:Nguyễn Trung Nghĩa (12/11/2020)
    */
    initEvents() {
        var me = this;
        //Sự kiện khi nhấn vào button thêm mới:
        $('#btnAdd').click(me.btnAddOnClick.bind(me));

        //Load lại dữ liệu khi nhấn nút Refresh:
        $('.btn-refresh').click(function () {
            me.loadData();
        })
        //có thể dùng .bind(this) 

        //Sự kiện khi nhấn đóng dialog:
        $('.fa-times').click(function () {
            $('.dialog-modal').css("display", "none");
        })

        $('#cancel').click(function () {
            $('.dialog-modal').css("display", "none");
        })

        //Lưu dữ liệu khi nhấn nút lưu
        $('.save-button').click(me.btnSaveOnClick.bind(me))

        //hiển thị thông tin chi tiết khi nhấn đúp chọn 1 bản ghi trên ds dữ liệu
        $('table tbody').on('dblclick', 'tr', function () {
            $(this).find('td').addClass('row-selected');
            me.FormMode = 'Edit';
            //load dữ liệu cho các combo box
            var select = $('select#CustomerGroupId');
            select.empty();

            //lấy dữ liệu nhóm khách hàng
            $.ajax({
                url: me.host + "/api/customergroups",
                method: 'GET'
            }).done(function (res) {
                if (res) {
                    console.log(res);
                    $.each(res, function (index, obj) {
                        var option = `<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`;
                        select.append(option);
                    })
                }
            }).fail(function (res) {

            })

            //Lấy khóa chính của bản ghi
            var recordId = $(this).data('recordId');
            me.recordId = recordId;

            //Gọi service lấy thông tin chi tiết qua id
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET"
            }).done(function (res) {
                console.log(res);
                //Binding lên form chi tiết:
                var elements = $('.dialog-content input[id], select[id]');
                $.each(elements, function (index, input) {
                    var attr = $(this).attr('id');
                    var value = res[attr];
                    $(this).val(value);
                    //Check trường hợp input là radio button, lấy ra giới tính
                    //if ($(this).attr('type') == "radio") {
                    //    if (this.checked) {
                    //        customer[attr] = value;
                    //    }
                    //} else {
                    //    customer[attr] = value;
                    //}
                })
            }).fail(function (res) {

            })

            $('.dialog-modal').css("display", "flex");
        })

        //validate bắt buộc nhập
        $('.input-required').blur(me.validateInput)

        //validate email đúng định dạng
        $('input[type="email"]').blur(me.validateEmail)
    }

    /**
    * Load dữ liệu từ api
    * CreatedBy:Nguyễn Trung Nghĩa (12/11/2020)
    */
    loadData() {
        var me = this;
        try {
            $('table tbody').empty();
            //Lấy thông tin các cột dữ liệu
            var columns = $('table thead th');

            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
                async: true
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr class="table-item"></tr>`);
                    $(tr).data('recordId', obj.CustomerId);

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

    /**
     * Hàm xử lí khi nhấn button thêm khách hàng
     * CreatedBy: NTNghia (18/11/2020)
     * */
    btnAddOnClick() {
        try {
            var me = this;
            me.FormMode = 'Add';
            //Hiển thị dialog thêm khách hàng
            $('.dialog-modal').css("display", "flex");

            //load dữ liệu cho các combo box
            var select = $('select#CustomerGroupId');
            select.empty();
            console.log(select);

            //lấy dữ liệu nhóm khách hàng
            $.ajax({
                url: me.host + "/api/customergroups",
                method: 'GET'
            }).done(function (res) {
                if (res) {
                    console.log(res);
                    $.each(res, function (index, obj) {
                        var option = `<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`;
                        select.append(option);
                    })
                }
            }).fail(function (res) {

            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
    * Hàm xử lí khi nhấn button lưu
    * CreatedBy: NTNghia (18/11/2020)
    * */
    btnSaveOnClick() {
        var me = this;
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

        var customer = {}
        //lấy tất cả control nhập liệu:
        var elements = $('.dialog-content input[id], select[id]');
        $.each(elements, function (index, input) {
            var attr = $(this).attr('id');
            var value = $(this).val();

            //Check trường hợp input là radio button, lấy ra giới tính
            if ($(this).attr('type') == "radio") {
                if (this.checked) {
                    customer[attr] = value;
                }
            } else {
                customer[attr] = value;
            }
        })
        console.log(customer);

        var method = "POST";
        if (me.FormMode == 'Edit') {
            method = "PUT";
            customer.CustomerId = me.recordId;
        }

        //gọi service tương ứng thực hiện lưu trữ dữ liệu
        $.ajax({
            url: me.host + me.apiRouter,
            method: method,
            data: JSON.stringify(customer),
            contentType: 'application/json'
        }).done(function (res) {
            //Sau khi lưu thành công:
            // + đưa ra thông báo
            // + ẩn form nhập
            // + load lại dữ liệu
            alert('Thêm thành công!');
            $('.dialog-modal').css("display", "none");
            me.loadData();
        }).fail(function (res) {
            console.log(res);
        })
    }

    /**
    * Hàm xử lí khi nhấn 2 lần vào 1 hàng trong bảng
    * CreatedBy: NTNghia (18/11/2020)
    * */
    trDbClick(me) {
        $(this).find('td').addClass('row-selected');
        me.FormMode = 'Edit';
        //load dữ liệu cho các combo box
        var select = $('select#CustomerGroupId');
        select.empty();

        //lấy dữ liệu nhóm khách hàng
        $.ajax({
            url: me.host + "/api/customergroups",
            method: 'GET'
        }).done(function (res) {
            if (res) {
                console.log(res);
                $.each(res, function (index, obj) {
                    var option = `<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`;
                    select.append(option);
                })
            }
        }).fail(function (res) {

        })

        //Lấy khóa chính của bản ghi
        var recordId = $(this).data('recordId');
        me.recordId = recordId;
        console.log(recordId);

        console.log(me.host + me.apiRouter + `/${recordId}`);
        //Gọi service lấy thông tin chi tiết qua id
        $.ajax({
            url: me.host + me.apiRouter + `/${recordId}`,
            method: "GET"
        }).done(function (res) {
            console.log(res);
            //Binding lên form chi tiết:
            var elements = $('.dialog-content input[id], select[id]');
            $.each(elements, function (index, input) {
                var attr = $(this).attr('id');
                var value = res[attr];
                $(this).val(value);
                //Check trường hợp input là radio button, lấy ra giới tính
                //if ($(this).attr('type') == "radio") {
                //    if (this.checked) {
                //        customer[attr] = value;
                //    }
                //} else {
                //    customer[attr] = value;
                //}
            })
        }).fail(function (res) {

        })

        $('.dialog-modal').css("display", "flex");
    }

    /**
    * Hàm kiểm tra nhập thông tin input
    * CreatedBy: NTNghia (18/11/2020)
    * */
    validateInput() {
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
    }

    /**
    * Hàm kiểm tra email đã đúng định dạng?
    * CreatedBy: NTNghia (18/11/2020)
    * */
    validateEmail() {
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
    }
}