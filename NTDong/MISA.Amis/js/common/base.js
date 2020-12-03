$(document).ready(function () {
    datePickerDetail = $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy'
    });
    datePickerDetail.datepicker('enable');
})


class BaseJS {
    constructor() {
        this.host = "https://localhost:44308";
        this.apiRouter = null;
        this.setApiRouter();
        this.initEvents();
        this.initEventDelete();
        this.loadData();
        // this.InitDepartments();
    }

    setApiRouter() {

    }
    /**-------------------
     * quản lý các sự kiện 
     * createdBy : NTDong(12/11/2020)
     */
    initEvents() {
        var me = this;
        // Sự kiện click khi nhấn thêm mới:
        $('#btnAdd').click(me.btnAddOnClick.bind(me));

        // Sự kiện focus khi click đổi trang
        $(".button-footer").focus(this.btnChangePageOnFocus);

        // Load lại dữ liệu khi nhấn button nạp:
        $('#btnRefresh').click(function () {
            me.loadData();
        })

        // Ẩn form chi tiết khi nhấn hủy:
        $('#btnCancel').click(function () {
            // Hiển thị dialog thông tin chi tiết:
            dialogDetail.dialog('close');
        })
        // $("#search").keyup(function(event) {
        //     if (event.keyCode === 13) {
        //         $("#search").click();

        //     }
       
        // $('#search').on('keydown', function (e) {
        //     if (e.which == 13) {
        //         alert('nguyen tien dong ');
        //         me.SearchInput(this);
        //     }
        // });

        // Xử lý dữ liệu button [Lưu] trên form chi tiết:
        $('#btnSave').click(me.btnSaveOnClick.bind(me));

        // click để đổi màu của hàng trong bảng ghi
        $('table tbody').on('click', 'tr', function (){
            $(this).siblings().removeClass("click-change-column");
            $(this).addClass("click-change-column");
        })
        

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi trên danh sách dữ liệu:
        $('table tbody').on('dblclick', 'tr', function () {
            try{
                 //load form
                // load dữ liệu cho các combobox:
                
                var selects = $('select[fieldName]');
                $.each(selects, function (index, select) {
                    // lấy dữ liệu nhóm khách hàng:
                    var api = $(select).attr('api');
                    var fieldName = $(select).attr('fieldName');
                    var fieldValue = $(select).attr('fieldValue');
                    $('.loading').show();
                    $.ajax({
                        url: me.host + api,
                        method: "GET",
                        async: true
                    }).done(function (res) {
                        if (res) {
                            console.log(res);
                            $.each(res, function (index, obj) {
                                var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                                console.log(select);
                                $(select).append(option);
                                console.log(option);
                            })
                        }
                        $('.loading').hide();
                    }).fail(function (res) {
                        $('.loading').hide();
                    })
                })
                
                me.FormMode = 'Edit';
                // Lấy khóa chính của bản ghi:
                var recordId = $(this).data('recordId');
                me.recordId = recordId;
                // Gọi service lấy thông tin chi tiết qua Id:
                $.ajax({
                    url: me.host + me.apiRouter + `/${recordId}`,
                    method: "GET",
                    async: true
                }).done(function (res) {
                    // Binding dữ liệu lên form chi tiết:
                    console.log(res);

                    // Lấy tất cả các control nhập liệu:
                    var inputs = $('input[fieldName], select[fieldName]');
                    var entity = {};
                    $.each(inputs, function (index, input) {
                        var propertyName = $(input).attr('fieldName');
                        var value = res[propertyName];
                        
                        // Đối với hàm format money
                        if ($(this).attr("typeName") == 'money') {
                            var money = formatMoney(value);
                            $(this).val(money);
                        }
                        
                        // Đối với dropdowlist (select option):
                        else if (this.tagName == "SELECT") {
                            var propValueName = $(this).attr('fieldValue');
                            value = res[propValueName];
                        }
                        else if ($(this).attr('type') == "date") {
                            var date = formatDateForm(value);
                            $(this).val(date);
                        } 
                        else {
                            $(this).val(value).change();
                        }
                        debugger;
                    })
                }).fail(function (res) {
                    console.log(res);
                })  

                // Mở form chi tiết khách hàng
                dialogDetail.dialog('open');
            }catch(e){
                console.log(e);
            }
        })

        /* --------------------
         * validate yêu cầu nhập
         * CreatedBy: NTDong(14/11/2020)
         */
        $('input[required]').blur(function () {
            // Kiểm tra dữ liệu đã nhập, cảnh báo nếu dữ liệu trống 
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
 
        })

        /* --------------------------
        * validate email đúng yêu cầu
        * CreatedBy: NTDong(14/11/2020)
        */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng.');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })
    }
    /**
     * Xử lý form xóa khách hàng
     * createdBy : NTDong(18/11/2020)
     */
    initEventDelete(){
        var me = this;
        // Đóng form xóa khách hàng
        $('#d-cancle').click(function(){
            dialogDelete.dialog('close');
        })
        // Mở form xóa chi tiết 
        $('#btnDelete').click(function(){
            var tr = $('tr.click-change-column');
            var recordIds = $(tr).data('recordId');
            if(recordIds != null){
                dialogDelete.dialog('open');
            }
            debugger;
            
        })        
        // click xóa để thực hiện xóa 1 bản ghi trong bảng khách hàng
        $('#d-delete').click(function(){
            var tr = $('tr.click-change-column');
            var recordId = $(tr).data('recordId');
            $.ajax({
            url: me.host + me.apiRouter + `/${recordId}`,
            method: "DELETE",
            async:true
            }).done(function(res){
                //hiển thị thông báo thành công 
                showAlertBox()
                //Đóng form dialogDelete
                dialogDelete.dialog('close');
                //đóng form dialogdetail
                dialogDetail.dialog('close');
                //Load lại dữ liệu bảng ghi 
                me.loadData();
            }).fail(function(res){
                console.log(res);
            })
        });
    }
    /** ------------
     * Load dữ liệu
     * CreatedBy: NTDong(12/11/2020)
     * */
    loadData() {
        var me = this;
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu:
            var columns = $('table thead th');
            var getDataUrl = this.getDataUrl;
            $('.loading').show();
            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
                async: true,
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $(tr).data('recordId', obj.EmployeeId);
                    // Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
                    $.each(columns, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldname');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "Money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            default:
                                break;
                        }

                        td.append(value);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                    // $('.loading').hide();
                })
            }).fail(function (res) {
                // $('.loading').hide();
            })

        } catch (e) {
            console.log(e);
        }
    }
    // InitDepartments(){
    //     try {
    //         var me = this;
    //         me.FormMode = 'Add';
    //         // Hiển thị dialog thông tin chi tiết:
    //         dialogDetail.dialog('open');
    //         $('input').val(null);
    //         // load dữ liệu cho các combobox:
    //         var select = $('#Department-Search');
    //         select.empty();
    //         // lấy dữ liệu nhóm khách hàng:
    //         $('.loading').show();
    //         $.ajax({
    //             url: me.host + "/api/v1/departments",
    //             method: "GET"
    //         }).done(function (res) {
    //             if (res) {
    //                 $.each(res, function (index, obj) {
    //                     var option = $(`<option value="${obj.DepartmentId}">${obj.DepartmentName}</option>`);
    //                     select.append(option);
    //                 })
    //             }
    //             // $('.loading').hide();
    //         }).fail(function (res) {
    //             // $('.loading').hide();
    //         })
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    /** ------------------------
     * Hàm xử lý khi nhấn button thêm mới
     * CreatedBy: NTDong(18/11/2020)
     * */
    btnAddOnClick() {
        try {
            var me = this;
            me.FormMode = 'Add';
            // Hiển thị dialog thông tin chi tiết:
            dialogDetail.dialog('open');
            $('input').val(null);
            // load dữ liệu cho các combobox:
            var select = $('#cbxDepartment');
            select.empty();
            // lấy dữ liệu nhóm khách hàng:
            $('.loading').show();
            $.ajax({
                url: me.host + "/api/v1/departments",
                method: "GET"
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        var option = $(`<option value="${obj.DepartmentId}">${obj.DepartmentName}</option>`);
                        select.append(option);
                    })
                }
                // $('.loading').hide();
            }).fail(function (res) {
                // $('.loading').hide();
            })
            // load dữ liệu cho các combobox:
            var selects = $('#cbxPosition');
            selects.empty();
            // lấy dữ liệu nhóm khách hàng:
            $('.loading').show();
            $.ajax({
                url: me.host + "/api/v1/positions",
                method: "GET"
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        var option = $(`<option value="${obj.PositionId}">${obj.PositionName}</option>`);
                        selects.append(option);
                    })
                }
                // $('.loading').hide();
            }).fail(function (res) {
                // $('.loading').hide();
            })
        } catch (e) {
            console.log(e);
        }
    }
    /** ---------------------------
     * Xử lý button Save
     * Author: NTDong (18/11/2020)
     * */
    btnSaveOnClick() {
        try{
            var me = this;
            // validate dữ liệu:
            var inputVaidates = $('input[required], input[type="email"]');
            $.each(inputVaidates, function (index, input) {
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.");
                inputNotValids[0].focus();
                return;
            }
            // thu thập thông tin dữ liệu được nhập -> build thành object:
            // Lấy tất cả các control nhập liệu:
            var inputs = $('input[fieldName], select[fieldName]');
            var entity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldName');
                var value = $(input).val();
                if (this.tagName == "SELECT") {
                    var propertyName = $(this).attr('fieldValue');
                    entity[propertyName] = value;
                }

                // Check với trường hợp input là radio, thì chỉ lấy value của input có attribute là checked:
                if ($(this).attr('type') == "radio") {
                    if ($(input).is(":checked")) {
                        var valueInput = $(input).attr("genderValue");
                        entity[propertyName] = valueInput;
                    }
                } else {
                    entity[propertyName] = value;
                }

            })
            console.log(entity);
            var method = "POST";
            var urls = me.host+me.apiRouter;
            if (me.FormMode == 'Edit') {
                method = "PUT";
                var recordIds = me.recordId;
                entity.EmployeeId = me.recordId;
                urls=me.host + me.apiRouter + `/${recordIds}`;
                console.log(entity);
            }
            // Gọi service tương ứng thực hiện lưu dữ liệu:
            $.ajax({
                url: urls,
                method: method,
                data: JSON.stringify(entity),
                contentType: 'application/json'
            }).done(function (res) {
                // Sau khi lưu thành công thì:
                //hiển thị thông báo thành công  
                showAlertBox()
                // đóng dialogDetail
                dialogDetail.dialog('close');
                me.loadData();
            }).fail(function (res) {
            })
        }catch(e){
            console.log(e);
        }
    }
    /**
     * -------------------------
     * Xử lý khi ấn chuyển page
     * createdBy: NTDong(19/11/2020)
     */
    btnChangePageOnFocus() {
        $(this).siblings().removeClass("button-change-page");
        $(this).addClass("button-change-page");
    }

}