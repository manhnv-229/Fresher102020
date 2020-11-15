class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.initEvents();
        this.loadData();
    }
    //đổi tên biến bôi đên biến rồi ctrl + r + r


    setDataUrl() {
       
    }
/**
 * hàm quản lý các sự kiện
 * createdby nttung (10/11/2020)
 * */
    
    initEvents() {
        var me = this;
        $('#btnAdd').click(this.btnAddOnClick.bind(this));
        //$('#btnSave').click(this.btnSaveOnClick);
        $('#btnReload').click(this.btnReloadOnClick.bind(this));
        $('#btnCanel').click(this.btnCanelOnClick.bind(this));
        $('.title-close-button').click(this.btnCanelOnClick.bind(this));
        $("input[required]").blur(this.checkRequired);
        $("#btnSave").click(this.btnSaveOnClick.bind(this));
        // 2click hien thong tin chi tiet
        $('table tbody').on('dblclick', 'tr', function () {
            me.showDialogDetail();
        })
    }
    /**
     * tải lại bảng hiển thị thông tin
     * createdby nttung (12/11/2020)
     * */
    btnReloadOnClick() {
        this.loadData();
    }
    /**
     * Hiển thị DialogDetail
     * createdby nttung (10/11/2020)
     * */
    showDialogDetail() {
        $(' .dialog-model').show();
        $(' .dialog').show();
        $("#txtEmployeeCode").focus();
    }
    /**
    * ẩn DialogDetail
    * createdby nttung (10/11/2020)
    * */
    hideDialogDetail() {
        $(' .dialog-model').hide();
        $(' .dialog').hide();
    }
    btnAddOnClick() {
        this.showDialogDetail();
    }
    btnCanelOnClick() {
        this.hideDialogDetail();
    }
    /**
 * Load dữ liệu 
 * createdby nttung(12/11/2020)
 * */
    loadData() {
        //lấy thông tin các cột dữ liệu
        try {
            var ths = $('table thead th');
            var strUrl = this.getDataUrl;
            $.ajax({
                url: strUrl,
                method: "GET",
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    var sortNumber = index;
                    //Lấy thông tin dữ liệu map vào các cột tương ứng
                    $.each(ths, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldName');
                        if (fieldName == "index") {
                            var tdSortNumber = $(`<td><div><span>` + sortNumber + `</span></div></td>`);
                            $(tr).append(tdSortNumber);
                        } else if (fieldName == "DateOfBirth") {
                            var date = fomatDate(obj[fieldName]);
                            td.append(date);
                            $(tr).append(td);
                        } else if (fieldName == "Salary") {
                            var salary = fomatMoney(obj[fieldName]);
                            td.append(salary);
                            td.addClass("money");
                            $(tr).append(td);
                        } else if (fieldName == "Gender") {
                            var gender = fomatGender(obj[fieldName]);
                            td.append(gender);
                            $(tr).append(td);
                        }
                        else {
                            var value = obj[fieldName];
                            td.append(value);
                            $(tr).append(td);
                        }
                        // money fomat 
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
     * button kiểm tra và lưu dữ liệu
     * createdy nttung (10/11/2020)
     * */
    btnSaveOnClick() {
        var self = this;
        var strUrl = this.getDataUrl;
        //validate dữ liệu
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
        //thu thập thông tin dữ liệu được nhập -> build thành object
        var customer = {
            "CustomerCode": $('#txtCustomerCode').val(),
            "FullName": $('#txtFullName').val(),
            "Address": $('#txtAddress').val(),
            "DateOfBirth": $('#dtDateOfBirth').val(),
            "Email": $('#txtEmail').val(),
            "PhoneNumber": $('#txtPhoneNumber').val(),
            "CustomerGroupId": "3631011e-4559-4ad8-b0ad-cb989f2177da",
            "MemberCardCode": $('#txtMemberCardCode').val()
        }
        //gọi service tương ứng thực hiện lưu dữ liệu
        $.ajax({
            url: strUrl,
            method: 'POST',
            data: JSON.stringify(customer),
            contentType: 'application/json'
        }).done(function (res) {
            //đưa ra thông báo thành công,
            alert('thêm thành công!');
            //ẩn form chi tiết
            self.hideDialogDetail();
            //load lại lại dữ liệu
            self.loadData();
            debugger;
        }).fail(function (res) {
            alert("Không thể thêm mới ");
        })  
    }
    /**
     * kiểm tra vaild cho dữ liệu chưa nhập vào DialogDetail
     * createdby nttung (10/11/2020)
     * */
    checkRequired() {
        var val = $(this).val();
        if (!val) {
            $(this).addClass('required-error');
            //$("#txtEmployeeCode").focus();
            $(this).attr("title", "Bạn phải nhập trường này");
        }
        else{
            $(this).removeClass('required-error');
        }
    }
    

}
