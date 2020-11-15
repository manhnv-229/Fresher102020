$(document).ready(function () {
    new CustomerJs();

})



class CustomerJs extends BaseJs {
    constructor() {
        super();
        this.initForm();
        this.initEvent();
    }

    setUrl() {
        this.getUrl = 'http://api.manhnv.net/api/customers';
    }
    initEvent() {
        var me = this;
        // open dialog
        $('.title-popup-text').click(function () {
            me.CustomerFormDetail.dialog('open');
        });
        // close dialog
        $('#btnCancel').click(function () {
            me.CustomerFormDetail.dialog('close');
        });
        // refresh table
        $('#btnRefresh').click(function () {
            me.dataLoad();
        });
        // Lưu lại thông tin vừa điền vào database
        $('#btnSave').click(function () {
            // validate dữ liệu
            var inputValidates = $('input[required], input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');
            })

            var inputNotValids = $('input[validate = "false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert('Dữ liệu không hợp lệ vui long kiểm tra lại.');
                inputNotValids[0].focus();
                return;
            }

            // Thu thập dữ liệu được nhập -> build thành project
            var inputs = $('.dialog input[fieldname]');
            var customer = {
            }
            $.each(inputs, function (index, item) {
                var fieldName = $(item).attr('fieldname');
                customer[fieldName] = $(item).val();
            });
            customer["CustomerGroupId"] = "3631011e-4559-4ad8-b0ad-cb989f2177da";
            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: 'POST',
                data: JSON.stringify(customer),
                contentType: 'application/json'
            }).done(function (res) {
                //Đưa thông báo thành công
                // tắt dialog
                // load lại data
                alert('Thêm thành công');
                me.CustomerFormDetail.dialog('close');
                me.dataLoad();
            }).fail(function (res) {

            });
            //gọi service tương ứng

        });

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột vào một dòng trong bảng
        $('table tbody').on('dblclick', 'tr', function () {
            me.CustomerFormDetail.dialog('open');
        })

        /*
         * Validate dữ liệu nhập vào
         */
        // validate bắt buộc nhập
        $('input[required]').blur(function () {
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
        })

        // validate định dạng email
        $('input[type="email"]').blur(function () {
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

        })

        function validateEmail(email) {

        }

    }
    initForm() {
        // tạo form dialog bằng jquery ui
        this.CustomerFormDetail = $('.dialog').dialog({
            modal: true,
            autoOpen: false,
            fluid: true,
            minWidth: 800,
            title: 'THÔNG TIN KHÁCH HÀNG',

        });
    }
}

