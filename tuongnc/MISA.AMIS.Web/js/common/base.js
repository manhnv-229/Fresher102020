
class BaseJS {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null
        this.setDataUrl();
        this.setActiveNavBar();
        this.loadData();
        this.loadDataSelect()
        this.initEvents();

    }
    //abtract function setDataUrl() được overide để set Url cho hàm ajax
    setDataUrl() {

    };
    /**
     * Hàm setActiveNavBar() được dùng để forcus vào tag <a> tại từng trang
     * CreatedBy TuongNC (12/11/2020)
     * */
    setActiveNavBar() {

    };
    /**
     * Hàm initEvents() được dùng để gán các sự kiện cho trang
     * CreatedBy TuongNC (14/11/2020)
     * */
    initEvents() {
        var me = this;
        // xóa các trường khi thực hiện ấn button thêm mới
        $('#btnAdd').click(me.eventClickBtnAdd.bind(me));
        //----------------
        // sự kiện thêm dữ liệu khi click button lưu trong dialog thêm mới
        // + validate dữ liệu
        me.validateForm();
        // Thực hiện thêm mới liệu khi nhấn button [lưu]
        $("#btnSave").click(me.eventClickBtnSave.bind(me));
        // sự kiện click khi nhấn đồng bộ - sync table
        $("#btnRefresh").click(me.eventSyncTable.bind(me));
        // Hiển thị thông tin chi tiết khi nhấn đúp chuột vào 1 hàng ở table
        $("table tbody").on("dblclick", "tr", function (e) {
            //xét active row
            $(this).addClass('active');
            if (me.trActive) {
                me.trActive.removeClass('active');
            }
            me.trActive = $(this);
            // xử lý bind dữ liệu ra dialog
            var data = $(e.currentTarget).data();
            me.eventRowDetail(data);
            // thêm button delete vào form và button chỉnh sửa 
                //chỉnh sửa
                $('#btnSave').html('Chỉnh sửa');
                // delete
                $('#btnDelete').show();
                $('#overlay').show();
                $('#modal').show();
        });
        // xử lý sự kiện click delete entity
        $('#modal').on('click', '#btnDelete', me.eventClickDeleteEntity.bind(me));
    }
    /**************************************************
     * Hàm đổ dữ liệu vào thẻ select
     * CreatedBy: TuongNC (17/11/2020)
     * 
     * */
    loadDataSelect() {
        var me = this;
        try {
            var fieldNames = $('select[fieldName]');
            $.each(fieldNames, function (index, select) {
                var api = $(this).attr('api');
                var fieldName = $(this).attr('fieldName');
                var fieldValue = $(this).attr('fieldValue');
                var select = $(this);
                select.empty();
                $.ajax({
                    url: me.host + api,
                    method: "GET",
                }).done(function (res) {
                    $.each(res, function (index, obj) {
                        var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                        select.append(option);
                    })
                })
            });
        } catch (e) {
            console.log(e);
        }
    }

    /**************************************************
     * Hàm được dùng để in dữ liệu vào băng, định dạng lại các dữ liệu khi đổ vào bảng 
     * CreatedBy TuongNC (12/11/2020)
     * */
    loadData() {
        // hiển thị loading dữ liệu
        $('.loader').show();
        $('#overlay').show();
        //------------
        var me = this;
        var thead = $('table thead th');
        $("table tbody").empty();
        $.ajax({
            url: this.host + this.apiRouter,
            method: "GET",
        }).done(function (res) {
            //lấy thông tin các cột dữ liệu và in từng hàng dữ liệu 
            //vòng lặp ngoài là vòng lặp dữ liệu trên service
            //vòng lặp trong để map dữ liệu thead vs tbody
            $.each(res, function (index, obj) {
                var tr = $(`<tr></tr>`);
                tr.data('recordId', obj['CustomerId']);
                $.each(thead, function (index, item) {
                    var td = $(`<td><div><span></span></div></td>`);
                    // lấy các tên trường
                    var fieldName = $(item).attr('fieldName');
                    // lấy các tên format ở trường
                    var formatType = $(item).attr('formatType');
                    var value = obj[fieldName];
                    switch (formatType) {
                        case 'ddmmyyyy':
                            value = formatDate(value);
                            break;
                        case 'money':
                            td.find('div').addClass('text-align-right');
                            value = formatSalary(value);
                            break;
                        case 'hoverTitle':
                            td.find('div').attr("title", "" + value);
                            break;
                        default:
                            break;
                    }
                    td.find('div').find('span').append(value);
                    tr.append(td);
                })

                $("table tbody").append(tr);
                // ẩn loading dữ liệu
                $('.loader').hide();
                $('#overlay').hide();
                //------------
            })
        }).fail(function (res) {
            // ẩn loading dữ liệu
            $('.loader').hide();
            $('#overlay').hide();
            //------------
        })
    };

    /**************************************************
    * Hàm được dùng để hiển thị dư liệu 1 entity vào dialog
    * CreatedBy TuongNC (12/11/2020)
    * */
    eventRowDetail(data) {
        var me = this;
        me.formMode = 'edit';
        var recordId = data.recordId
        me.recordId = recordId;
        try {
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: 'GET',
            }).done(function (res) {
                var fieldNames = $('input[fieldName], select[fieldName]');
                $.each(fieldNames, function (index, item) {
                    var fieldName = $(this).attr('fieldName');
                    var value = res[fieldName];
                    if ($(this).is('input[type="radio"]')) {
                        if (value == null) {
                            $(this).prop('checked', false);
                        } else {
                            $(`input[value="${value}"`).prop('checked', true);
                        }
                    } else {
                        if ($(this).is('input[type=date]')) {
                            var value = formatDateInput(res[fieldName]);
                        } else if ($(this).is('select[fieldName]')) {
                            var fieldValue = $(this).attr('fieldValue');
                            value = res[fieldValue];
                        }
                        $(this).val(value);
                    }
                });
            }).fail(function (res) {

            });
        } catch (e) {
            console.log(e);
        };
        $('#overlay').show();
        $('#modal').show();
    }

    /**************************************************
    * Hàm được dùng để đồng bộ dữ liệu vào table
    * CreatedBy TuongNC (12/11/2020)
    * */
    eventSyncTable() {
        var me = this;
        $("table tbody").empty();
        me.loadData();
        alert("Đồng bộ thành công");
    }
    /**************************************************
    * Hàm thực hiện Post, Put dữ liệu của 1 entity
    * CreatedBy TuongNC (12/11/2020)
    * */
    eventClickBtnSave() {
        var me = this;
        // + Validate khi nhấn button lưu
        var inputValidates = $('input[required], input[type="email"]');
        $.each(inputValidates, function () {
            $(this).trigger('blur');
        })
        var validates = $('input[validate="false"]');
        if (validates && validates.length > 0) {
            alert("Nhập lại");
            validates[0].focus();
            return;
        }

        // + thu thập thông tin từ dữ liệu nhập --> build thành object
        var entity = {};
        var fieldNames = $('input[fieldName], select[fieldName]');
        $.each(fieldNames, function () {
            var fieldName = $(this).attr("fieldName");
            if ($(this).is('input[type="radio"]')) {
                entity[fieldName] = $('input[name="' + fieldName + '"]:checked').val();
            } else {
                if ($(this).is('select')) {
                    var fieldValue = $(this).attr('fieldValue');
                    entity[fieldValue] = $(this).val();
                } else {
                    entity[fieldName] = $(this).val();
                }
            }
        });
        // + Gọi service tương ứng thực hiện thêm mới dữ liệu
        var method = '';
        switch (me.formMode) {
            case 'add':
                method = "POST";
                break;
            case 'edit':
                method = "PUT";
                entity.CustomerId = me.recordId;
                break;
            default:
        }
        $.ajax({
            url: me.host + me.apiRouter,
            method: method,
            data: JSON.stringify(entity),
            contentType: 'application/json',
        }).done(function (res) {
            // + + đưa ra thông báo thành công
            alert("thêm khách hàng thành công");
            // + + ẩn dialog
            $('#overlay').hide();
            $('#modal').hide();
            // + + load lại dữ liệu vào table
            me.loadData();
        }).fail(function (res) {
        });
    }
    /**************************************************
    * Hàm thực hiện xóa trắng các field input trong dialog
    * CreatedBy TuongNC (12/11/2020)
    * */
    eventClickBtnAdd() {
        $('#btnSave').html('Thêm mới');
        $('#btnDelete').hide();
        var me = this;
        me.formMode = 'add';
        var fieldNames = $('input[fieldName]');
        $.each(fieldNames, function (index, fieldName) {
            if (!$(fieldName).is('input[type="radio"]') || $(fieldName).is('select')) {
                $(fieldName).val('');
            }
        })
        $('input[checked]').prop('checked', true);
        $('select[fieldName]').find('option').eq(0).prop('selected', true);
    }
    /**************************************************
    * Hàm thực hiện validate dữ liệu phía client trong dialog Add
    * CreatedBy TuongNC (12/11/2020)
    * */
    validateForm() {
        /**************************************************
         validate bắt buộc nhập
         CreatedBy TuongNC (14/11/2020)
         */
        $('input[required').blur(function () {
            var value = $(this).val();
            if (value) {
                $(this).removeClass("validate-require");
                $(this).attr("validate", "true");
            } else {
                $(this).addClass("validate-require");
                $(this).attr("validate", "false");
            }
        });
        /**************************************************
         validate email, function ValidateEmail() ở phầm common.js
         createBy TuongNC(14/11/2020)
         */
        $('input[type="email"').blur(function () {
            var value = $(this).val();
            if (ValidateEmail(value)) {
                $(this).removeClass("validate-require");
                $(this).attr("validate", "true");
            } else {
                $(this).addClass("validate-require");
                $(this).attr("validate", "false");
            }

        });
    }

    eventClickDeleteEntity() {
        var me = this;
        // hiện thị popup notice delete
        $('#modal').hide();
        $('#popup-notice').show();
        // xự kiện click button [đồng ý] trong popup
        $('#btnSubDelete').click(function () {
            $.ajax({
                url: me.host + me.apiRouter + '/' + me.recordId,
                method: 'DELETE',
            }).done(function (res) {
                console.log(res);
                $('#popup-notice').hide();
                $('#overlay').hide();
                me.loadData();
            }).fail(function (res) {
                console.log(res);
                $('#popup-notice').hide();
                $('#overlay').hide();
                alert('Thất Bại');
                me.loadData();
            });
        });
        // xự kiênk click button [hủy] trong popup nitice delete
        $('.btnClose').click(function () {
            $('#popup-notice').hide();
            $('#modal').show();
        });
    }
}