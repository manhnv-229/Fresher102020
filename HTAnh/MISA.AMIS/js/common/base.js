class BaseJS {
    /**
     * Hàm khởi tạo
     * */
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        //this.getDataUrl = null;
        //this.setDataUrl();
        this.initEvents();
        this.loadData();
        
    }
    
    /**
     * Hàm set url lấy data;
     * created by: HTANH;
     * */
    setDataUrl() {
    }

    /**
     * hàm tạo url
     * */

    setApiRouter() {
    }


    initEvents() {
        var arrow = this;
        /* ------------------------------------
         * Tắt/ẩn dialog
         */
        $('#btnX').click(hideDialog);
        $('#btnCancel').click(hideDialog);
        $('#btnCancelDelete').click(hideDialog);
        /* ------------------------------------
         * Hiển thị dialog
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
        $('#btnDelete').click(function () {
            //$('.confirm-dialog').removeClass('hide');
            $('.confirm-dialog').removeClass('hide');
            $('.m-dialog').addClass('hide');
        });
        $('#btnConfirmDelete').click(function () {
            $.ajax({
                url: arrow.host + arrow.apiRouter+ '\\' + arrow.recordId,
                method: 'DELETE',
            }).done(function (res) {
                alert('Xoas thanhf cong');
                hideDialog(); // ẩn form điền
                arrow.loadData();// load lại dữ liệu
            }).fail(function (res) {
            })
        })
        /* ------------------------------------
         * Validate nhập dữ liệu:
         */
        $('input[required]').blur(validateEmpty);



        /* ------------------------------------
        * validate email đúng định dạng
        */
        $('input[type="email"]').blur(validateEmail);

        /**
         * Thực hiện kiểm tra và lưu dữ liệu vào database
         */
        $('#btnSave').click(function () {
            
            var inputVaidates = $('input[required], input[type="email"]');
            $.each(inputVaidates, function (index,input) {
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.");
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
            if (arrow.FormMode == 'Edit') {
                method = "PUT";
                customer.CustomerId = arrow.recordId;
            }
            if (method == "POST") {
                if (customer.CustomerId) delete customer.CustomerId;
            }
            console.log(customer);
            console.log("Phuong thuc: " + method);
            console.log(arrow.recordId);
            
            $.ajax({
                url: arrow.host + arrow.apiRouter,
                method: method,
                data: JSON.stringify(customer),
                contentType: 'application/json'
            }).done(function (res) {
                if (method == 'PUT') {
                    alert('Dữ liệu đã được sửa thành công');
                } else {
                    alert('Dữ liệu đc thêm thành công');
                }
                hideDialog(); // ẩn form điền
                arrow.loadData();// load lại dữ liệu
            }).fail(function (res) {
            })

        }.bind(this))
    }



    /**
     * Hiển thị dialog sửa thông tin khách hàng
     * */
    editData(lala) {

        var host = this.host;
        $('.m-dialog').removeClass('hide');
        
        var api = $('#cbxCustomerGroup').attr('api');
        var fieldId = $('select#cbxCustomerGroup').attr('fieldId');
        var fieldName = $('select#cbxCustomerGroup').attr('fieldName');
        var url2 = host + "/api/" + api;
        console.log(url2);
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

        this.recordId = recordId;
        console.log(url);
        //// Goị service lấy thông tin chi tiết qua id
        $.ajax({
            url: url,
            method: "GET",
            async:false
        }).done(function (res) {
            console.log(res);
            var a = $('input[field],select[field]');
            var customer = {};
       
            //Thực hiện truyền data vào object
            $.each(a, function (index, data) {
                var test = $(data).attr('field');
              
                var value = res[test];
               
                if (test == 'DateOfBirth') {
                    value = formatDateHigh(value);
                }
                if (test == 'CustomerGroupName') {
                    var optionLALA = $('option[name]');
                    $.each(optionLALA, function (index, option) {
                        console.log("text cua no: " + $(this).text());
                        if (value == $(this).text()) {
                            $(this).attr('selected', '1');
                        }
                    })
                } else if (test == 'Gender') {
                    $(`input[value="${value}"]`).prop('checked', true);
                } else {
                    $(this).val(value);
                }



                //else  $(this).val(value);
            })
            
        }).fail(function (res) {

        })
    }

    addDialog() {
        var host = this.host;
        this.FormMode = 'Add';
        $('.m-dialog').removeClass('hide');
        
        var select = $('select#cbxCustomerGroup');
        select.empty();
        $('.loading').show();
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

    deleteData() {

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
        var getDataUrl = this.getDataUrl;

        $('.loading').show();

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
                    //debugger;
                    //var value = null;
                    //if (fieldName == 'DateOfBirth') {
                    //    value = obj[fieldName];

                    //} else {
                    //    
                    //}
                    
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
}