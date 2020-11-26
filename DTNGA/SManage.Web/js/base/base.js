$(document).ready(function () {
    var base = new Base();
})

class Base {
    constructor() {
        try {
            var me = this;
            me.ObjectName = "Order";
            me.loadData();
            me.initEvent();
        }
        catch (e) {
            console.log(e);
        }
    }
    /* Hàm thực hiện khởi tạo sự kiện */
    initEvent() {
        try {
            var me = this;
            $(`#btn-addOrder`).on("click", me.onClick_btnAdd.bind(me));
            $(`#btn-refresh`).on("click", me.onClick_btnRefresh.bind(me));
            // TODO sự kiện khi nhập trường Tìm kiếm

            // TODO Sự kiện khi chọn filter

            // đóng form khi nhấn ESC
            var dialog = $(`.m-dialog`);
            $('body').on("keydown", me.onClick_ESC.bind(dialog));
            // Sự kiện khi thao tác với từng hàng dữ liệu trong bảng
            $(`table tbody`).on("click", "tr", me.tr_onClick);
            $(`table tbody`).on("dblclick", "tr", me.onDblClick_trow.bind(me));
            // sự kiện khi tick vào checkbox/ nhiều checkbox
            $(`table thead input[type="checkbox"]`).on("click", me.onClickCheckAll.bind(me));
            $(`tbody input[type="checkbox"]`).on("click", me.onClickCheckbox.bind(me));
            
        }
        catch (e) {
            console.log(e);
        }

    }

    /** Hàm thực hiện thêm dữ liệu mới
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnAdd() {
        try {
            var me = this;
            me.formMode = "add";
            me.showDialog();
        } catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện hiển thị dialog và khởi tạo các sự kiện liên quan
     * CreatedBy dtnga (26/11/2020)
     * */
    showDialog() {
        var me = this;
        var dialog = $(`.m-dialog`);
        dialog.show();
        //tự động focus
        me.addFocusSupport();
        // format khi nhập liệu số tiền
        me.autoFormatMoney();
        // kiểm tra dữ liệu
        me.checkRequired();
        me.validateEmail();
        $(`#btn-exit`).on("click", me.onClick_Exit_Dialog.bind(me));
        $(`#btn-cancel`).on("click", me.onClick_Exit_Dialog.bind(me));
        $(`#btn-save`).on("click", me.onClick_btnSave.bind(me));
        //$(`#btn-saveAdd`).on("click", me.onClick_btnSaveAdd.bind(me));
    }

    /** Tự động format các trường input số tiền 
    * CreatedBy dtnga (26/11/2020) 
     */
    autoFormatMoney() {
        var moneyInputs = $('input[typeFormat="money"]');
        $.each(moneyInputs, function (index, input) {
            $(input).on("keyup", function (e) {
                var selection = window.getSelection().toString();
                if (selection !== '') {
                    return;
                }
                if ($.inArray(e.which, [38, 40, 37, 39]) !== -1) {
                    return;
                }
                var ip = $(this).val();
                // Loại bỏ các kí tự k phải số
                var ip = ip.replace(/[\D\s\._\-]+/g, "");
                // convert thành ip số
                ip = ip ? parseInt(ip, 10) : 0;
                $(this).val(function () {
                    return (ip === 0) ? "" : ip.toLocaleString("vi-VN");
                });
            });
        })
    }

    /**Kiểm tra và build dữ liệu trước khi lưu 
     Createdby dtnga (14/11/2020)
     */
    onClick_btnSave() {
        try {
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
                var value = $(input).val();
                var fieldName = $(input).attr('fieldName');
                // gán dữ liệu vào thuộc tính của obj (json) tương ứng với fieldName
                if (input.type == "radio") {
                    if (input.checked)
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
            //$.ajax({
            //    url: me.Host + me.apiRouter,
            //    method: method,
            //    data: JSON.stringify(obj),
            //    contentType: "application/json"
            //}).done(function (res) {
            //    me.status = "success";
            //    me.openToastMesseger();
            //}).fail(function (res) {
            //    console.log(res);
            //    me.status = "fail";
            //    me.openToastMesseger();
            //})

            // Lưu và thêm 

        }
        catch (e) {
            console.log(e);
        }

    }

    /** Hàm hỗ trợ focus nhập liệu
     * CreatedBy dtnga (25/11/2020)
     * */
    addFocusSupport() {
        try {
            var me = this;
            var inputs = $(`.m-dialog input`)
            // focus đến ô nhập liệu đầu tiên
            inputs[0].focus();
        }
        catch (e) {
            console.log(e);
        }
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

    /** Đóng dialog thêm
     Created by dtnga (14/11/2020)
     */
    onClick_Exit_Dialog() {
        this.clear();
        var dialog = $(`.m-dialog`);
        dialog.hide();
    }

    /** Hàm thực hiện đóng form khi người dùng nhấn ESC
     * CreatedBy dtnga (26/11/2020)
     * */
    onClick_ESC() {
        var me = this;
        me.on("keydown", function (e) {
            if (e.which === 27) {
                me.hide();
            }
        });
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

    /** Hàm thực hiện làm mới dữ liệu
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnRefresh() {
        this.loadData();
        alert("Refresh success.");
    }


    /**
    * Tô màu cho bản ghi được chọn
    * CreatedBy dtnga (21/11/2020)
    * */
    tr_onClick() {
        $(`tbody tr`).removeClass("selected");
        $(`tbody tr input[type="checkbox"]`).prop("checked", false);
        $(this).addClass("selected");
        $(this).find(`input[type="checkbox"]`).prop("checked", true);
        // Bỏ check ở checkbox trên theader ( bỏ chọn all)
        $(`table thead input[type="checkbox"]`).prop("checked", false);
        //TODO set màu cho bản ghi được chọn khi hover
    }

    /**
     * Hiển thị form Sửa thông tin khi double click vào 1 bản ghi
     * CreatedBy dtnga (21/11/2020)
     * */
    onDblClick_trow() {
        var me = this;
        me.formMode = "edit";
        //Đổi màu hàng dữ liệu
        var selected = $(`tbody`).find(`tr.selected`);
        $(`tbody tr`).removeClass("selected");
        $(selected).addClass("selected");
        //Show form cập nhật đơn hàng
        $(`.m-dialog .header-text`).text("Cập nhật đơn hàng");
        // Hiển thị dialog
        me.showDialog();

        //TODO  bind dữ liệu hàng được chọn lên form
        var id = selected.data('keyId');
        // Lấy thông tin từ api bằng id tương ứng

        
    }

    /** Thực hiện chọn tất cả bản ghi
    * CreatedBy dtnga (21/11/2020)
     */
    onClickCheckAll() {
        var Allcheckbox = $(`table thead input[type="checkbox"]:checked`);
        if (Allcheckbox.length > 0) {
            $(`tbody input[type="checkbox"]`).prop("checked", true);
        }
        else {
            $(`tbody input[type="checkbox"]`).prop("checked", false);
        }

    }


    /** Hàm base thực hiện load dữ liệu lên table
     *  Created By dtnga (21/11/2020)
     * */
    loadData() {
        var me = this;
        var ths = $('table tr th');

        // Lấy data từ Api
        var data = listObj;
        $.each(data, function (index, obj) {
            var tr = $(`<tr></tr>`);
            $.each(ths, function (index, th) {
                var td = $(`<td></td>`);
                // Lấy fielname th 
                var fieldName = $(th).attr('fieldName');
                if (fieldName == "Checkbox") {
                    var checkbox = $(`<div><input type="checkbox" name="order" /> </div>`);
                    td.append(checkbox);
                }
                else if (fieldName == "State") {
                    // Khởi tạo select trạng thái đơn hàng
                    var select = $(`<select></select>`);
                    // Lấy danh sách các trạng thái đơn hàng từ Api 
                    var listState = listOrderState;
                    $.each(listState, function (index, state) {
                        var option = $(`<option></option>`);
                        // append text
                        var value = state["OrderStateName"];
                        if (value) {
                            option.append(value);
                        }
                        // append class
                        var optionCode = state["OrderStateCode"];
                        option.attr("value", optionCode);
                        select.append(option);
                        // Lưu id vào data
                        var key = "OrderStateCode";
                        option.data(key, optionCode);
                        var stateCode = obj["OrderStateCode"];
                        if (state["OrderStateCode"] == stateCode) {
                            option.prop("selected", true);
                            //TODO set màu cho select là màu của option được chọn

                        }

                    })
                    td.append(select);
                    //Cập nhật chọn option tương ứng với trạng thái đơn hàng

                }
                else {
                    //Lấy giá trị của thuộc tính tương ứng với fieldName trong obj
                    var value = obj[fieldName];
                    if (value) {
                        // định dạng lại
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "money":
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
                }
                tr.append(td);
            })
            $('table#orders-table tbody').append(tr);
            //Lưu Id vào data
            var keyIdName = me.ObjectName + 'Id';
            tr.data('keyId', obj[keyIdName]);
            var keyName = 'FullName';
            tr.data('keyName', obj[keyName]);
            var keyCode = me.ObjectName + 'Code';
            tr.data('keyCode', obj[keyCode]);

        })
        // Mặc định chọn row đầu tiên
        $(`tbody tr:first`).select();
        $(`tbody tr:first`).addClass("selected");
        $(`tbody tr:first input[type="checkbox"]`).prop("checked", true);
    }


}

var userInfo = {
    FullName: "Đặng Thị Nga"
}

var listOrderState = [
    {
        OrderStateId: "eaf88144-42b8-4adb-89da-4df5b9103389",
        OrderStateCode: 1,
        OrderStateName: "Mới"
    },
    {
        OrderStateId: "18c12084-5347-442c-a9d9-11f5bca09b58",
        OrderStateCode: 2,
        OrderStateName: "Đã xác nhận"
    },
    {
        OrderStateId: "77993ae9-4853-4a9f-bc28-bb546df33288",
        OrderStateCode: 3,
        OrderStateName: "Chờ giao hàng"
    },
    {
        OrderStateId: "744ac402-c8e4-4617-91f2-81315dca2b95",
        OrderStateCode: 4,
        OrderStateName: "Đang giao hàng"
    },
    {
        OrderStateId: "b0016df6-b8ec-44db-943e-10ae339feab2",
        OrderStateCode: 5,
        OrderStateName: "Đã nhận hàng"
    },
    {
        OrderStateId: "61067246-3585-4c03-aae6-ee2f0a62ca64",
        OrderStateCode: 6,
        OrderStateName: "Hoàn hàng"
    },
    {
        OrderStateId: "1afe8820-b1a6-41a2-acf1-cf0e257e4568",
        OrderStateCode: 7,
        OrderStateName: "Đã thanh toán"
    }


]

var listObj = [
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 3,
        State: "Chờ giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 2,
        State: "Đã xác nhận"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    }

]