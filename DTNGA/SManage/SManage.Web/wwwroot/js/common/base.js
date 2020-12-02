
class Base {
    constructor() {
        try {
            var me = this;
            me.ObjectName = "Order";
            me.loadAccount();
            me.loadShop();
            me.loadData();
            me.initEvent();
        }
        catch (e) {
            console.log(e);
        }
    }


    /** Thực hiện lấy thông tin người dùng sau khi đăng nhập
     * CreatedBy dtnga (26/11/2020)
     * */
    loadAccount() {
        // TODO lấy thông tin người dùng từ API
        var user = userInfo;
        var fullName = user["FullName"];
        $(`.header .username`).text(fullName);
    }

    /** Thực hiện load thông tin cửa hàng do user làm chủ
     * CreatedBy dtnga (27/11/2020)
     * */
    loadShop() {
        try {
            // TODO lấy danh sách cửa hàng do user làm chủ từ API
            var shops = listShop;
            //bind tên shop + id vào combobox
            var select = $(`<select></select>`);
            $.each(shops, function (index, shop) {
                var option = $(`<option></option>`);
                var shopName = shop["ShopName"];
                var shopId = shop["ShopId"];
                option.append(shopName);
                select.append(option);
                // Lưu shopId vào data
                option.data("keyId", shopId);
            });
            var headerLeft = $(`.header .header-left`);
            headerLeft.append(select);
        }
        catch (e) {
            console.log(e);
        }
    }

    /* Hàm thực hiện khởi tạo sự kiện
     * CreatedBy dtnga (21/11/2020)
     * */
    initEvent() {
        try {
            var me = this;
            $(`#btn-addOrder`).on("click", me.onClick_btnAdd.bind(me));
            $(`#btn-refresh`).on("click", me.onClick_btnRefresh.bind(me));
            $(`#btn-create`).on("click", me.onClick_btnCreate.bind(me));
            $(`#btn-clear`).on("click", me.onClick_btnClear.bind(me));
            // TODO sự kiện khi nhập trường Tìm kiếm

            // TODO Sự kiện khi chọn filter
            
            // format khi nhập liệu số tiền
            me.autoFormatMoney();
            // kiểm tra dữ liệu
            me.checkRequired();
            me.validateEmail();

            // Sự kiện khi thao tác với từng hàng dữ liệu trong bảng
            $(`table tbody`).on("click", "tr", me.tr_onClick);
            $(`table tbody`).on("dblclick", "tr", me.onDblClick_trow.bind(me));
            // sự kiện khi tick vào checkbox/ nhiều checkbox
            $(`table thead input[type="checkbox"]`).on("click", me.onClickCheckAll.bind(me));
            // Sự kiện tự động thêm sản phẩm vào giỏ khi click nút Thêm vào giỏ
            $(`#btn-addToShoppingCard`).on("click", me.onClick_addToShoppingCard.bind(me));
            // TODO Sự kiện khi focus vào ô nhập liệu
            $(`input`).focus(function () { });

            $('.nav-item').on('click', function () {
                $('.nav-item').removeClass('select-menu-item');
                $(this).addClass('select-menu-item');
                // Ẩn các content
                $(`.content-body`).addClass("displayNone");
                // Hiển thị content tương ứng
                var fieldName = $(this).attr("fieldName");
                var content = $(`.content-body[fieldName="` + fieldName + `"]`);
                $(content).removeClass("displayNone");
                $(`.content-header-title`).text(content.attr("titleName"));

            })
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     *Thực hiện bind dữ liệu khách hàng tự động
     * CreatedBy dtnga (02/12/2020)
     * @param {object} customer Thông tin khách hàng
     */
    autoBindCustomer(customer) {
        if (!customer)
            return;
        var customerName = customer["FullName"].trim();
        var phoneNumber = customer["PhoneNumber"].trim();
        var address = customer["Address"].trim();
        var province = customer["Province"].trim();
        var district = customer["District"].trim();
        var ward = customer["Ward"].trim();
        // Bind dữ liệu
        $(`.box-info input[fieldName="CustomerName"]`).val(customerName);
        $(`.box-info input[fieldName="PhoneNumber"]`).val(phoneNumber);
        $(`.box-info input[fieldName="Address"]`).val(address);
        $(`.box-info input[fieldName="Province"]`).val(province);
        $(`.box-info input[fieldName="District"]`).val(district);
        $(`.box-info input[fieldName="Ward"]`).val(ward);

    }

    /**
     * Thực hiện gen và thêm sản phẩm mới vào giỏ hàng
     * CreatedBy dtnga (01/12/2020)
     * @param {object} product
     */
    addProductToCart(product) {

    }

    /** TODO Thực hiện cập nhật tổng tiền của giỏ hàng khi thay đổi giá sản  phẩm
     * CreatedBy dtnga (01/12/2020)
     * */
    onChangeProductPrice(priceInput) {
        try {
            var newPrice = convertInt($(priceInput).attr("value"));
            var currentProduct = $(priceInput).closest('.product-detail');
            var quantity = convertInt($(currentProduct).find(`input[type="number"]`).val());
            var newCost = quantity * newPrice;
            // Cập nhật tổng tiền sản phẩm
            $(currentProduct).find(`.cost`).text(formatMoney(newCost));
            $(currentProduct).find(`.cost`).attr("value", newCost);
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện lại tổng số lượng và số tiền các sản phẩm trong giỏ hàng 
     * CreatedBy dtnga (02/12/2020)
     */
    calcculateTotal() {
        try {
            //Cập nhật tổng số lượng sản phẩm trong giỏ hàng
            var totalQuantity = $(`#order-add .product-list`).children().length - 1; // trừ empty mark đi
            $(`.total-quantity span`).text(totalQuantity);
            // Nếu trống thì hiển thị empty mark
            if (totalQuantity <= 0) {
                var emptyMark = $(`.product-list .empty-mark`);
                $(emptyMark).removeClass(`displayNone`);
            }
            // Cập nhật tổng số tiền giỏ hàng
            var productList = $(`#order-add .product-list .product-detail`);
            var newTotal = 0;
            $.each(productList, function (index, item) {
                var cost = convertInt($(item).find(`.cost`).attr("value"));
                newTotal = newTotal + cost;
            });
            $(`#order-add .total-money`).text(formatMoney(newTotal));
            $(`#order-add .total-money`).attr("value", newTotal);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     *  Thực hiện cập nhật tổng tiền của giỏ hàng khi cập nhật số lượng sản phẩm
     * CreatedBy dtnga (01/12/2020)
     * @param {any} quantity
     */
    onChangeAmount(quantity) {
        try {
            var newQuantity = convertInt($(quantity).val());
            var currentProduct = $(quantity).closest('.product-detail');
            var currentPrice = convertInt($(currentProduct).find(`input[typeFormat="money"]`).attr("value"));
            var newCost = currentPrice * newQuantity;
            // Cập nhật tổng tiền sản phẩm
            $(currentProduct).find(`.cost`).text(formatMoney(newCost));
            $(currentProduct).find(`.cost`).attr("value", newCost);
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện thêm sản phẩm vào giỏ hàng
     * CreatedBy dtnga (29/11/2020)
     * */
    onClick_addToShoppingCard() {
        try {
            var me = this;
            //Lấy thông tin sản phẩm
            var productCodeField = $(`#order-add input[type="search"][fieldName="ProductCode"]`);
            var productCode = productCodeField.val().trim();

            // Hoặc lấy qua API bằng ProductCode
            //$.ajax({
            //    url: "" + "/" + productCode,
            //    method: "GET",
            //}).done(function (data) {

            //}).fail(function (res) {
            //    console.log(res);
            //});
            var product = listProduct.find(p => p["ProductCode"] == productCode);
            // Đưa ra thông báo sản phẩm không tồn tại
            if (!product) {
                var popup = $(`.popup-notification`);
                var popupBody = $(popup).find(`.popup-body`);
                $(popupBody).children().remove();
                var content = $(`<div class="popup-body-text">Sản phẩm mã <span> ` + productCode + ` </span> không tồn tại. Vui lòng kiểm tra và nhập lại</div>`);
                popupBody.append(content);
                popup.show();
                me.initEventPopup(popup);
                return;
            }
            // Đưa ra thông báo sản phẩm đã hết
            else if (product["Amount"] <= 0) {
                var popup = $(`.popup-notification`);
                var popupBody = $(popup).find(`.popup-body`);
                $(popupBody).children().remove();
                var content = $(`<div class="popup-body-text">Sản phẩm mã <span> ` + productCode + ` </span> hiện đã hết. Vui lòng kiểm tra và nhập lại</div>`);
                popupBody.append(content);
                popup.show();
                me.initEventPopup(popup);
                return;
            }
            else {
                // Thêm sản phẩm vào giỏ hàng
                // Nếu sản phẩm đã có trong giỏ hàng => số lượng + 1 và tăng tổng tiền
                var existProducts = $(`.product-list .product-detail`);
                var addNew = 1;
                // Nếu đã tồn tại trong giỏ hàng => cập nhật số lượng + số tiền 
                if (existProducts) {
                    $.each(existProducts, function (index, item) {
                        var code = $(item).find(`.product-code`).text().trim();
                        if (code == productCode) {
                            $(item).find(`.quantity`).val(function (i, oldval) {
                                return ++oldval;
                            })
                            var productPrice = convertInt(product["CurrentPrice"]);
                            var oldCost = $(item).find(`.cost`).attr("value");
                            var newCost = convertInt(oldCost) + productPrice;
                            $(item).find(`.cost`).text(formatMoney(newCost));
                            $(item).find(`.cost`).attr("value", newCost);
                            addNew = 0;
                            // Cập nhật tổng giá trị giỏ hàng
                            var oldTotal = convertInt($(`.total-money`).attr("value"));
                            var newTotal = oldTotal + productPrice;
                            $(`.total-money`).text(formatMoney(newTotal));
                            $(`.total-money`).attr("value", newTotal);
                        }
                    })
                }
                // Nếu chưa tồn tại trong giỏ hàng => thêm mới
                if (addNew == 1) {
                    // Ẩn Empty mark 
                    var emptyMark = $(`.product-list .empty-mark`);
                    $(emptyMark).addClass(`displayNone`);
                    me.addProductToCart(product);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm thực hiện khởi tạo sự kiện trên popup
     *  CreatedBy dtnga (30/11/2020)
     * @param {Element} popup cần khởi tạo sự kiện
     */
    initEventPopup(popup) {
        $(`.m-popup #btn-exit-popup`).on("click", function () {
            $(popup).hide();
        });
        $(`.m-popup #btn-close`).on("click", function () {
            $(popup).hide();
        });
        $('body').on("keydown", function (e) {
            if (e.which === 27)
                $(popup).hide();
        });
    }

    /**
     * Thực hiện xóa một sản phẩm trong giỏ hàng
     * ModifiedBy dtnga (02/12/2020)
     * @param {Element} button button xóa tại mỗi dòng sản phẩm
     */
    onClick_deleteProduct(button) {
        try {
            var productdetail = $(button).closest(".product-detail");
            // Xóa dòng chứa thông tin sản phẩm
            $(productdetail).remove();
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Hàm thực hiện set AutoComplete cho các trường yêu cầu AutoComplete
     * CreatedBy dtnga (28/11/200)
     * */
    autoComplete() {
        try {
            var inputs = $(`input[autocomplete="on"]`);
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr("fieldName");
                var data = listProduct;
                //Tạo source theo fielName của trường input
                var sourceList = [];
                $.each(data, function (index, item) {
                    var label = item[fieldName];
                    var value = item["ProductId"]; // TODO :)
                    sourceList.push({ label: label, value: value });
                });
                $(input).autocomplete({
                    source: sourceList,
                    autoFocus: true,
                    focus: function (event, suggest) {
                        $(input).val(suggest.item.label);
                        return false;
                    },
                    select: function (event, suggest) {
                        $(input).val(suggest.item.label);
                        var id = suggest.item.value;
                        return false;
                    }
                });
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Hàm thực hiện clear dữ liệu khi nhấn button Clear
     * CreatedBy dtnga (27/11/2020)
     * */
    onClick_btnClear() {
        var me = this;
        me.clear($(`.dialog-detail`));
        // CLear giỏ hàng
        $(`.product-list`).children().remove();
        // Cập nhật tổng số lượng sản phẩm
        $(`.total-quantity span`).text("0");
        // Cập nhật tổng giá trị giỏ hàng
        $(`.total-money`).text(0);
        $(`.total-money`).attr("value", 0);
    }

    /**TODO Hàm thực hiện thêm đơn hàng
     * CreatedBy dtnga (27/11/2020)
     * */
    onClick_btnCreate() {
        try {
            var me = this;
            // kiểm tra validate (bắt buộc nhập, email, ...), nếu vẫn còn trường chưa valid thì cảnh báo
            var invalidInputs = $(`input[validate="false"], select[validate="false"]`);
            if (invalidInputs && invalidInputs.length > 0) {
                $.each(invalidInputs, function (index, input) {
                    $(input).trigger('blur');
                });
                invalidInputs[0].focus();
            }
            // build dữ liệu
            // Lấy dữ liệu từ input
            var obj = new Object();
            var inputs = $(`.dialog-detail input`);
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

            //Đóng gói danh sách sản phẩm => Danh sách orderDetail

            // Đóng gói đơn vị vận chuyển => Transportor

            // Đóng gói người nhận => receiver

            // Lưu và thêm 

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
        // đóng form khi nhấn ESC
        $('body').on("keydown", me.onClick_ESC.bind(dialog));
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
                $(this).attr("value", ip);
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
            var invalidInputs = $(`input[validate="false"], select[validate="false"]`);
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
            var inputs = $(`input[type="text"]`);
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
        var dialog = $(`.m-dialog`);
        this.clear(dialog);
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
    /** Thực hiện clear dữ liệu và cảnh báo trên object truyền vào hàm
    * CreatedBy dtnga (17/11/2020) 
    */
    clear(obj) {
        $(obj).find(`input`).val(null);
        $(obj).find(`input[required],input[type="email"]`).removeClass("m-input-warning");
        $(obj).find(`input[required],input[type="email"]`).attr('validate', 'false');
        //clear ngày, select, radio button
        $(obj).find(`input[type="radio"]`).prop('checked', false);
        $(obj).find(`select option`).remove();
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
        var data = listOrder;
        $.each(data, function (index, obj) {
            var tr = $(`<tr></tr>`);
            $.each(ths, function (index, th) {
                var td = $(`<td></td>`);
                // Lấy fielname th 
                var fieldName = $(th).attr('fieldName');
                if (fieldName == "Checkbox") {
                    var checkbox = $(`<div><label class="m-checkbox">
                                                <input class="checkbox" type="checkbox" name="order" />
                                                <span class="checkmark"></span>
                                      </label></div>`);
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
    UserId: "d8c26030-7d87-4983-9cba-1fde544a25b0",
    FullName: "Đặng Thị Nga"
}

var listShop = [
    {
        ShopId: "a8f94c16-d0c8-4079-aa08-ebc60f23db63",
        ShopName: "Kho MIXI"
    },
    {
        ShopId: "a2472d49-dd5b-4c91-968b-454f7e69ab5d",
        ShopName: "Kho ANAN"
    },
    {
        ShopId: "61907e71-271b-4186-83e2-e488cdb99d78",
        ShopName: "Kho Guadiant"
    }
]

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

var listProduct = [
    {
        ProductId: "e16c44b9-1761-40c6-86c8-fc416c16cb3a",
        ProductCode: "D82MS-H",
        ProductName: "Máy tính kỹ thuật Deli - Đen/Xanh dương/Hồng/Trắng - D82MS",
        Color: "Hồng",
        Price: "178000",
        CurrentPrice: "178000",
        Amount: 0
    },
    {
        ProductId: "c4c2a268-210e-4df4-89fa-10d2d106fbb1",
        ProductCode: "D82MS-T",
        ProductName: "Máy tính kỹ thuật Deli - Đen/Xanh dương/Hồng/Trắng - D82MS",
        Color: "Trắng",
        Price: "178000",
        CurrentPrice: "178000",
        Amount: 5
    },
    {
        ProductId: "94c5c0e8-79ab-4c4f-9070-1cd1f0e1db04",
        ProductCode: "D82MS-Đ",
        ProductName: "Máy tính kỹ thuật Deli - Đen/Xanh dương/Hồng/Trắng - D82MS",
        Color: "Đen",
        Price: "178000",
        CurrentPrice: "178000",
        Amount: 10
    },
    {
        ProductId: "7c7b7ae6-ce62-4232-8881-1158a9d7224b",
        ProductCode: "D82MS-X",
        ProductName: "Máy tính kỹ thuật Deli - Đen/Xanh dương/Hồng/Trắng - D82MS",
        Color: "Xanh dương",
        Price: "178000",
        CurrentPrice: "150000",
        Amount: 2
    },
    {
        ProductId: "ecb85d35-baaf-476c-b029-e8e1e07cbf48",
        ProductCode: "HA560",
        ProductName: "Sổ tay còng A5 Deli - Bìa cứng - Có thể thay lõi sổ - Lõi ô vuông/kẻ ngang -HA560/NA560",
        Type: "Sổ bìa trong - HA560",
        Price: "85000",
        CurrentPrice: "80000",
        Amount: 21
    },
    {
        ProductId: "0cd8a906-fc20-4481-b275-0c4ffbaa5490",
        ProductCode: "NA560-V",
        ProductName: "Sổ tay còng A5 Deli - Bìa cứng - Có thể thay lõi sổ - Lõi ô vuông/kẻ ngang -HA560/NA560",
        Type: "Tệp ô vuông- NA560-V",
        Price: "19000",
        CurrentPrice: "17000",
        Amount: 35
    },
    {
        ProductId: "be5d4b42-f987-45c0-81bd-2ed41b15b91a",
        ProductCode: "NA560-KN",
        ProductName: "Sổ tay còng A5 Deli - Bìa cứng - Có thể thay lõi sổ - Lõi ô vuông/kẻ ngang -HA560/NA560",
        Type: "Tệp ngang - NA560-KN",
        Price: "19000",
        CurrentPrice: "17000",
        Amount: 15
    }
]

var listOrder = [
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

var listCustomer = [
    {
        ReceiverId: "126339f9-1e9c-7ed8-8a2a-acc8fc2f00af",
        FullName: "Nguyễn Văn Cường",
        PhoneNumber: "0915389872",
        SuccessOrderedAmount: "2",
        OrderAmount: "3",
        CreatedDate: "2/22/2020 2:31:23 AM",
        Address: "120, ngõ 322, đường Mỹ Đình",
        AdministrativeAreaCode: ""
        
    },
    {
        ReceiverId: "1294ae7e-2858-2074-4429-0204eeb736fa",
        FullName: "Hoàng Văn Phan ",
        PhoneNumber: "0916486170",
        Address: "5, ngõ 67, đường Phùng Khoang",
        SuccessOrderedAmount: "2",
        OrderAmount: "3",
        CreatedDate: "2/22/2020 2:31:23 AM",
        Province: "Hà Nội",
        District: "Nam Từ Liêm",
        Ward: "Trung Văn",
        Street: "Phùng Khoang"
    }
]
