/**
 *  Class Dùng chung
 *  CreatedBy: NTANH (12/11/2020)
 * */

class BaseJS {
    constructor() {
        this.host = 'http://api.manhnv.net/';
        this.apiRouter = null;
        this.setApiRouter();
        this.loadData();
        this.initEvents();
        this.activeItem();
        this.trOnSelected();
        //this.openPopup();
    }
    /**
     *  Lấy url api
     *  CreatedBy: NTANH (18/11/2020)
     * */
    setApiRouter() {

    }

    /**
     *  Khởi tạo Event
     *  CreatedBy: NTANH (15/11/2020)
     * */
    initEvents() {
        var me = this;
        // Sự kiện click khi nhấn thêm mới
        $('#btnAdd').click(me.btnAddOnClick.bind(me));

        // Load lại dữ liệu khi nhấn button nạp
        $('#btnRefresh').click(function () {
            me.loadData(me.FormMode = '');
            $('#contentMessenger').empty();
            $('#contentMessenger').append("Load dữ liệu thành công.")
            $('.messenger-complete').addClass('animationHide');
            setTimeout(function () {
                $('.messenger-complete').removeClass('animationHide');
                console.log("ok");
            }, 3000);
            
        })

        // Ẩn form chi tiết khi nhấn hủy, back_def, button close
        $('#btnCloseDialog').click(function () {
            dialogDetail.dialog('close');
        })

        $('#btnClosePopup').click(function () {
            dialogWarning.dialog('close');
        })

        // Thực hiện lưu dữ liệu khi nhấn button Lưu trên form chi tết
        $('#btnSave').click(me.btnSaveOnClick.bind(me));

        //Thực hiện xóa khi nhân button Xóa trên tools bar
        $('#btnDelete').click(function () {
            dialogWarning.dialog('open');
            $('#btnDeleteCustomer').click(function () {
                //Lấy khóa chính bản ghi
                var recordId = me.recordId
                //me.recordId = recordId;
                console.log("recordId", recordId);
                //Gọi service lấy thông tin chi tiết qua Id
                $.ajax({
                    url: me.host + me.apiRouter + `/${recordId}`,
                    method: 'DELETE',
                    async: true
                }).done(function (res) {
                    // Đóng DialogWarning
                    // Gọi Messenger Aleart
                    dialogWarning.dialog('close');
                    me.loadData(me.FormMode = '');
                    $('#contentMessenger').empty();
                    $('#contentMessenger').append("Đã xóa thành công.")
                    $('.messenger-complete').addClass('animationHide');
                    setTimeout(function () {
                        $('.messenger-complete').removeClass('animationHide');
                        console.log("ok");
                    }, 3000);
                }).fail(function (res) {
                    console.log("fail");
                })
            })
        })
        // Hiển thị thông tin chi tiết cho 1 bản ghi khi ấn đúp chuột
        $('table tbody').on('dblclick', 'tr', function () {
            me.FormMode = 'Edit';
            
            //Lấy dữ liệu nhóm khách hàng
            //Load dữ liệu cho các combobox
            var select = $('select#cbxCustomerGroup');
            select.empty();
            //Lấy dữ liệu nhóm khách hàng
            $('.loading-modal').show();
            $.ajax({
                url: me.host + "api/customergroups",
                method: "GET"
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                        select.append(option);
                    })
                }
                $('.loading-modal').hide();
            }).fail(function (res) {
                $('.loading-modal').hide();
            })
            //Lấy khóa chính bản ghi
            var recordId = $(this).data('recordId');
            me.recordId = recordId;
            console.log(recordId);
            //Gọi service lấy thông tin chi tiết qua Id
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: 'GET'
            }).done(function (res) {
                //Building lên form chi tiết
                // Lấy tất cả các control nhập liệu
                var inputs = $('input[fieldName], select[fieldName]');
                var entity = {};
                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldName');
                    var value = res[propertyName];

                    /*
                     * Check với trường hợp input là radio, 
                     * */
                    if ($(this).attr('fieldName') == "DateOfBirth") {
                        value = formatDate(value, "dialog");
                        $(this).val(value);
                    }
                    // Check với trường hợp giới tính
                    if ($(this).attr('fieldName') == "Gender") {
                        if ($(this).attr('genderId') == value) {
                            this.checked = true;
                        }
                    }
                    
                    $(this).val(value);
                })
            }).fail(function (res) {

            })
            dialogDetail.dialog('open');

        })
        /*
         * Validate bắt buộc nhập
         * CreatedBy: NTANH 15/11/2020
         */
        $('input[required]').blur(function () {
            // Kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })

        /*
         *  Valide email đúng định dạng
         *  CreatedBy: NTANH 15/11/2020
         */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })
    }
    /**
     * Load dữ liệu 
     * CreatedBy: NTANH (12/11/2020)
     * */
    loadData() {
        var me = this;
        
        try {
            $('#btnDelete').hide();
            $('table tbody').empty();
            //  Lấy thông tin các cột dữ liệu
            var columns = $("table thead th");
            var getDataUrl = this.getDataUrl;
            // Lấy thông tin dữ liệu sẽ map tương ứng với th
            //$.each(ths, function (index, item) {

            //})
            //Lấy dữ liệu về
            $('.loading-modal').show();
            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
                async: true
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $(tr).data('recordId', obj.CustomerId);
                    $.each(columns, function (index, th) {
                        var td = $(`<td></td>`);
                        var div = $(`<div></div>`);
                        var span = $(`<span></span>`);
                        var fieldName = $(th).attr('fieldname');
                        var formatType = $(th).attr('formatType');
                        var value = obj[fieldName];

                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value, "table");
                                break;
                            case "money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            case "gender":
                                td.addClass("text-align-center");
                                value = formatGender(value);
                                break;
                            default:
                        }
                        span.append(value);
                        div.append(span);
                        td.append(div);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                    $('.loading-modal').hide();
                    //debugger;
                    if (me.FormMode == 'Add') {
                        if ($(tr).data('recordId') == $(obj).attr('CustomerId')) {
                            $(tr).addClass('row-selected');
                            $('#btnDelete').show();
                            me.FormMode = '';
                        }
                    }
                    else if (me.FormMode == 'Edit') {
                        if ($(tr).data('recordId') == me.recordId) {
                            $(tr).addClass('row-selected');
                            $('#btnDelete').show();
                        }
                    }
                })
            }).fail(function (res) {
                $('.loading-modal').hide();
            })
            //binding dữ liệu
        } catch (e) {
            //Ghi log lỗi: 
            console.log(e);
        }
    }

    /**
     * Thêm mới dữ liệu
     * CreatedBy: NTA (12/11/2020)
     * */
    add() {

    }

    /**
     * Chỉnh sửa dữ liệu
     * CreatedBy: NTANH (12/11/2020)
     * */
    edit() {

    }

    /**
     * Xóa dữ liệu
     * CreatedBy: NTANH (12/11/2020)
     * */
    delete() {

    }

    /*
     * Active item menu
     * CreatedBy: NTANH(17/11/2020)
     */
    activeItem() {
        //var listItems = $('.item_menu');
        console.log("activeItem");
        var me = this;
        $.each($('.item_menu'), function (index, item) {
            if ($(item).attr('statuss') == "active") {
                $(item).addClass('bacbackground-primary');
            }
        })

        $.each($('.m-btn-footer'), function (index, item) {
            if ($(item).attr('statuss') == 'active') {
                $(item).addClass('active');
            }
            
            $(item).click(function () {
                $.each($('.m-btn-footer'), function (index, subIitem) {
                    $(subItem).removeAttr('statuss');
                })
                $(item).attr('statuss', 'active');
                $(item).addClass('active');
            })
        })

    }
    /**
     * Chọn tr khi click
     * CreatedBy: NTA (17/11/2020)
     * */
    trOnSelected() {
        var me = this;
        $('table tbody').on('click', 'tr', function () {
            $.each($('table tbody tr'), function (index, item) {
                $(this).removeClass('row-selected');
            })
            $(this).addClass('row-selected');
            $('#btnDelete').show();
            //Lấy khóa chính bản ghi
            var recordId = $(this).data('recordId');
            me.recordId = recordId;
            console.log(recordId);
            //Gọi service lấy thông tin chi tiết qua Id
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: 'GET'
            }).done(function (res) {
                //Building lên form chi tiết
                // Lấy tất cả các control nhập liệu
                var infors = $('#nameCustomer, #idCustomer');
                infors.empty();
                $.each(infors, function (index, infor) {
                    var propertyName = $(this).attr('fieldName');
                    var value = res[propertyName];
                    $(this).append(value);
                })
            }).fail(function (res) {

            })
            console.log(this);
        })
    }
    /**
     * Mở Popup thông báo
     * CreatedBy: NTANH (17/11/2020)
     * */
    //openPopup() {
    //    $('#btnDelete').on('click', function () {
    //        dialogWarning.dialog('open');
    //        //$('.messenger-complete').addClass('animationHide');
    //        //setTimeout(function () {
    //        //    $('.messenger-complete').removeClass('animationHide');
    //        //    console.log("ok");
    //        //}, 3000);
    //    })

    //}
    /**
     * Hàm thực hiện khi nhấn button Thêm mới
     * CreatedBy: NTANH (18/11/2020 )
     * */
    btnAddOnClick() {
        try {
            var me = this;
            me.FormMode = 'Add';
            // Hiển thị dialog thông tin chi tiết
            dialogDetail.dialog('open');
            $('input').val(null);
            //Load dữ liệu cho các combobox
            var select = $('select#cbxCustomerGroup');
            select.empty();
            //Lấy dữ liệu nhóm khách hàng
            $('.loading-modal').show();
            $.ajax({
                url: me.host + "api/customergroups",
                method: "GET"
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                        select.append(option);
                    })
                }
                $('.loading-modal').hide();
            }).fail(function (res) {
                $('.loading-modal').hide();
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm thực hiện khi nhấn button Lưu
     * CreatedBy: NTANH (18/11/2020 )
     * */
    btnSaveOnClick() {
        var me = this;
        //Validate dữ liệu
        me.saved = 1;
        var inputValidates = $('input[required], input[type="email"]');
        $.each(inputValidates, function (index, input) {
            $(input).trigger('blur');
        })

        var inputNotValids = $('input[validate="false"]');
        if (inputNotValids && inputNotValids.length > 0) {
            alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại");
            inputNotValids[0].focus();
            return;
        }
        // Thu thập thông tin dữ liệu
        // Lấy tất cả các control nhập liệu
        var inputs = $('input[fieldName], select[fieldName]');
        var entity = {};
        $.each(inputs, function (index, input) {
            var propertyName = $(this).attr('fieldName');
            var value = $(this).val();
            /*
             * Check với trường hợp input là radio, chỉ
             * value của input có attr là checked*/
            if ($(this).attr('type') == "radio") {
                if (this.checked) {
                    value = $(this).attr('genderId');
                    entity[propertyName] = value;
                }
            }
            else {
                entity[propertyName] = value;
            }

        })
        console.log("entity", entity)
        var method = 'POST';
        if (me.FormMode == 'Edit') {
            method = 'PUT';
            entity.CustomerId = me.recordId;
        }
        console.log("method", method);
        // Gọi service thực hiện lưu dữ liệu
        $.ajax({
            url: me.host + me.apiRouter,
            method: method,
            data: JSON.stringify(entity),
            contentType: 'application/json'
        }).done(function (res) {
            // Đưa ra thông báo và ẩn form chi tiết và load lại dữ liệu
            dialogDetail.dialog('close');
            me.loadData();
            if (method == 'POST') {
                $('#contentMessenger').empty();
                $('#contentMessenger').append("Đã thêm thành công.")
                $('.messenger-complete').addClass('animationHide');
                setTimeout(function () {
                    $('.messenger-complete').removeClass('animationHide');
                    console.log("ok");
                }, 3000);
            }
            else {
                $('#contentMessenger').empty();
                $('#contentMessenger').append("Đã sửa thành công.")
                $('.messenger-complete').addClass('animationHide');
                setTimeout(function () {
                    $('.messenger-complete').removeClass('animationHide');
                    console.log("ok");
                }, 3000);
                
                
            }
        }).fail(function (res) {
            console.log(res);
        })
        
    }
}