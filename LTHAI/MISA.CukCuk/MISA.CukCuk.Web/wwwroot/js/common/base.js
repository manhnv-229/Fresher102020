﻿/**
 * Class chung để quản lý các sự kiện chung của chương trình
 * CreatedBy: LTHAI(12/11/2020)
 * */
class BaseJS {
    constructor() {
        this.host = "https://localhost:44339";
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
        //Hiển thị dialog khi nhấn 1 lần vào từng dòng trong bảng
        $('table tbody').on('click', 'tr', function () {
            me.EventsWhenClickTr(this);
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

        // Đóng popup 
        $('.pop-up-cancel').click(me.ClosePopUp)
        
    }

    /**
     * Thực hiện load dữ liệu
     * CreatedBy: LTHAI(12/11/2020)
     **/
    loadData() {
        // Xóa thông tin trong table khi load lại nội dung
        $("#render-data").empty();
        $('table tbody').empty();
        // Loader 
        $(".loader").css('display', "block");
        // Lấy thông tin các cột dữ liệu
        let columns = $('table thead tr th');
        try {
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
    * Load lại dữ liệu
    * CreatedBy: LTHAI(15/11/2020)
    * */
    EventsWhenClickLoadData() {
        this.loadData();
    }
    /**
    * Hiển thị dialog khi nhấn 1 lần vào từng dòng trong bảng
    * @param {any} self đại diện cho đối tượng tr
    *  CreatedBy: LTHAI(15/11/2020)
    * */
    EventsWhenClickTr(self){
        if ($(self).hasClass('active')) {
            $(self).removeClass('active');
            $('.icon-remove').find('button').css('display', 'none');
        } else {
            $('tr').removeClass('active');
            $(self).addClass('active');
            $('.icon-remove').find('button').css('display', 'block');
            $('.icon-remove').find('button').data('recordId', $(self).data('recordId'));
        }
    }

    /**
    * Kiểm tra định dạng email
    * @param {any} self đại diện cho đối tượng input
    *  CreatedBy: LTHAI(15/11/2020)
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
    * Tắt pop-up
    * CreatedBy: LTHAI(19/11/2020)
    * */
    ClosePopUp() {
        $('.p-pop-up').css('display', 'none');
    }
   
}