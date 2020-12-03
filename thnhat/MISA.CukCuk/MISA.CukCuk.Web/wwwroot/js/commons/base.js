
class BaseJs {
    constructor() {
        this.getUrl = null;
        this.setUrl();
        this.dataLoad();
        this.initEvent();
        this.initForm();
    }
    setUrl() {

    }

    /**-----------------------------
    * Load dữ liệu
    * CreateBy: THNhat (12/11/2020)
    * */
    dataLoad() {
        // Lấy thông tin các cột dữ liệu:
        $('table tbody').empty();
        let columns = $('table thead th');
        $('.loading').show();
        $.ajax({
            url: this.getUrl,
            method: 'GET',
        }).done(function (res) {
            // Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
            $.each(res, function (index, obj) {
                let tr = $(`<tr></tr>`);
                $(tr).data('recordId', obj.CustomerId);
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
                        case "checkbox":
                            if (value > 0) {
                                value = `<input type="checkbox" checked>`;
                            } else {
                                value = `<input type="checkbox">`;
                            }
                            td.find('div').addClass("text-align-center");
                        default:
                            break;
                    }
                    td.find('span').append(value);
                    tr.append(td);
                })
                $('table tbody').append(tr);
                $('.loading').hide();
            })
        }).fail(function (res) {
            $('.loading').hide();
        })
    }

    /**-----------------------------
    * Bắt tất cá sự kiện
    * CreateBy: THNhat (19/11/2020)
    * */
    initEvent() {
        // Click vào add button
        $('#btnAdd').click(this.addCustomer.bind(this));

        // Click vào cancel button trong dialog
        $('#btnCancel').click(this.closeDialog.bind(this));

        // click vào refresh button
        $('#btnRefresh').click(this.dataLoad.bind(this));

        // click vào save button trong dialog
        $('#btnSave').click(this.editCustomer.bind(this));

        // click vào delete button trong dialog
        $('#btnDelete').click(this.showConfirmForm.bind(this));

        $('.confirmForm-iconClose,.btnCancel').click(function () {
            $("#confirmForm").hide();
        });

        // click vào delete button trong warning form
        $('.btnDelete').click(this.deleteCustomer.bind(this));

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột vào một dòng trong bảng
        $('table tbody').on('dblclick', 'tr', function (point) {
            $("#btnDelete").show();
            this.detailCustomer(point);
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
        // tạo form dialog bằng jquery ui
        this.CustomerFormDetail = $('.dialog').dialog({
            modal: true,
            autoOpen: false,
            fluid: true,
            resizable: false,
            minWidth: 800,
            title: 'THÔNG TIN KHÁCH HÀNG',

        });
    }

    /**
    * Hàm mở Dialog
    * Author THNhat (18/11/2020)
    * */
    openDialog() {
        // load nhóm khách hàng
        $.ajax({
            url: 'http://api.manhnv.net/api/customergroups',
            method: 'GET',
        }).done(function (res) {
            $.each(res, function (index, item) {
                var option = $(`<option value="${this["CustomerGroupId"]}">${this["CustomerGroupName"]}</option>`);
                $('.dialog select').append(option);
            })
        }).fail(function (res) {

        })
        // mở dialog
        this.CustomerFormDetail.dialog('open');
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
        let customer = {};
        $.each(inputs, function (index, item) {
            var fieldName = $(item).attr('fieldname');
            customer[fieldName] = $(item).val();
        });
        customer["CustomerGroupId"] = $('#CustomerGroupId option:selected').val();
        customer["Gender"] = $("input[name='gender']:checked").val();

        if (this.formMode == 'PUT') {
            customer["CustomerId"] = this.recordId;
        }
        $.ajax({
            url: this.getUrl,
            method: this.formMode,
            data: JSON.stringify(customer),
            contentType: 'application/json'
        }).done(function (res) {
            //Đưa thông báo thành công
            this.formNoti = {'state':'SUCCESS','message':'Thêm thành công'};
            this.showNoti();
            // load lại data
            this.dataLoad();
            // tắt dialog
            this.closeDialog();
        }.bind(this)).fail(function (res) {

        });
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
    detailCustomer(point) {
        this.openDialog();
        let recordId = $(point.currentTarget).data('recordId');
        this.formMode = 'PUT';
        this.recordId = recordId;
        $.ajax({
            url: this.getUrl + '/' + recordId,
            method: 'GET',
        }).done(function (res) {
            let inputs = $('.dialog input[fieldname]');
            $.each(inputs, function (index, input) {
                let fieldname = $(this).attr('fieldname');
                if (fieldname == 'DateOfBirth') {
                    let dateOfBirth = res[fieldname];
                    dateOfBirth = detailFormatDate(dateOfBirth);
                    $(this).val(dateOfBirth);
                } else {
                    $(this).val(res[fieldname]);
                }
            });
            $(`option[text='${res["CustomerGroupName"]}']`).prop('selected', true);
            $(`input[value='${res["Gender"]}']`).prop('checked', true);
        }).fail(function (res) {

        })
    }

    /**
     * Hàm xóa khách hàng
     * Author THNhat (20/11/2020)
     * */
    deleteCustomer() {
        $.ajax({
            url: this.getUrl + '/' + this.recordId,
            method: 'DELETE',
        }).done(function (res) {
            $("#confirmForm").hide();
            this.closeDialog();
            this.formNoti = { 'state': 'SUCCESS', 'message': 'Xóa thành công' };
            this.showNoti();
            // load lại data
            this.dataLoad();
        }.bind(this)).fail(function (res) {

        })
    }

    /**
    * Hàm thêm khách hàng
    * Author THNhat (20/11/2020)
    * */
    addCustomer() {
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
            url: this.getUrl + '/' + this.recordId,
            method: 'GET',
        }).done(function (res) {
            let customerName = res["FullName"];
            let customerCode = res["CustomerCode"];
            this.formNoti = { 'state': 'WARN', 'message': `Bạn có chắc muốn xóa khách hàng <span style="font-weight:bold">${customerName}</span>[<span style="font-weight:bold">${customerCode}</span>] không` };
            this.showNoti();
        }.bind(this)).fail(function (res) {

        })
        
    }
}