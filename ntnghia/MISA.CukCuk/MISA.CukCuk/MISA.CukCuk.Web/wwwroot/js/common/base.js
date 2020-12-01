class BaseJS {
    constructor() {
        this.host = "";
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

        //Sự kiện nhập liệu vào ô tìm kiếm
        $(".search-employee").keyup(function (e) {
            me.onSearchChange(e);
        });

        //Xóa khách hàng được chọn khi nhấn nút Delete:
        $('.btn-delete').click(function () {
            $('.modal-delete').css("display", "flex");
        });

        $('#delete').click(me.btnDeleteOnClick.bind(me));

        //Sự kiện khi nhấn đóng dialog:
        $('.fa-times').click(me.hideDialog);

        $('.cancel-button').click(me.hideDialog);

        //Lưu dữ liệu khi nhấn nút lưu
        $('.save-button').click(me.btnSaveOnClick.bind(me))

        //nhấn 1 lần vào hàng trong bảng sẽ tô màu hàng
        $('table tbody').on('click', 'tr', function (e) {
            me.onTableRowClick(e);
        });

        //hiển thị thông tin chi tiết khi nhấn đúp chọn 1 bản ghi trên ds dữ liệu
        $('table tbody').on('dblclick', 'tr', function (e) {
            me.trDbClick(e);
        })

        //validate bắt buộc nhập
        $('.input-required').blur(me.validateInput)

        //validate email đúng định dạng
        $('input[type="email"]').blur(me.validateEmail)
    }

    /**
    * Ẩn form nhập dữ liệu
    * CreatedBy:Nguyễn Trung Nghĩa (20/11/2020)
    */
    hideDialog() {
        $('.dialog-modal').css("display", "none");
        $('.modal-delete').css("display", "none");
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

            me.listEmployee = [];

            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
                async: true
            }).done(function (res) {
                $.each(res, function (index, obj) {

                    me.listEmployee.push(obj);
                    var tr = $(`<tr class="table-item"></tr>`);
                    $(tr).data('recordId', obj.EmployeeId);

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
        var elements = $('.dialog-content input[id], select[id]');
        $.each(elements, function (index, input) {
            $(this).val(null);
        })

        try {
            var me = this;
            me.FormMode = 'Add';
            //Hiển thị dialog thêm khách hàng
            $('.dialog-modal').css("display", "flex");

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
        try {
            //validate dữ liệu:
            var inputValidates = $('.input-required, input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');
            })

            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert('Dữ liệu ko hợp lệ, vui lòng kiểm tra lại!');
                inputNotValids[0].focus();
                return;
            }

            //thu thập dữ liệu được nhập -> build thành object

            var employee = {}
            //lấy tất cả control nhập liệu:
            var elements = $('.dialog-content input[id], select[id]');
            $.each(elements, function (index, input) {
                var attr = $(this).attr('id');
                var value = $(this).val();

                //Check trường hợp input là radio button, lấy ra giới tính
                if ($(this).attr('type') == "radio") {
                    if (this.checked) {
                        employee[attr] = value;
                    }
                } else {
                    employee[attr] = value;
                }
            })
            console.log(employee);

            var method = "POST";
            var txt_alert = "Thêm thành công!";
            if (me.FormMode == 'Edit') {
                method = "PUT";
                txt_alert = "Sửa thành công!";
                employee.EmployeeId = me.recordId;
            }

            //gọi service tương ứng thực hiện lưu trữ dữ liệu
            $.ajax({
                url: me.host + me.apiRouter,
                method: method,
                data: JSON.stringify(employee),
                contentType: 'application/json'
            }).done(function (res) {
                //Sau khi lưu thành công:
                // + đưa ra thông báo
                // + ẩn form nhập
                // + load lại dữ liệu
                alert(txt_alert);
                $('.dialog-modal').css("display", "none");
                me.loadData();
            }).fail(function (res) {
                alert(res);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
    * Hàm xử lí khi nhấn vào 1 hàng trong bảng
    * CreatedBy: NTNghia (19/11/2020)
    * */
    onTableRowClick(e) {
        var me = this;
        $('table tbody tr').find('td').removeClass('row-selected');
        $(e.currentTarget).find('td').addClass('row-selected');
        me.recordId = $(e.currentTarget).data('recordId');
        $('.btn-delete').show();
    }

    /**
    * Hàm xử lí khi nhấn button xóa
    * CreatedBy: NTNghia (19/11/2020)
    * */
    btnDeleteOnClick() {
        var me = this;
        try {
            //Gọi service lấy thông tin chi tiết qua id
            $.ajax({
                url: me.host + me.apiRouter + `/` + me.recordId,
                method: "DELETE"
            }).done(function (res) {
                alert('Xóa thành công!');
                $('.modal-delete').css("display", "none");
                me.loadData();
            }).fail(function (res) {
                $('.modal-delete').css("display", "none");
                alert('Xóa không thành công!');
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
    * Hàm xử lí khi nhấn 2 lần vào 1 hàng trong bảng
    * CreatedBy: NTNghia (18/11/2020)
    * */
    trDbClick(e) {
        var me = this;
        me.FormMode = 'Edit';
        try {
            //load dữ liệu cho các combo box
            var select = $('select#CustomerGroupId');
            select.empty();

            //lấy dữ liệu nhóm khách hàng
            $.ajax({
                url: me.host + "/api/customergroups",
                method: 'GET'
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        var option = `<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`;
                        select.append(option);
                    })
                }
            }).fail(function (res) {

            })

            //Lấy khóa chính của bản ghi
            var recordId = me.recordId;

            //Gọi service lấy thông tin chi tiết qua id
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET"
            }).done(function (res) {
                //Binding lên form chi tiết:
                var elements = $('.dialog-content input[id], select[id]');
                $.each(elements, function (index, input) {
                    var attr = $(this).attr('id');
                    var value = res[attr];
                    if (value != null) {
                        if ($(this).attr('type') == 'date') {
                            $(this).val(formatDob(value));
                        } else if ($(this).attr('type') == 'radio') {
                            console.log(res['FullName']);
                            console.log($(this));
                            console.log($(this).attr('gender'));
                            console.log(res['Gender']);
                            console.log($(this).attr('gender') == res['Gender']);
                            if ($(this).attr('gender') == res['Gender']) {
                                $(this).attr('checked', true);
                            } else {
                                $(this).attr('checked', false);
                            }
                        } else {
                            $(this).val(value);
                        }
                    }
                })

            }).fail(function (res) {

            })

            $('.dialog-modal').css("display", "flex");
        } catch (e) {
            console.log(e);
        }
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

    /**
     * Hàm bắt sự kiện khi nhập vào ô tìm kiếm
     * CreatedBy: NTNghia (01/12/2020)
     * */
    onSearchChange(e) {
        var me = this;
        $('table tbody').empty();
        //Lấy thông tin các cột dữ liệu
        var columns = $('table thead th');
        console.log(event.target.value);
        var allEntity = me.listEmployee;
        debugger
        var filtered = allEntity.filter(function (element) {
            //if (element.FullName.includes(event.target.value) || element.EmployeeCode.includes(event.target.value) || element.PhoneNumber.includes(event.target.value))
            //    return true;
            //else
            //    return false;
            return element.FullName.includes(event.target.value);
        });

        $.each(filtered, function (index, obj) {
                var tr = $(`<tr class="table-item"></tr>`);
                $(tr).data('recordId', obj.EmployeeId);

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
    }
}