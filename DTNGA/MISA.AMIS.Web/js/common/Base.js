
class BaseJS {
    constructor() {
        try {
            var me = this;
            me.Host = "http://api.manhnv.net";
            me.apiRouter = null;
            me.getApiRouter();
            me.formMode = ''; // add- thêm, edit-sửa/cập nhật, delete-xóa
            me.ObjectName = "";
            me.getObjectName();
            me.loadData();
            me.initEvent();
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * Lấy thông tin api router
    * CreatedBy dtnga (17/11/2020) 
    */
    getApiRouter() {
        return "";
    }

    /**
     * Lấy tên Object lấy từ Api
     * CreatedBy dtnga (18/11/2020)
     * */
    getObjectName() {
        return "";
    }

    /**Khởi tạo sự kiện
     * Modifiedby dtnga (16/11/2020)
/     * */
    initEvent() {
        var me = this;
        $(`#btn-refresh`).on("click", me.onClick_btnRefresh.bind(me));
        $(`#btn-add`).on("click", me.onClick_btnAdd.bind(me));
        $(`table tbody`).on("click", "tr", me.tr_onClick);
        $(`#btn-delete`).on("click", me.onClick_btnDelete.bind(me));
        $(`table tbody`).on("dblclick", "tr", me.onDblClick_trow.bind(me));
    }

    /**
     * Tô màu cho bản ghi được chọn
     * CreatedBy dtnga (18/11/2020)
     * */
    tr_onClick() {
        $(`tbody tr`).removeClass("selected");
        $(this).addClass("selected");
        //TODO set màu cho bản ghi được chọn khi hover
    }
    /**
     * Hiển thị form Sửa thông tin khi double click vào 1 bản ghi
     * CreatedBy dtnga (17/11/2020)
     * */
    onDblClick_trow() {
        var me = this;
        me.formMode = "edit";
        var selected = $(`tbody`).find(`tr.selected`);
        $(`tbody tr`).removeClass("selected");
        $(selected).addClass("selected");
        $(`.m-dialog`).show();
        me.loadSelect();
        // bind dữ liệu hàng được chọn lên form
        var id = selected.data('keyId');
        // Lấy thông tin từ api bằng id tương ứng
        $.ajax({
            url: me.Host + me.apiRouter + '/' + id,
            method: "GET",
        }).done(function (obj) {
            console.log(obj);
            var inputs = $(`.m-input, .radio`);
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr("fieldName");
                var value = '';
                if (!obj[fieldName]) {
                    value = '';
                } else
                    value = obj[fieldName].trim();
                if ($(input).attr('type') == "radio") {
                    var radioValue = $(input).val();
                    if (radioValue == value) {
                        input.checked=true;
                    }
                }
                else if ($(input).attr('type') == "date") {
                    var date = formatDate(value, "yyyy-mm-dd");
                    $(input).val(date);
                }
                else if ($(input).is("select")) {
                    // Lấy đối tượng được select hiển thị
                    var showedObjectName = $(input).parent().attr("fieldName");
                    // Lấy option có id bằng id trong obj
                    var options = $(input).children();
                    $.each(options, function (index, option) {
                        var key = showedObjectName + "Id";
                        var id = $(option).data(key);
                        if (id == obj[key]) {
                            // bind option
                            option.selected = true;
                        }
                    })
                }
                else {
                    $(input).val(value);
                }

            })

        }).fail(function (res) {
            console.log(res);
        })
        // kiểm tra dữ liệu
        me.checkRequired();
        me.validateEmail();
        $(`#btn-exit`).on("click", me.onClick_Exit_Dialog.bind(me));
        $(`#btn-cancel`).on("click", me.onClick_Exit_Dialog.bind(me));
        $(`#btn-save`).on("click", me.onClick_btnSave.bind(me));
        $(`#btn-saveAdd`).on("click", me.onClick_btnSaveAdd.bind(me));
    }

    /** Thực hiện xóa bản ghi được chọn
     * Createdby dtnga (17/11/2020)
     */
    onClick_btnDelete() {
        var me = this;
        me.formMode = "delete";
        // Set dữ liệu động trong popup
        var selected = $(`tbody`).find(`tr.selected`);
        var name = selected.data('keyName');
        var code = selected.data('keyCode');
        $(`#popup-delete #spanName`).text(name);
        $(`#popup-delete #spanCode`).text(code);
        // Hiển thị popup
        var popup = $(`#popup-delete`);
        popup.show();
        // Khởi tạo sự kiện các button trong popup
        $(`#btn-exit-popup`).on("click", me.onClick_Exit.bind(popup));
        $(`#btn-cancel-popup`).on("click", me.onClick_Exit.bind(popup));
        $(`#btn-delete-popup`).on("click", me.deleteAnRecord.bind(me));
    }

    /** Thực hiện đóng form (cảnh báo/ thông báo/ không chứa input) hiện tại
     * CreatedBy dtnga (18/11/2020)
     */
    onClick_Exit() {
        var me = this;
        me.hide();
    }

    /**
     * Thực hiện xóa bản ghi được chọn
     * CreatedBy dtnga (18/11/2020)
     * */
    deleteAnRecord() {
        var me = this;
        var selected = $(`tbody`).find(`tr.selected`);
        var id = selected.data('keyId');
        $.ajax({
            url: me.Host + me.apiRouter + `/` + id,
            method: me.formMode,
        }).done(function (res) {
            // Ẩn popup cảnh báo
            $(`#popup-delete`).hide();
            // Hiện popup thông báo thành công
            me.status = "success";
            me.openToastMesseger();
            //Lấy row ngay sau row được chọn và chuyển nó sang trạng thái selected
            var nextRow = selected.next();
            nextRow.select();
            // Remove row được chọn hiện tại
            selected.remove();
            // Row được chọn hiện tại là next row
            nextRow.addClass("selected");
        }).fail(function (res) {
            // Hiện popup thông báo không thành công
            me.formMode = 'DELETE';
            me.status = "fail";
            me.openToastMesseger();
            console.log(res);
        })
    }

    /** Hiển thị Toast me/sseger thông báo/
     * CreatedBy dtnga (18/11/2020)
     * */
    openToastMesseger() {
        var me = this;
        // Lấy trạng thái thông báo ( thành công hay không)
        var status = me.status.trim();
        var mode = me.formMode.trim();
        var objName = me.ObjectName.trim();

        if (status == "success")
            var toastMesseger = $(`#success-messeger`);
        else if (status == "fail")
            var toastMesseger = $(`#fail-messeger`);
        // Tạo messeger
        var span = toastMesseger.find(`span`);
        var mess = "";
        if (mode == 'delete') mess = "Xóa";
        else if (mode == "add") mess = "Thêm ";
        else if (mode == "edit") mess = "Cập nhật";

        if (objName == "Customer")
            mess = mess + " khách hàng ";
        else if (objName == "Employee")
            mess = mess + " nhân viên ";
        // Gán messeger vào span thông báo
        span.text(mess);
        // Hiển thị popup
        toastMesseger.show();
        $(`#btn-exit-messeger`).on("click", me.onClick_Exit.bind(toastMesseger));
        //Set timeout, popup tự đóng sau 3s
        setTimeout(function () {
            toastMesseger.hide();
        }, 3000);
        me.formMode = "";
        me.status = "";
    }

    /**Hiển thị form khi nhấn button thêm và khổi tạo sự kiện cho các button bên trong dialog
      created by dtnga (14/11/2020)
      ModifiedBy dtnga (18/11/2020)
      */
    onClick_btnAdd() {
        var me = this;
        me.formMode = "add";
        var dialog = $(`.m-dialog`);
        dialog.show();
        //TODO đọc thông tin nhóm khách hàng và sinh các option cho select
        me.loadSelect();
        // kiểm tra dữ liệu
        me.checkRequired();
        me.validateEmail();
        $(`#btn-exit`).on("click", me.onClick_Exit_Dialog.bind(me));
        $(`#btn-cancel`).on("click", me.onClick_Exit_Dialog.bind(me));
        $(`#btn-save`).on("click", me.onClick_btnSave.bind(me));
        $(`#btn-saveAdd`).on("click", me.onClick_btnSaveAdd.bind(me));
    }

    /** Thực hiện load select
     * CreatedBy dtnga (19/11/2020)
     * */
    loadSelect() {
        var me = this;
        var select = $(`.m-select`);
        var length = select.length();
        //TODO sinh select (base)
    }

    /**Kiểm tra dữ liệu, nếu trống thì cảnh báo
     * Createdby dtnga (14/11/2020)
     * */
    checkRequired() {
        // nếu dữ liệu trống thì cảnh báo
        $(`input[required]`).blur(function () {
            var value = $(this).val();
            if (!value || !value.trim()) {
                $(this).addClass("m-input-warning");
                $(this).attr('validate', 'fasle');
                $(this).attr('title', "Trường này không được để trống");
            }
            else {
                $(this).removeAttr('validate');
                $(this).removeClass("m-input-warning");
            }
        });
    }

    /**
     * validate trường email
     * @param {string} email email
     CreatedBy dtnga (14/11/2020)
     */
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $(`input[type='email']`).blur(function () {
            var email = $(this).val();
            if (!re.test(email)) {
                $(this).addClass("m-input-warning");
                $(this).attr('title', "Email phải có dạng example@gmail.com");
            } else {
                $(this).removeClass("m-input-warning");
            }
        });
    }

    /**Kiểm tra và build dữ liệu trước khi lưu 
     Createdby dtnga (14/11/2020)
     */
    onClick_btnSave() {
        var me = this;
        // kiểm tra validate (bắt buộc nhập, email, ...), nếu vẫn còn trường chưa valid thì cảnh báo
        var invalidInputs = $(`input[validate="false"]`);
        if (invalidInputs && invalidInputs.length > 0) {
            $.each(invalidInputs, function (index, input) {
                $(input).trigger('blur');
            });
            invalidInputs[0].focus();
        }
        // build dữ liệu
        // Lấy dữ liệu từ input
        var obj = new Object();
        var inputs = $(`.m-dialog input`);
        $.each(inputs, function (index, input) {
            var value = $(this).val();
            var fieldName = $(this).attr('fieldName');
            // gán dữ liệu vào thuộc tính của obj (json) tương ứng với fieldName
            if (this.type == "radio") {
                if (this.checked)
                    obj[fieldName] = value;
            }
            else {
                obj[fieldName] = value;
            }
        });
        console.log(obj);
        if (me.formMode == "add") var method = "POST";
        else if (me.formMode == "edit") var method = "PUT";
        // Gọi Api Lưu dữ liệu
        $.ajax({
            url: me.Host + me.apiRouter,
            method: method,
            data: JSON.stringify(obj),
            contentType: "application/json"
        }).done(function (res) {
            me.status = "success";
            me.openToastMesseger();
        }).fail(function (res) {
            console.log(res);
            me.status = "fail";
            me.openToastMesseger();
        })
        // Lưu và thêm 

    }

    /**Thực hiện lưu dữ liệu và hiển thị luôn vào danh sách hiện thời
     * CreatedBy dtnga (17/11/2020)
     * */
    onClick_btnSaveAdd() {
        // kiểm tra validate (bắt buộc nhập, email, ...), nếu vẫn còn trường chưa valid thì cảnh báo
        var invalidInputs = $(`input[validate="false"]`);
        if (invalidInputs && invalidInputs.length > 0) {
            $.each(invalidInputs, function (index, input) {
                $(input).trigger('blur');
                invalidInputs[0].focus();
            });
        }
        else {

        }
    }

    /** Đóng dialog thêm
     created by dtnga (14/11/2020)
     */
    onClick_Exit_Dialog() {
        this.clear();
        var dialog = $(`.m-dialog`);
        dialog.hide();
    }

    /** Thực hiện clear dữ liệu và cảnh báo trên form
    * CreatedBy dtnga (17/11/2020) 
    */
    clear() {
        $(`input`).val(null);
        $(`input[required],input[type="email"]`).removeClass("m-input-warning");
        $(`input[required],input[type="email"]`).attr('validate', 'false');
        //clear ngày, select, radio button
        $(`input[type="radio"]`).prop('checked', false);
        $(`select option`).remove();
    }

    /** Tải lại dữ liệu khi nhấn nút refresh
     * created by dtnga (14/11/2020)
     */
    onClick_btnRefresh() {
        this.loadData();
        alert("Refresh success.");
    }

    /**Hàm load dữ liệu cho table
     * created by dtnga (12/11/2020)
     * ModifiedBy dtnga (18/11/2020) Thêm tự động chọn row đầu tiên và thêm set data là Id cho mỗi row
     * */
    loadData() {
        var me = this;
        //Lấy th từ html
        var ths = $('table tr th');
        $.ajax({
            url: me.Host + me.apiRouter,
            method: "GET"
        }).done(function (res) {
            var data = res;
            $.each(data, function (index, obj) {
                var tr = $(`<tr></tr>`);
                $.each(ths, function (index, th) {
                    var td = $(`<td></td>`);
                    // Lấy fielname th
                    var fieldName = $(th).attr('fieldName');
                    //Lấy giá trị của thuộc tính tương ứng với fieldName trong obj
                    var value = obj[fieldName];
                    if (value) {
                        // định dạng lại
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "Money":
                                value = formatMoney(value);
                                td.addClass("text-align-right");
                                break;
                            case "ddmmyy":
                                value = formatDate(value, "dd/mm/yyyy");
                                td.addClass("text-align-center");
                                break;
                            default:
                                break;
                        }
                    }
                    else value = "";
                    var span = `<span>` + value + `</span>`;
                    var div = `<div>` + span + `</div>`;
                    // gán vào td -> tr
                    td.append(div);
                    tr.append(td);
                    //Lưu Id vào data
                    var keyIdName = me.ObjectName + 'Id';
                    tr.data('keyId', obj[keyIdName]);
                    var keyName = 'FullName';
                    tr.data('keyName', obj[keyName]);
                    var keyCode = me.ObjectName + 'Code';
                    tr.data('keyCode', obj[keyCode]);
                })
                $('table#tbListEmployee tbody').append(tr);
            })
            // Mặc định chọn row đầu tiên
            $(`tbody tr:first`).select();
            $(`tbody tr:first`).addClass("selected");
        }).fail(function (res) {

        })
    }

}