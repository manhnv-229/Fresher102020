class BaseJS {
    /**
    *  Hàm khởi tạo
    *  create by: HTANH (12/11/2020)
    * */
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.initEvents();
        this.loadData();
        
    }
    

    /**
     * Hàm tạo url
     * Created by: HTAnh (11/2020)
     * */
    setApiRouter() {
    }


    /**
     * Hàm sự kiện
     * Created by: HTAnh (11/2020)
     * */
    initEvents() {
        var arrow = this;
        /* ------------------------------------
         * Tắt/ẩn dialog
         */
        $('#btnX').click(hideDialog);
        $('#btnCancel').click(hideDialog);


        /* ------------------------------------
         * Tắt dialog hỏi xác nhận xóa
         */
        $('#btnCancelDelete').click(hideDialog);


        /* ------------------------------------
         * Hiển thị dialog thêm lao động
         */
        $('#btnAdd').click(arrow.addDialog.bind(this))
        

        /* ------------------------------------
         * Làm mới dữ liệu trong bảng
         */ 
        $('#btnRefresh').click(refreshData.bind(this));


        /* ------------------------------------
         * Hiển thị dialog khi doubleclicks vào từng dòng trên bảng
         */
        $('table tbody').on('dblclick', 'tr', function (e) {
            //var lala = this; // gán this của tr vào lala -bỏ vì a Mạnh cho cách mới hay hơn
            arrow.FormMode='Edit';
            arrow.editData(e);
        });

        /* ------------------------------------
         * Hiển thị dialog xác nhận có xóa không
         */
        $('#btnDelete').click(function () {
            //$('.confirm-dialog').removeClass('hide');
            $('.confirm-dialog').removeClass('hide');
            $('.m-dialog').addClass('hide');
        });


        /* ------------------------------------
         * Thực hiện xóa
         */
        $('#btnConfirmDelete').click(arrow.deleteData.bind(this));


        /* ------------------------------------
         * Validate nhập dữ liệu:
         */
        $('input[required]').blur(validateEmpty);


        /* ------------------------------------
        * validate email đúng định dạng
        */
        $('input[type="email"]').blur(validateEmail);


        /* ------------------------------------
         * Thực hiện kiểm tra và lưu dữ liệu vào database
         */
        $('#btnSave').click(arrow.saveData.bind(this));
    }


    /**
     * Hàm lưu dữ liệu vào cơ sở dữ liệu
     * Created by: HTAnh (12/11/2020)
     * */
    saveData() {
        var inputVaidates = $('input[required], input[type="email"]');
        $.each(inputVaidates, function (index, input) {
            $(input).trigger('blur');
        })
        var inputNotValids = $('input[validate="false"]');
        if (inputNotValids && inputNotValids.length > 0) {
            //hiện thông báo
            this.showNotification('Dữ liệu không hợp lệ');
            $('.notification-content').addClass('error-icon');
            setTimeout(function () {
                $('.notification-content').addClass('hide');
                $('.notification-content').removeClass('error-icon');
            }, 3000);
            inputNotValids[0].focus();
            return;
        }
        var a = $('input[field], .m-dialog option[name="CustomerGroup"]:checked');
        var customer = {};
        //Thực hiện truyền data vào object
        $.each(a, function (index, data) {
            var test = $(data).attr('field');
            var value = $(data).val();
            if ($(this).attr('type') == "radio") {
                if (this.checked) {
                    customer[test] = value;
                }
            } else {
                customer[test] = value;
            }
        })
        //arrow.FormMode = "";
        var method = "POST";
        if (this.FormMode == 'Edit') {
            method = "PUT";
            customer.CustomerId = this.recordId;
        }
        if (method == "POST") {
            if (customer.CustomerId) delete customer.CustomerId;
        }
        //gọi service để thêm/sửa và lưu vào cơ sở dữ liệu
        $.ajax({
            url: this.host + this.apiRouter,
            method: method,
            data: JSON.stringify(customer),
            contentType: 'application/json'
        }).done(function (res) {
            if (method == 'PUT') {
                this.showNotification('Sửa thành công');
                $('.notification-content').addClass('success-icon');
                setTimeout(function () {
                    $('.notification-content').addClass('hide');
                    $('.notification-content').removeClass('success-icon');
                }, 3000);
            } else {
                //hiện thông báo
                this.showNotification('thêm thành công');
                $('.notification-content').addClass('success-icon');
                setTimeout(function () {
                    $('.notification-content').addClass('hide');
                    $('.notification-content').removeClass('success-icon');
                }, 3000);
            }
            hideDialog(); // ẩn form điền
            this.loadData();// load lại dữ liệu
        }.bind(this)).fail(function (res) {
        })

    }


    /**
     * Hiển thị dialog sửa thông tin khách hàng
     * Created by: HTAnh (18/11/2020)
     * */
    editData(lala) {
        var host = this.host;
        $('.m-dialog').removeClass('hide');
        $('#btnDelete').removeClass('hide');
        var api = $('#cbxCustomerGroup').attr('api');
        var fieldId = $('select#cbxCustomerGroup').attr('fieldId');
        var fieldName = $('select#cbxCustomerGroup').attr('fieldName');
        var url2 = host + "/api/" + api;
        //gọi service, truyền data nhóm khách hàng cho select
        var select = $('select#cbxCustomerGroup');
        select.empty();
        $.ajax({
            url: host + "/api/"+api,
            method: "GET",
            async:false
        }).done(function (res) {
            if (res) {
                $.each(res, function (index, object) {
                    var option = $(`<option field="CustomerGroupId" name="CustomerGroup" value="${object[fieldId]}">${object[fieldName]}</option>`);
                    select.append(option);
                })
            }
            
        }).fail(function (res) {
          
        })
        var apiRouter = this.apiRouter;
        var recordId = $(lala.currentTarget).data('recordId');
        var url = host + apiRouter + `/${recordId}`;
        //lưu lại id để phục vụ cho việc xóa và sửa
        this.recordId = recordId;
        //// Goị service lấy thông tin chi tiết qua id
        $.ajax({
            url: url,
            method: "GET",
            async:false
        }).done(function (res) {
            var a = $('input[field],select[field]');
            //Thực hiện truyền data vào các input
            $.each(a, function (index, data) {
                var test = $(data).attr('field');
                var value = res[test];
                if (test == 'DateOfBirth') {
                    value = formatDateHigh(value);
                }
                if (test == 'CustomerGroupName') {
                    var optionLALA = $('option[name]');
                    $.each(optionLALA, function (index, option) {
                        if (value == $(this).text()) {
                            $(this).attr('selected', '1');
                        }
                    })
                } else if (test == 'Gender') {
                    $(`input[value="${value}"]`).prop('checked', true);
                } else {
                    $(this).val(value);
                }
            })
            
        }).fail(function (res) {

        })
    }

    /**
     * Hiển thị dialog sửa thông tin khách hàng
     * Created by: HTAnh (11/2020)
     * */
    addDialog() {
        var host = this.host;
        $('#btnDelete').addClass('hide');
        this.FormMode = 'Add';
        $('.m-dialog').removeClass('hide');
        $('.value-take').val(''); //clear input khi bấm vào nút
        var select = $('select#cbxCustomerGroup');
        select.empty();
        $('.loading').show();
        //Lấy thông tin về nhóm khách hàng
        $.ajax({
            url: host + "/api/customergroups",
            method: "GET"
        }).done(function (res) {
            if (res) {
                $.each(res, function (index, object) {
                    var option = $(`<option field="CustomerGroupId" name="CustomerGroup" value="${object.CustomerGroupId}">${object.CustomerGroupName}</option>`);
                    select.append(option);
                })
            }
            $('.loading').hide();
        }).fail(function (res) {
            $('.loading').hide();
        })
    }

    /**
     * Xóa dữ liệu
     * Created by: HTAnh (18/11/2020)
     * */
    deleteData() {
        $.ajax({
            url: this.host + this.apiRouter + '\\' + this.recordId,
            method: 'DELETE',
        }).done(function (res) {
            //hiện thông báo
            this.showNotification('xóa thành công');
            $('.notification-content').addClass('success-icon');
            setTimeout(function () {
                $('.notification-content').addClass('hide');
                $('.notification-content').addClass('success-icon');
            }, 3000);
            hideDialog(); // ẩn form điền
            this.loadData();// load lại dữ liệu
        }.bind(this)).fail(function (res) {
        })
    }

   
    /**
     *  Load dữ liệu
     *  create by: HTANH (12/11/2020)
     * */
    loadData() {
        var arrow = this;
        $('table tbody').empty();
        // lấy thông tin các cột dữ liệu
        console.log("test load");
        var ths = $('table thead th');
        $('.loading').show();
        //Gọi service, truyền dữ liệu vào trong bảng
        $.ajax({
            url: arrow.host + arrow.apiRouter,
            method: "GET",
            async:true ,
        }).done(function (res) {
            $.each(res, function (index, obj) {
                var tr = $(`<tr></tr>`);
                $(tr).data('recordId', obj.CustomerId);
                $.each(ths, function (index, th) {
                    var td = $(`<td></td>`);
                    var fieldName = $(th).attr('fieldname');
                    var formatType = $(th).attr('formatType');
                    var value = obj[fieldName];
                    switch (formatType) {
                        case "ddmmyyyy":
                            value = formatDate(value);
                            break;
                        case "money":
                            value = formatMoney(value);
                            break;
                        default:
                            break;
                    }
                    if (fieldName == 'Gender') {
                        if (value == 1) value = 'Nam';
                        else if (value == 0) value = 'Nữ';
                        else value = 'Khác';
                    }
                    td.append(value);
                    $(tr).append(td);
                })
                $('table tbody').append(tr);
                $('.loading').hide();

            })
        }).fail(function (res) {
            $('.loading').show();
        })
    }

    /**
     * Hàm hiện thông báo
     * Created by: HTAnh (21/11/2020)
     * @param {any} noti
     */
    showNotification(noti) {
        $('.notification-content').removeClass('hide');
        $('.notification-content').html(noti);
    }
}