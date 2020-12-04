
class BaseJs {
    constructor() {
        this.Host = '';
        this.endPoint = '';
        this.Router = null;
        this.setUrl();
        this.loadTable();
        this.loadFilter();
        this.initEvent();
        this.initForm();
    }
    setUrl() {

    }

    /**-----------------------------
    * Load dữ liệu
    * CreateBy: THNhat (12/11/2020)
    * */
    loadTable() {
        // Lấy thông tin các cột dữ liệu:
        $('table tbody').empty();
        $('.emptyBody').hide();
        let columns = $('table thead th');
        $('.loading').show();
        $.ajax({
            url: this.Host + this.Router + this.endPoint,
            method: 'GET',
        }).done(function (res) {
            // Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
            $.each(res, function (index, obj) {
                let tr = $(`<tr></tr>`);
                $(tr).data('recordId', obj.EmployeeId);
                $.each(columns, function (index, item) {
                    let td = $(`<td><div><span></span></div></td>`);
                    let fieldName = $(item).attr('fieldname');
                    let value = obj[fieldName];
                    let formatType = $(item).attr('formatType');
                    switch (formatType) {
                        case "ddmmyyyy":
                            value = formatDate(value);
                            break;
                        case "money":
                            td.find('div').addClass("text-align-right");
                            value = formatMoney(value);
                            break;
                        default:
                            break;
                    }
                    td.find('span').append(value);
                    tr.append(td);
                })
                $('table tbody').append(tr);
            })
            $('.loading').hide();
            if ($('table tbody').is(':empty')) $('.emptyBody').show();
        }).fail(function (res) {
            $('.loading').hide();
        })
    }

    loadFilter() {
        this.getDepartments('#cxbDepartment');
        this.getPositions('#cxbPosition');
    }
    /**-----------------------------
    * Bắt tất cá sự kiện
    * CreateBy: THNhat (19/11/2020)
    * */
    initEvent() {
        // Click vào add button
        $('#btnAdd').click(this.addCustomer.bind(this));

        $("input[data-type='currency']").on({
            keyup: function () {
                formatCurrency($(this));
            }
        });

        // Click vào cancel button trong dialog
        $('#btnCancel').click(this.closeDialog.bind(this));

        // click vào refresh button
        $('#btnRefresh').click(function () {
            this.endPoint = '';
            this.loadTable();
        }.bind(this));

        // click vào save button trong dialog
        $('#btnSave').click(this.editCustomer.bind(this));

        // click vào delete button trong dialog
        $('#btnDelete').click(this.showConfirmForm.bind(this));

        $('.confirmForm-iconClose,.btnCancel').click(function () {
            $("#confirmForm").hide();
        });

        $('#cxbDepartment,#cxbPosition').change(this.filterTable.bind(this));

        $("#txtSearch").keyup(function (event) {
            if (event.keyCode === 13) {
                this.filterTable();
            }
        }.bind(this));

        // click vào delete button trong warning form
        $('.btnDelete').click(this.deleteCustomer.bind(this));

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột vào một dòng trong bảng
        $('table tbody').on('dblclick', 'tr', function (point) {
            $("#btnDelete").show();
            this.showDetailCustomer(point);
        }.bind(this));

        /*
         * Validate dữ liệu nhập vào
         */
        $('input[required]').blur(this.validateEmpty);
        $('input[type="email"]').blur(this.validateEmail);
    }

    /**-----------------------------
    * Tạo form dialog
    * CreateBy: THNhat (19/11/2020)
    * */
    initForm() {
        var me = this;
        // tạo form dialog bằng jquery ui
        this.CustomerFormDetail = $('.dialog').dialog({
            modal: true,
            autoOpen: false,
            fluid: true,
            resizable: true,
            minWidth: 800,
            title: 'THÔNG TIN NHÂN VIÊN',
        });
    }

    /**
    * Hàm mở Dialog
    * Author THNhat (18/11/2020)
    * */
    openDialog() {
        this.getGenders('.dialog select[fieldname = "GenderId"]');
        this.getDepartments('.dialog select[fieldname = "DepartmentId"]');
        this.getPositions('.dialog select[fieldname = "PositionId"]');
        this.getStates('.dialog select[fieldname = "StateId"]');
        // mở dialog
        this.CustomerFormDetail.dialog('open');
    }

    getGenders(selectName) {
        $.ajax({
            url: '/api/v1/Genders',
            method: 'GET',
        }).done(function (res) {
            $.each(res, function (index, item) {
                var option = $(`<option value="${this["GenderId"]}">${this["GenderName"]}</option>`);
                $(`${selectName}`).append(option);
            })
        }).fail(function (res) {

        })
    }

    getDepartments(selectName) {
        $.ajax({
            url: '/api/v1/Departments',
            method: 'GET',
        }).done(function (res) {
            $.each(res, function (index, item) {
                var option = $(`<option value="${this["DepartmentId"]}">${this["DepartmentName"]}</option>`);
                $(`${selectName}`).append(option);
            })
        }).fail(function (res) {

        })
    }

    getPositions(selectName) {
        $.ajax({
            url: '/api/v1/Positions',
            method: 'GET',
        }).done(function (res) {
            $.each(res, function (index, item) {
                var option = $(`<option value="${this["PositionId"]}">${this["PositionName"]}</option>`);
                $(`${selectName}`).append(option);
            })
        }).fail(function (res) {

        })
    }

    getStates(selectName) {
        $.ajax({
            url: '/api/v1/States',
            method: 'GET',
        }).done(function (res) {
            $.each(res, function (index, item) {
                var option = $(`<option value="${this["StateId"]}">${this["StateName"]}</option>`);
                $(`${selectName}`).append(option);
            })
        }).fail(function (res) {

        })
    }

    /**
    * Hàm đóng Dialog
    * Author THNhat (18/11/2020)
    * */
    closeDialog() {
        // xóa các dữ liệu đang có trong dialog
        let inputs = $('input');
        $.each(inputs, function (index, input) {
            $(this).removeClass('border-red');
            $(this).attr('title', '');
            $(this).attr('validate', 'true');
        })
        $('.dialog input').val(null);
        $('.dialog select').empty();
        // tắt dialog
        this.CustomerFormDetail.dialog('close');
        $("#btnDelete").hide();
    }

    /**
    * Hàm thêm một khách hàng từ dữ liệu được nhập vào dialog
    * Author THNhat (18/11/2020)
    * */
    editCustomer() {
        // validate dữ liệu
        let inputValidates = $('input[required], input[type="email"]');
        $.each(inputValidates, function (index, input) {
            $(input).trigger('blur');
        })

        let inputNotValids = $('input[validate = "false"]');
        if (inputNotValids && inputNotValids.length > 0) {
            this.formNoti = { 'state': 'FAIL', 'message': 'Dữ liệu không hợp lệ vui lòng kiểm tra lại' };
            this.showNoti();
            inputNotValids[0].focus();
            return;
        }

        // Thu thập dữ liệu được nhập -> build thành project
        let inputs = $('.dialog input[fieldname]');
        let employee = {};
        $.each(inputs, function (index, item) {
            var fieldName = $(item).attr('fieldname');
            employee[fieldName] = $(item).val();
        });
        let selects = $('.dialog select');
        $.each(selects, function (index, select) {
            var fieldName = $(select).attr('fieldname');
            employee[fieldName] = $(`select[fieldname = "${fieldName}"] option:selected`).val();
        });
        if (this.formMode == 'PUT') {
            employee["EmployeeId"] = this.recordId;
            this.endPoint ='/' + this.recordId;
        } else {
            this.endPoint = '';
        }
        $.ajax({
            url: this.Host + this.Router + this.endPoint,
            method: this.formMode,
            data: JSON.stringify(employee),
            contentType: 'application/json'
        }).done(function (res) {
            debugger;
            if (res.MISACode == 100) {
                if (this.formMode == 'PUT') {
                    this.formNoti = { 'state': 'SUCCESS', 'message': 'Sửa thành công' };
                } else {
                    this.formNoti = { 'state': 'SUCCESS', 'message': 'Thêm thành công' };
                }
                this.showNoti();
                // load lại data
                this.endPoint = '';
                this.loadTable();
                // tắt dialog
                this.closeDialog();
            } else if (res.MISACode == 900) {
                this.formNoti = { 'state': 'FAIL', 'message': res.Data };
                this.showNoti();
            }
            //Đưa thông báo thành công
            
        }.bind(this)).fail(function (res) {
            this.formNoti = { 'state': 'FAIL', 'message': res.responseJSON.Data[0] };
            this.showNoti();
        }.bind(this));
        //gọi service tương ứng

    }

    /**
    * Hàm kiểm tra định dạng không được bỏ trống
    * Author THNhat (19/11/2020)
    * */
    validateEmpty() {
        var value = $(this).val();
        if (!value) {
            $(this).addClass('border-red');
            $(this).attr('title', 'Trường này không được để trống');
            $(this).attr('validate', 'false');
        } else {
            $(this).removeClass('border-red');
            $(this).attr('title', '');
            $(this).attr('validate', 'true');
        }
    }

    /**
    * Hàm kiểm tra định dạng email
    * Author THNhat (19/11/2020)
    * */
    validateEmail() {
        var email = $(this).val();

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            $(this).addClass('border-red');
            $(this).attr('title', 'Email không đúng định dạng');
            $(this).attr('validate', 'false');

        } else {
            $(this).removeClass('border-red');
            $(this).attr('title', '');
            $(this).attr('validate', 'true');
        }
    }

    /**
     * Hàm xem chi tiết khách hàng
     * Author THNhat (18/11/2020)
     * */
    showDetailCustomer(point) {
        this.endPoint = '';
        this.openDialog();
        let recordId = $(point.currentTarget).data('recordId');
        this.formMode = 'PUT';
        this.recordId = recordId;
        $.ajax({
            url: this.Host + this.Router + '/' + recordId,
            method: 'GET',
        }).done(function (res) {
            let inputs = $('.dialog input[fieldname]');
            $.each(inputs, function (index, input) {
                let fieldname = $(this).attr('fieldname');
                if (this.type == "date") {
                    let dateOfBirth = res[fieldname];
                    dateOfBirth = detailFormatDate(dateOfBirth);
                    $(this).val(dateOfBirth);
                } else {
                    $(this).val(res[fieldname]);
                }
            });
            let selects = $('.dialog select[fieldname]');
            $.each(selects, function (index, select) {
                let fieldname = $(this).attr('fieldname');
                let datas = $('.dialog option');
                $.each(datas, function (index, data) {
                    if (data.value == res[fieldname]) $(data).prop('selected', true);
                });
            });
        }).fail(function (res) {

        })
    }

    /**
     * Hàm xóa khách hàng
     * Author THNhat (20/11/2020)
     * */
    deleteCustomer() {
        $.ajax({
            url: this.Host + this.Router + '/' + this.recordId,
            method: 'DELETE',
        }).done(function (res) {
            $("#confirmForm").hide();
            this.closeDialog();
            this.formNoti = { 'state': 'SUCCESS', 'message': 'Xóa thành công' };
            this.showNoti();
            // load lại data
            this.loadTable();
        }.bind(this)).fail(function (res) {

        })
    }

    /**
    * Hàm thêm khách hàng
    * Author THNhat (20/11/2020)
    * */
    addCustomer() {
        $.ajax({
            url: '/api/v1/Employees/EmployeeCodeMax?',
            method: 'GET',
        }).done(function (res) {
            var resString = String(Number(res.substring(2)) + 1);
            while (resString.length < res.length - 2) {
                resString = '0' + resString;
            }
            $("#txtEmployeeCode").val('NV' + resString);
        }).fail(function (res) {

        })
        this.openDialog();
        this.formMode = 'POST';
    }

    /**
    * Hàm hiển thị thông báo
    * Author THNhat (20/11/2020)
    * */
    showNoti() {
        switch (this.formNoti['state']) {
            case 'SUCCESS':
                $("#notiSuccess").fadeIn(0).html(`${this.formNoti['message']}`);
                $("#notiSuccess").fadeOut(2000);
                break;
            case 'FAIL':
                $("#notiFail").fadeIn("slow").html(`${this.formNoti['message']}`);
                $("#notiFail").fadeOut(5000);
                break;
            case 'WARN':
                $("#confirmForm").show();
                $(".confirmForm-content-text").html(this.formNoti['message']);
                break;
        }
    }
    showConfirmForm() {
        $.ajax({
            url: this.Host + this.Router + '/' + this.recordId,
            method: 'GET',
        }).done(function (res) {
            let customerName = res["FullName"];
            let customerCode = res["EmployeeCode"];
            this.formNoti = { 'state': 'WARN', 'message': `Bạn có chắc muốn xóa khách hàng <span style="font-weight:bold">${customerName}</span>[<span style="font-weight:bold">${customerCode}</span>] không` };
            this.showNoti();
        }.bind(this)).fail(function (res) {

        })
    }

    filterTable() {
        var specs = $('#txtSearch').val();
        var departmentId = $('#cxbDepartment option:selected').val();
        var PositionId = $('#cxbPosition option:selected').val();
        this.endPoint = '/filter?specs=' + specs + '&DepartmentId=' + departmentId + '&PositionId=' + PositionId;
        this.loadTable();
    }
}