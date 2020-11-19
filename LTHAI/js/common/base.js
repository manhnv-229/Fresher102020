﻿/**
 * Class chung để quản lý các sự kiện chung của chương trình
 * CreatedBy: LTHAI(12/11/2020)
 * */
class BaseJS {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.loadData();
        this.initEvents();
    }
    /**
     * Quy định dữ liệu được sử dụng để lấy dữ liệu
     * CreatedBy: LTHAI(12/11/2020)
     * */
    setApiRouter() {

    }
    /**
     * Khởi tạo các sự kiện được thực hiện trong trang
     * CreatedBy: LTHAI(15/11/2020)
     * */
    initEvents() {
        let me = this;
        //Hiển thị dialog khi nhấn nút thêm khách hàng
        $('#btn-add-customer').click(this.EventsWhenClickAddCustomer.bind(me))

        //Hiển thị dialog khi nhấn 1 lần vào từng dòng trong bảng
        $('table tbody').on('click', 'tr', function () {
            me.EventsWhenClickTr(this);
        })
        //Hiển thị dialog khi nhấn 2 lần vào từng dòng trong bảng
        $('table tbody').on('dblclick', 'tr', function () {
            me.EventsWhenDoubleClickTr(this);
        })

        //Thoát khỏi dialog bằng icon hủy hoặc nút hủy
        $('#d-btn-exit, #d-btn-cancel').click(function () {
            RefreshDialog();
        })

        //Load lại dữ liệu
        $('#btn-refresh').click(this.EventsWhenClickLoadData.bind(this))

        //Kiểm tra giá trị input bắt buộc nhập
        $('input[required]').blur(function () {
            me.EventsValidateRequiredWhenInputBlur(this);
        })
        //Kiểm tra định dạng của email
        $("input[type = 'email']").blur(function () {
            me.EventsValidateEmailWhenInputBlur(this);
        })
        //Hiển thị thông báo 
        $('#myModal').click(this.ShowModal);

        //Thêm mới dữ liệu khi ấn nút lưu trong dialog
        $('#d-btn-save').click(this.SaveDataWhenClickButtonSave.bind(me))

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
            // Loader 
            $(".loader").css('display', "block");
            // Lấy thông tin các cột dữ liệu
            let columns = $('table thead tr th');
            $.ajax({
                url: this.host + this.apiRouter,
                method: "GET"
            }).done(function (data) {
                $.each(data, function (index, obj) {
                    $(".loader").css('display', "none");
                    var tr = $(`<tr></tr>`);
                    $(tr).data("recordId", obj.CustomerId);
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
    /**
    * Hiển thị dialog khi nhấn nút thêm khách hàng
    * CreatedBy: LTHAI(15/11/2020)
    * */
    EventsWhenClickAddCustomer() {
        this.FormMode = "Add";
        $('#d-dialog').css("display", "block");
        // Lấy dữ liệu của CustomerGroup
       
        let select = $("select#CustomerGroup");
        select.empty();
        $.ajax({
            url: this.host + "/api/customergroups",
            method: "GET"
        }).done(function (res) {
            $.each(res, function (index, obj) {
                select.append(`<option value ='${obj.CustomerGroupId}'>${obj.CustomerGroupName}</option>`)
            })
        }).fail(function (res) {
            debugger
        })
        // focus vào mã khách hàng khi mở dialog
        $('#txtCustomerCode').focus();
    }
   
    /**
    * Hiển thị dialog khi nhấn 2 lần vào từng dòng trong bảng
    * CreatedBy: LTHAI(15/11/2020)
    * */
    EventsWhenDoubleClickTr(self) {
        this.FormMode = "Edit";
        let thisHere = this;
        // Lấy khóa chính của bản ghi
        thisHere.recordId = $(self).data('recordId');
        // Gọi service lấy đối tượng khách hàng theo CustomerId
        $.ajax({
            url: thisHere.host + thisHere.apiRouter + `/${thisHere.recordId}`,
            method: "GET",
            async: false
        }).done(function (res) {
            let select = $("select#CustomerGroup");
            select.empty();
            $.ajax({
                url: thisHere.host + "/api/customergroups",
                method: "GET",
                async: false
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    select.append(`<option value ='${obj.CustomerGroupId}'>${obj.CustomerGroupName}</option>`)
                })
            }).fail(function (res) {
                debugger
            })
            // Xây dựng form dựa trên thông tin sẵn có
            let inputs = $('input[bind-data], select[bind-data]');
            $.each(inputs, function (index, input) {
                let property = $(input).attr("bind-data");
                
                if ($(input).attr('type') == "radio") {
                    if (res[property] == $(input).val()) {
                        $(input).prop("checked", true);
                    }
                } else if ($(input).attr('type') == "date") {
                    let yyyyMMdd = formatDateOfBirthyyyyMMdd(res[property]);
                    $(input).val(yyyyMMdd);
                } 
                else
                {
                    $(input).val(res[property]);
                }

            })
        }).fail(function (res) {
            debugger
        })
        
        // Hiển thị dialog
        $('#d-dialog').css("display", "block");
        // focus vào mã khách hàng khi mở dialog
        $('#txtCustomerCode').focus();
    }
    /**
    * Load lại dữ liệu
    * CreatedBy: LTHAI(15/11/2020)
    * */
    EventsWhenClickLoadData() {
        this.loadData();
        $('.modal-body').text("Bạn đã load dữ liệu thành công !");
        $('#myModal').trigger('click');
    }

    /**
   * Hiển thị thông báo
   * CreatedBy: LTHAI(18/11/2020)
   * */
    ShowModal() {
        $("#staticBackdrop").modal({ backdrop: false });
        setTimeout(function () {
            $('#staticBackdrop').modal('hide');
        }, 1500);
    }
    /**
    * Hiển thị dialog khi nhấn 1 lần vào từng dòng trong bảng
    * CreatedBy: LTHAI(15/11/2020)
    * */
    EventsWhenClickTr(self){
        $('tr').css("background-color", "#ffffff");
        $(self).css("background-color", "#019160");
        $('.icon-remove').find('button').css('display', 'block');
    }
   /**
   * Kiểm tra định dạng email
   * CreatedBy: LTHAI(15/11/2020)
   * */
    EventsValidateEmailWhenInputBlur(self) {
        var value = $(self).val();
        var regexEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!regexEmail.test(value)) {
            $(self).addClass('border-red');
            $(self).attr('title', 'Email không đúng định dạng.');
            $(self).attr("validated", false);
        } else {
            $(self).removeClass('border-red');
            $(self).attr("validated", true);
        }
    }
    /**
    * Kiểm tra các trường bắt buộc
    * CreatedBy: LTHAI(15/11/2020)
    * */
    EventsValidateRequiredWhenInputBlur(self) {
        let value = $(self).val();
        if (!value) {
            $(self).addClass("border-red");
            $(self).attr('title', `${$(self).attr('name')} không được để trống`)
            $(self).attr("validated", false);
        } else {
            $(self).removeClass("border-red");
            $(self).attr("validated", true);
        }
    }
    SaveDataWhenClickButtonSave() {
        let thisHere = this;
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
        let inputs = $('input[bind-data], select[bind-data]');
        let entity = {};
        $.each(inputs, function (index, input) {
            let property = $(input).attr("bind-data");
            if ($(this).attr('type') == "radio") {
                if (this.checked) {
                    if ($(input).attr('id') == "Male") {
                        entity[property] = 1;
                    } else {
                        entity[property] = 0;
                    }
                }
            } else {
                entity[property] = $(input).val();
            }

        })
        let method = "POST";
        if (this.FormMode == "Edit") {
            method = "PUT";
            entity.CustomerId = this.recordId;
        }
      
        // Gọi service thực hiện lưu dữ liệu
        try {
            $.ajax({
                url: this.host + this.apiRouter,
                method: method,
                data: JSON.stringify(entity),
                contentType: 'application/json'
            }).done(function (res) {
                // Sau khi load dữ liệu thành công
                // + Hiện thị thông báo thêm thành công
                if (self.FormMode == "Edit") {
                    $('.modal-body').text("Bạn đã cập nhật thành công !");
                } else {
                    $('.modal-body').text("Bạn đã thêm khách hàng thành công !");
                }

                $('#myModal').trigger('click');

                // + Đóng dialog
                RefreshDialog();
                // + Load lại dữ liệu 
                thisHere.loadData();

            }).fail(function (res) {
                debugger
            })
        } catch (e) {
            console.log(e);
        }
    }
}