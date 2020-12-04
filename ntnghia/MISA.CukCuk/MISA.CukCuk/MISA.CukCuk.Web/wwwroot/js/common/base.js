class BaseJS {
    constructor() {
        this.host = "https://localhost:44340";
        this.apiRouter = null;
        this.filterString = '';
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

        //Sự kiện tìm kiếm nhan viên
        $('.search-employee, .search-department, .search-position').change(function (e) {
            me.setFilterString(e);
            me.filterList();
        })

        //Xóa khách hàng được chọn khi nhấn nút Delete:
        $('.btn-delete').click(me.showDeleteDialog.bind(me));

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

        //Bỏ chọn hàng trong bảng:
        $('.navbar, .header, .content-header').click(function () {
            $(document).find('td').removeClass('row-selected');
            me.recordId = null;
            me.recordCode = null;
        }); 

        //hiển thị thông tin chi tiết khi nhấn đúp chọn 1 bản ghi trên ds dữ liệu
        $('table tbody').on('dblclick', 'tr', function (e) {
            me.trDbClick(e);
        })

        $("#Salary").change(function (e) {
            me.onInputSalary(e);
        });

        //format tiền khi nhập lương
        $('input#Salary').blur(function (e) {
            me.validateInputSalary(e);
        });

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
        $('#loadingIcon').show();
        try {
            //load dữ liệu cho các combo box
            var selectDepartment = $('select.search-department');
            selectDepartment.empty();
            selectDepartment.append(`<option value="all" selected="selected">Tất cả phòng ban</option>`);

            me.listDepartment = [];
            //lấy dữ liệu phòng ban
            $.ajax({
                url: me.host + "/api/v1/Departments",
                method: 'GET'
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        me.listDepartment.push(obj);
                        var option = `<option value="${obj.DepartmentId}">${obj.DepartmentName}</option>`;
                        selectDepartment.append(option);
                    })
                }
            }).fail(function (res) {

            })

            //lấy dữ liệu chức vụ
            var selectPosition = $('select.search-position');
            selectPosition.empty();
            selectPosition.append(`<option value="all" selected="selected">Tất cả vị trí</option>`);
            me.listPosition = [];
            $.ajax({
                url: me.host + "/api/v1/Positions",
                method: 'GET'
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        me.listPosition.push(obj);
                        var option = `<option value="${obj.PositionId}">${obj.PositionName}</option>`;
                        selectPosition.append(option);
                    })
                }
            }).fail(function (res) {

            })

            //Lấy thông tin các cột dữ liệu
            $('table tbody').empty();
            var columns = $('table thead th');

            me.listEmployee = [];
            me.listEmployeeCode = [];

            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
                async: true
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    me.listEmployee.push(obj);

                    var code = parseInt(obj.EmployeeCode.substring(3, 9));
                    me.listEmployeeCode.push(code);

                    var tr = $(`<tr class="table-item"></tr>`);
                    $(tr).data('recordId', obj.EmployeeId);
                    $(tr).data('recordCode', obj.EmployeeCode);

                    // Lấy thông tin dữ liệu sẽ map với các cột tương ứng
                    $.each(columns, function (index, th) {
                        var td = $(`<td></td>`);
                        var fieldName = $(th).attr('fieldName');
                        var value = obj[fieldName];

                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "Gender":
                                value = formatGender(value);
                                break;
                            case "Date":
                                value = formatDate(value);
                                break;
                            case "Money":
                                value = formatMoney(value);
                                td.addClass("table-item-salary");
                                break;
                            case "Position":
                                value = formatPosition(value, me.listPosition);
                                break;
                            case "Department":
                                value = formatDepartment(value, me.listDepartment);
                                break;
                            case "WorkStatus":
                                value = formatWorkStatus(value);
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
                    $('#loadingIcon').hide();
                })
            }).fail(function (res) {
                $('#loadingIcon').hide();
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Set tham số truyền vào filter
     * CreatedBy:Nguyễn Trung Nghĩa (03/12/2020)
     * @param {any} e
     */
    setFilterString(e) {
        var me = this;
        var inputSearch = $('.search-employee').val();
        var departmentId = $('option:selected', $('.search-department')).attr('value');
        var positionId = $('option:selected', $('.search-position')).attr('value');
        departmentId = (departmentId == "all") ? "" : departmentId;
        positionId = (positionId == "all") ? "" : positionId;
        me.filterString = "/filter?specs=" + inputSearch + "&departmentId=" + departmentId + "&positionId=" + positionId + "";
    }

    /**
     * Lọc danh sách theo yêu cầu
     * CreatedBy:Nguyễn Trung Nghĩa (03/12/2020)
     * */
    filterList() {
        var me = this;
        $('#loadingIcon').show();
        try {
            //Lấy thông tin các cột dữ liệu
            $('table tbody').empty();
            var columns = $('table thead th');

            $.ajax({
                url: me.host + me.apiRouter + me.filterString,
                method: "GET",
                async: true
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr class="table-item"></tr>`);
                    $(tr).data('recordId', obj.EmployeeId);
                    $(tr).data('recordCode', obj.EmployeeCode);

                    // Lấy thông tin dữ liệu sẽ map với các cột tương ứng
                    $.each(columns, function (index, th) {
                        var td = $(`<td></td>`);
                        var fieldName = $(th).attr('fieldName');
                        var value = obj[fieldName];

                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "Gender":
                                value = formatGender(value);
                                break;
                            case "Date":
                                value = formatDate(value);
                                break;
                            case "Money":
                                value = formatMoney(value);
                                td.addClass("table-item-salary");
                                break;
                            case "Position":
                                value = formatPosition(value, me.listPosition);
                                break;
                            case "Department":
                                value = formatDepartment(value, me.listDepartment);
                                break;
                            case "WorkStatus":
                                value = formatWorkStatus(value);
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
                    $('#loadingIcon').hide();
                })
            }).fail(function (res) {
                $('#loadingIcon').hide();
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
            $(this).removeClass('border-red');
        })

        $('#loadingDialog').show();
        $('#Gender').val("male");
        $('#WorkStatus').val("in");

        try {
            var me = this;
            me.FormMode = 'Add';
            //Hiển thị dialog thêm nhân viên
            $('.dialog-modal').css("display", "flex");

            //Tự động thêm mã nhân viên
            var maxCode = me.listEmployeeCode.reduce(function (a, b) {
                return Math.max(a, b);
            }) + 1;
            $('#EmployeeCode').focus();
            $('#EmployeeCode').val("NV-" + maxCode);

            //load dữ liệu cho các combo box
            var selectDepartment = $('select.select-department');
            selectDepartment.empty();
            me.listDepartment = [];
            //lấy dữ liệu phòng ban
            $.ajax({
                url: me.host + "/api/v1/Departments",
                method: 'GET'
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        me.listDepartment.push(obj);
                        var option = `<option value="${obj.DepartmentId}" selected="selected">${obj.DepartmentName}</option>`;
                        selectDepartment.append(option);
                    })
                }
            }).fail(function (res) {
                console.log(res);
            })

            //lấy dữ liệu chức vụ
            var selectPosition = $('select.select-position');
            selectPosition.empty();
            me.listPosition = [];
            $.ajax({
                url: me.host + "/api/v1/Positions",
                method: 'GET'
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        me.listPosition.push(obj);
                        var option = `<option value="${obj.PositionId}" selected="selected">${obj.PositionName}</option>`;
                        selectPosition.append(option);
                    })
                }
            }).fail(function (res) {
                console.log(res);
            })
            $('#loadingDialog').hide();
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
        $('#loadingDialog').show();
        try {
            //validate dữ liệu:
            var inputValidates = $('.input-required, input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');
            })

            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                $('#snackbar').text("Dữ liệu ko hợp lệ, vui lòng kiểm tra lại!");
                $('#snackbar').css("background-color", "#FFE7AF");
                me.showToast();
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
                }
                else if ($(this).attr('id') == "Gender") {
                    if (value == "male")
                        employee[attr] = 1;
                    else if (value == "female")
                        employee[attr] = 0;
                    else
                        employee[attr] = 2;
                }
                else if ($(this).attr('id') == "Salary") {
                    employee[attr] = me.EmployeeSalary;
                }
                else if ($(this).attr('id') == "WorkStatus") {
                    if (value == "in")
                        employee[attr] = 1;
                    else
                        employee[attr] = 0;
                }
                else {
                    employee[attr] = value;
                }
            })
            console.log(employee);

            if (me.FormMode == 'Edit') {
                employee.EmployeeId = me.recordId;
                //gọi service tương ứng thực hiện lưu trữ dữ liệu
                $.ajax({
                    url: me.host + me.apiRouter + '/' + me.recordId,
                    method: "PUT",
                    data: JSON.stringify(employee),
                    contentType: 'application/json'
                }).done(function (res) {
                    //Sau khi lưu thành công:
                    // + đưa ra thông báo
                    // + ẩn form nhập
                    // + load lại dữ liệu
                    $('#snackbar').text("Sửa thành công!");
                    $('#snackbar').css("background-color", "#BAFFE7");
                    me.showToast();
                    $('.dialog-modal').css("display", "none");
                    me.loadData();
                }).fail(function (res) {
                    var response = JSON.parse(res.responseText);
                    var stringRes = response.Data;
                    $('#snackbar').text(stringRes);
                    $('#snackbar').css("background-color", "#FFCECE");
                    me.showToast();
                })
            }
            else {
                $.ajax({
                    url: me.host + me.apiRouter,
                    method: "POST",
                    data: JSON.stringify(employee),
                    contentType: 'application/json'
                }).done(function (res) {
                    //Sau khi lưu thành công:
                    // + đưa ra thông báo
                    // + ẩn form nhập
                    // + load lại dữ liệu
                    $('#snackbar').text("Thêm thành công!");
                    $('#snackbar').css("background-color", "#BAFFE7");
                    me.showToast();
                    $('.dialog-modal').css("display", "none");
                    me.loadData();
                }).fail(function (res) {
                    var response = JSON.parse(res.responseText);
                    var stringRes = response.Data;
                    $('#snackbar').text(stringRes);
                    $('#snackbar').css("background-color", "#FFCECE");
                    me.showToast();
                })
            }
            $('#loadingDialog').hide();
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
        me.recordCode = $(e.currentTarget).data('recordCode');
        $('.btn-delete').show();
    }

    /**
    * Hàm xử lí khi nhấn xóa nhân viên
    * CreatedBy: NTNghia (19/11/2020)
    * */
    showDeleteDialog() {
        var me = this;
        
        if (me.recordCode != null) {
            $('.modal-delete').css("display", "flex");
            $('#alertInfo').text(`Bạn có chắc chắn muốn xóa nhân viên ${me.recordCode}?`);
        }
        else {
            $('#snackbar').text("Vui lòng chọn nhân viên cần xóa!");
            $('#snackbar').css("background-color", "#FFE7AF");
            me.showToast();
        }
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
                $('#snackbar').text('Xóa thành công!');
                $('#snackbar').css("background-color", "#BAFFE7");
                me.showToast();
                $('.modal-delete').css("display", "none");
                me.loadData();
            }).fail(function (res) {
                $('.modal-delete').css("display", "none");
                $('#snackbar').text('Xóa không thành công!');
                $('#snackbar').css("background-color", "#FFCECE");
                me.showToast();
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
        var elements = $('.dialog-content input[id], select[id]');
        $.each(elements, function (index, input) {
            $(this).removeClass('border-red');
        })
        $('#loadingDialog').show();
        me.FormMode = 'Edit';
        try {
            //load dữ liệu cho các combo box
            var selectDepartment = $('select.select-department');
            selectDepartment.empty();
            me.listDepartment = [];
            //lấy dữ liệu phòng ban
            $.ajax({
                url: me.host + "/api/v1/Departments",
                method: 'GET'
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        me.listDepartment.push(obj);
                        var option = `<option value="${obj.DepartmentId}" selected="selected">${obj.DepartmentName}</option>`;
                        selectDepartment.append(option);
                    })
                }
            }).fail(function (res) {
                console.log(res);
            })

            //lấy dữ liệu chức vụ
            var selectPosition = $('select.select-position');
            selectPosition.empty();
            me.listPosition = [];
            $.ajax({
                url: me.host + "/api/v1/Positions",
                method: 'GET'
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        me.listPosition.push(obj);
                        var option = `<option value="${obj.PositionId}" selected="selected">${obj.PositionName}</option>`;
                        selectPosition.append(option);
                    })
                }
            }).fail(function (res) {
                console.log(res);
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
                $('.dialog-content input[id]').empty();
                $.each(elements, function (index, input) {
                    var attr = $(this).attr('id');
                    var value = res[attr];
                    if (value != null) {
                        if ($(this).attr('type') == 'date') {
                            $(this).val(formatDob(value));
                        }
                        else if ($(this).attr('type') == 'radio') {
                            if ($(this).attr('gender') == res['Gender']) {
                                $(this).attr('checked', true);
                            } else {
                                $(this).attr('checked', false);
                            }
                        }
                        else if ($(this).attr('id') == 'Gender') {
                            if (value == 0) {
                                $(this).val("female");
                            }
                            else if (value == 1) {
                                $(this).val("male");
                            }
                            else {
                                $(this).val("bede");
                            }
                        }
                        else if ($(this).attr('id') == 'Salary') {
                            $(this).val(formatMoney(value));

                        }
                        else if ($(this).attr('id') == 'WorkStatus') {
                            if (value == 1) {
                                $(this).val("in");
                            }
                            else {
                                $(this).val("out");
                            }
                        }
                        else {
                            $(this).val(value);
                        }
                    }
                })

            }).fail(function (res) {

            })

            $('.dialog-modal').css("display", "flex");
            $('#loadingDialog').hide();
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
    * Hàm kiểm tra nhập thông tin tiền lương
    * CreatedBy: NTNghia (03/12/2020)
    * */
    validateInputSalary(e) {
        var me = this;
        //Kiểm tra dữ liệu đã nhập, nếu sai thì cảnh báo
        var money = me.formatSalary(e.currentTarget.value);
        console.log(money);
        if (money == "NaN") {
            //this.classList.add("border-red");
            $(e.currentTarget).addClass('border-red');
            $(e.currentTarget).attr('title', 'Không thể định dạng tiền lương!');
            $(e.currentTarget).attr('validate', 'false');
        } else {
            $(e.currentTarget).removeClass('border-red');
            $(e.currentTarget).attr('validate', 'true');
            $(e.currentTarget).val(money);
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
    * Hàm format định dạng tiền
    * CreatedBy: NTNghia (18/11/2020)
     * */
    formatSalary(money) {
        var format = parseInt(money.replace(/,/g, ""))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        //$(this).val(format);
        return format;
    }

    /**
     * Hàm load dữ liệu cho các combo box
     * CreatedBy: NTNghia (02/12/2020)
     * */
    loadCombobox() {
        var me = this;
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

        //load dữ liệu cho các combo box
        var selectDepartment = $('select.select-department');
        selectDepartment.empty();
        me.listDepartment = [];
        //lấy dữ liệu phòng ban
        $.ajax({
            url: me.host + "/api/v1/Departments",
            method: 'GET'
        }).done(function (res) {
            if (res) {
                $.each(res, function (index, obj) {
                    me.listDepartment.push(obj);
                    var option = `<option value="${obj.DepartmentId}" selected="selected">${obj.DepartmentName}</option>`;
                    selectDepartment.append(option);
                })
            }
        }).fail(function (res) {
            console.log(res);
        })

        //lấy dữ liệu chức vụ
        var selectPosition = $('select.select-position');
        selectPosition.empty();
        me.listPosition = [];
        $.ajax({
            url: me.host + "/api/v1/Positions",
            method: 'GET'
        }).done(function (res) {
            if (res) {
                $.each(res, function (index, obj) {
                    me.listPosition.push(obj);
                    var option = `<option value="${obj.PositionId}" selected="selected">${obj.PositionName}</option>`;
                    selectPosition.append(option);
                })
            }
        }).fail(function (res) {
            console.log(res);
        })
    }

    /**
    * Hàm bắt sự kiện khi nhập lương
    * CreatedBy: NTNghia (03/12/2020)
    * */
    onInputSalary(e) {
        var me = this;
        me.EmployeeSalary = event.target.value;
        console.log(me.EmployeeSalary);
    }

    showToast() {
        // Add the "show" class to DIV
        $('#snackbar').addClass("show");

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () { $('#snackbar').removeClass("show"); }, 3500);
    }
}