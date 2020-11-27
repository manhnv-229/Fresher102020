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
        var me = this;
        $(`#btn-add`).on("click", me.onClick_btnAdd.bind(me));
        $(`#btn-refresh`).on("click", me.onClick_btnRefresh.bind(me));
        $(`#btn-filter`).on("click", me.onClick_btnFilter.bind(me));
        $(`#btn-clear-filter`).on("click", me.onClick_btnClearFilter.bind(me));
        // Sự kiện khi chọn filter
        $(`.filter-item input[type="radio"]`).on("change", me.onClickFilter.bind(me));
        // sự kiện khi thao tác với từng hàng dữ liệu trong bảng
        $(`table tbody`).on("click", "tr", me.tr_onClick);
        $(`table tbody`).on("dblclick", "tr", me.onDblClick_trow.bind(me));
        // sự kiện khi tick vào checkbox/ nhiều checkbox
        $(`table thead input[type="checkbox"]`).on("click", me.onClickCheckAll.bind(me));
        $(`tbody input[type="checkbox"]`).on("click", me.onClickCheckbox.bind(me));

    }

    /** Hàm thực hiện thêm dữ liệu mới
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnAdd() {
        try {
            alert("Add button is on click");
        } catch (e) {
            console.log(e);
        }
    }

    /** Hàm thực hiện làm mới dữ liệu
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnRefresh() {
        this.loadData();
        alert("Refresh success.");
    }

    /** Hàm thực hiện lấy dữ liệu theo bộ lọc
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnFilter() {
        try {
            alert("Filter is added");
        } catch (e) {
            console.log(e);
        }
    }

    /** Hàm thực hiện xóa bộ lọc và hiển thị lại toàn bộ dữ liệu
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnClearFilter() {
        try {
            alert("Filter is removed");
        } catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện load dữ liệu theo filter 
     * Created By dtnga 23/11/2020
     */
    onClickFilter() {
        //  bỏ background của các filter item còn lại
        $(`.filter .filter-item`).removeClass("selected");
        var radio = $(`.filter input[type="radio"]:checked`);
        var filterItem = radio.parent().parent();
        filterItem.addClass("selected");
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
        alert("on Double Click");
        //TODO Show form cập nhật đơn hàng

    }

    /** Thực hiện chọn tất cả bản ghi */
    onClickCheckAll() {
        var Allcheckbox = $(`table thead input[type="checkbox"]:checked`);
        if (Allcheckbox.length > 0) {
            $(`tbody input[type="checkbox"]`).prop("checked", true);
        }
        else {
            $(`tbody input[type="checkbox"]`).prop("checked", false);
        }

    }

    onClickCheckbox() {
        var checkbox = $(`tbody input[type="checkbox"]:checked`);

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