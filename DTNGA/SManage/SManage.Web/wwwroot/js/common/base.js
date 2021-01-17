
class Base {
    constructor() {
        var me = this;
        me.host = "https://localhost:44394";
        // Mode action
        me.formMode = "";
        // API Route xử lý dữ liệu
        me.route = "";
        // Phương thức gọi API
        me.method = "";
        // Thông báo tương ứng với formMode
        me.mesHeader = "";
        // Tên đối tượng đang xử lý hiện tại
        me.objectName = "Order";

    }

    /**
     * Thực hiện lấy route
     * CreatedBy dtnga (26/12/2020)
     * */
    getRoute() {
        var me = this;
        var route = $(`.content-body:visible`).attr("route");
        me.route = "/api/v1/" + route;
        return me.route;
    }

    /**
     * Thực hiện lấy tên object đang xử lý
     * CreatedBy dtnga (26/12/2020)
     * */
    getObjectName() {
        var me = this;
        me.objectName = $(`.content-body:visible`).attr("fieldName");
        return me.objectName;
    }

    /**
     * Thực hiện lấy method
     * CreatedBy dtnga (26/12/2020)
     * */
    getMethod() {
        var me = this;
        if (me.formMode == "add") {
            me.method = "POST";
            me.mesHeader = "Thêm ";
        }
        else if (me.formMode == "edit") {
            me.method = "PUT";
            me.mesHeader = "Sửa ";
        }
        else if (me.formMode == "get") {
            me.method = "GET";
            me.mesHeader = "Lấy dữ liệu";
        }
        else if (me.formMode == "delete") {
            me.method = "DELETE";
            me.mesHeader = "Xóa";
        }
        return me.method;
    }

    /** Thực hiện lấy thông tin người dùng sau khi đăng nhập
     * CreatedBy dtnga (26/11/2020)
     * */
    loadAccount() {
        try {
            var me = this;
            var fullName = me.userInfo["FullName"];
            var userId = me.userInfo["UserId"];
            $(`.header .username`).text(fullName);
            $(`.header .username`).data("keyId", userId);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Sinh combobox với danh sách option cho trước
     * CreatedBy dtnga (10/12/2020)
     * @param {object} data danh sách option
     * @param {Element} targetCombo comboBox cần gen dữ liệu
     */
    createComboBox(data, targetCombo) {
        try {
            var me = this;
            var targetCombo = $(targetCombo);
            $(targetCombo).children().remove();
            var comboName = $(targetCombo).attr("name");
            var title = (!$(targetCombo).attr("title")) ? "" : $(targetCombo).attr("title");
            var comboSelectBox = $(`<div class="m-input selected-box">
                                       <input class="" type="search" placeholder="`+ title + `"/>
                                       <div class="arrow-button">
                                            <div class="m-icon arrow-icon"></div>
                                       </div>
                                     </div>`);
            targetCombo.append(comboSelectBox);
            var wrapper = $(`<div class="wrapper displayNone"> </div>`);
            var comboItemBox = $(`<div class="inner-wrapper combo-item-box "> </div>`);
            var optionIcon = `<div class="option-icon">
                                   <div class="displayNone m-icon check-icon"></div>
                               </div>`;
            // Option : chọn tất cả item (xóa lọc)
            var optionAll = $(`<div class="item combo-item item-hover" selectAll> <div class="option-icon">
                                   <div class="displayNone m-icon check-icon"></div>
                               </div><div class="option-text">Tất cả</div></div>`);
            var filterParent = $(targetCombo).closest(`.content-filter`);
            if (filterParent.length > 0)
                comboItemBox.append(optionAll);
            $.each(data, function (index, item) {
                if (item) {
                    var optionName = "";
                    var optionId = "";
                    if (typeof (item) == "string") {
                        optionName = item;
                        optionId = item;
                    }
                    else {
                        var idPropName = comboName + "Id";
                        var namePropname = comboName + "Name";
                        optionName = item[namePropname];
                        optionId = item[idPropName];
                    }
                    var optionText = `<div class="option-text">` + optionName + `</div>`;
                    var option = $(`<div class="item combo-item "></div>`);
                    $(option).data("keyId", optionId);
                    var comboItem = $(optionIcon + optionText);
                    option.append(comboItem);
                    comboItemBox.append(option);
                }
            })
            wrapper.append(comboItemBox);
            targetCombo.append(wrapper);
            // sự kiện khi click ra ngoài combo-item-box => đóng comboItemBox
            me.detectClickOutside(targetCombo);
            // Focus vào item đầu tiên
            $(comboItemBox).find(`.item:first-child`).addClass("item-hover");
            // Khởi tạo sự kiện cho từng thành phần
            var comboInputField = $(targetCombo).find(`.selected-box input`);
            var comboButton = $(targetCombo).find(`.arrow-button`);
            // Sự kiện khi focus/blur trường nhập liệu tại combobox
            $(comboInputField).focus(function () {
                $(targetCombo).addClass("green-border");
            })
            $(comboInputField).blur(function () {
                $(targetCombo).removeClass("green-border");
                var validateAttr = $(targetCombo).attr("validate");
                if (typeof validateAttr !== typeof undefined && validateAttr == "false") {
                    $(targetCombo).addClass("m-input-warning");
                    $(targetCombo).closest(".input-box").find(".error-validate").removeClass("displayNone");
                }
                else if (typeof validateAttr !== typeof undefined && validateAttr == "true")
                    $(targetCombo).removeClass("m-input-warning");

            })
            me.detectKeyCode(comboInputField);
            // Sự kiện khi click erase icon trong input search
            $(comboInputField).on("search", function () {
                me.onChangeComboInputField(this);
            });
            // sự kiện khi click chọn combo item
            $(comboItemBox).find(`.item`).on("click", function () {
                me.onSelect_comboItem(this);
            }); 
            // Sự kiện khi click arrow icon tại combo box
            $(comboButton).on("click", function () {
                me.onClick_btnComboBoxButton(comboButton);
            });

            return targetCombo;
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Hiển thị combo item của ComboBox
     * @param {any} comboBox comboBox cần xử lý
     * CreatedBy dtnga (05/12/2020)
     */
    opentComboWrapper(comboBox) {
        try {
            if (!comboBox) return;

            $(comboBox).addClass("green-border");
            // arrow button
            var comboButton = $(comboBox).find(".arrow-button");
            if (!$(comboButton).hasClass("arrow-button-clicked")) {
                // quay ngược arrow icon
                $(comboButton).addClass("rotate");
                $(comboButton).addClass(`arrow-button-clicked`);
            }
            var wrapper = $(comboBox).find(`.wrapper`);
            // input
        //    $(comboBox).find(`input`).focus();
            if (!$(comboBox).find(`input`).val())
                $(wrapper).find(".item").show();
            // comboItem
            if ($(wrapper).hasClass("displayNone")) {
                $(wrapper).removeClass("displayNone");
                var items = $(wrapper).find(".item:visible");
                $(items).removeClass("item-hover");
                $(items).first().addClass("item-hover");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Đóng comboItem của comboBox
     * @param {any} comboItem
     * CreatedBy dtnga (05/01/2020)
     */
    closeComboWrapper(comboItem) {
        try {
            if (!comboItem) return;
            var parent = $(comboItem).closest(".m-box");
            $(comboItem).addClass("displayNone");
            $(parent).find(`.arrow-button`).removeClass("rotate");
            $(parent).find(`.arrow-button`).removeClass("arrow-button-clicked");
            $(parent).removeClass("green-border");
        }
        catch (e) {
            console.log(e);
        }
    }

    /** 
     * Thực hiện chọn item trong box (combobox/dropdown)
     * @param {any} box Box cần chọn item
     * @param {any} itemId Id item cần được chọn
     * CreatedBy dtnga (24/12/2020)
     */
    SelectItem(box, itemId) {
        try {
            var me = this;
            var box = $(box);
            var id = itemId;
            var items = $(box).find(`.item`);
            $.each(items, function (index, item) {
                $(item).removeClass("selected");
                $(item).find(`.check-icon`).addClass("displayNone");
                var itemId = $(item).data("keyId");
                if (itemId == id) {
                    // set style cho item được chọn:
                    var selectedItem = $(item);
                    $(selectedItem).addClass("selected");
                    $(selectedItem).find(`.check-icon`).removeClass("displayNone");
                    var selectedItemText = $(selectedItem).find(`.option-text`).text();
                    $(selectedItem).closest(`.m-box`).find(`input`).val(selectedItemText);
                    $(selectedItem).closest(`.m-box`).data("keyId", id);
                    $(box).closest(".input-box").find(".error-empty").addClass("displayNone");
                    var validateAttr = $(selectedItem).closest(`.m-box`).attr("validate");
                    if (typeof validateAttr !== typeof undefined && validateAttr == "false")
                        $(selectedItem).closest(`.m-box`).attr("validate", true);
                    return true;
                }
            })
            return false;
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Sự kiện khi click button tại combobox
    * CreatedBy dtnga (10/12/2020)
    * */
    onClick_btnComboBoxButton(comboButton) {
        var me = this;
        // combobox
        var comboBox = $(comboButton).closest(`.m-box`);
        me.opentComboWrapper(comboBox);
        return;
    }

    /**
     * Sự kiện khi click chọn item
     * CreatedBy dtnga(10/12/2020)
     * @param {element} selectedItem item được chọn
     */
    onSelect_comboItem(selectedItem) {
        var me = this;
        var item = selectedItem;
        // combobox
        var comboBox = $(item).closest(`.m-box, .m-autoComplete`);
        // inner-wrapper, các item còn lại
        var comboItemBox = $(item).closest(".inner-wrapper");
        var items = $(comboItemBox).find(`.item`);
        $.each(items, function (index, item) {
            $(item).removeClass("selected");
            $(item).find(`.option-icon .check-icon`).addClass("displayNone");
        })
        // item được chọn
        $(item).removeClass("item-hover");
        $(item).addClass("selected");
        $(item).find(`.option-icon .check-icon`).removeClass("displayNone");
        // đóng comboItem
        me.closeComboWrapper($(comboBox).find(".wrapper"));
        // đổ dữ liệu lên input field
        var optionText = $(item).find(`.option-text`);
        var optionText = $(optionText).text();
        var inputField = $(comboBox).find(`input`);
        $(inputField).val(optionText);
        // Lưu id của item vào combobox
        var id = $(item).data("keyId");
        if (!id) $(comboBox).data("keyId", null);
        $(comboBox).data("keyId", id);
        var validateAttr = $(comboBox).attr("validate");
        if (typeof validateAttr !== typeof undefined && validateAttr == "false") {
            $(comboBox).attr("validate", true);
        }
        $(comboBox).closest(".input-box").find(".error-empty").addClass("displayNone");
        $(comboBox).removeClass("m-input-warning");
        me.doSomethingWhenItemSelected(item);
    }

    /**
    *  Thực hiện hành động sau khi chọn option tại comboBox/ Dropdown
    * @param {Element} option option được chọn
    *  CreatedBy dtnga (12/12/2020)
    */
    doSomethingWhenItemSelected(option) {
        try {
            var me = this;
            var box = $(option).closest(".m-box");
            var attr = $(box).attr("loadAfterSelect");
            if (typeof attr !== typeof undefined && attr !== false) {
                var optionAttr = $(option).attr("selectAll");
                if (typeof optionAttr !== typeof undefined && optionAttr !== false) {
                    $(box).data("KeyId", null);
                }
                me.loadData(1);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
    * Ẩn comboItem nếu click ra ngoài comboItem
    * CreatedBy dtnga (10/12/2020)
    * @param {Element} comboBox
    */
    detectClickOutside(comboBox) {
        var me = this;
        $(document).mouseup(function (e) {
            // Nếu container đang mở
            if (!$(comboBox).hasClass("displayNone")) {
                // Nếu target không phải container
                if (!comboBox.is(e.target) && comboBox.has(e.target).length === 0) {
                    var comboItem = $(comboBox).find(".wrapper");
                    me.closeComboWrapper(comboItem);
                }
            }
        });
    }

    /**
     * Sự kiện khi ấn phím tại trường nhập liệu của combobox/Dropdown
     * CreatedBy dtnga (10/12/2020)
     * @param {Element} element trường nhập liệu tại combobox/Dropdown
     */
    detectKeyCode(element) {
        var me = this;
        var parent = $(element).closest(".m-box");
        if (parent.length == 0) parent= $(".m-autoComplete");
        var wrapper = $(parent).find(`.wrapper`);
        var innerWrapper = $(parent).find(".inner-wrapper");

        $(element).on("keyup", function (e) {
            if (e.which == 13) {
                if ($(wrapper).hasClass("displayNone")) {
                }
                else {
                    var hoverdItem = $(innerWrapper).find('.item-hover');
                    me.onSelect_comboItem(hoverdItem);
                }
                return;
            }
            else if (e.which !== 13 && e.which !== 38 && e.which !== 40) {
                var value = $(this).val().toLowerCase();
                $(this).closest(".m-box").find(".item").filter(function () {
                    $(this).closest(".wrapper").removeClass("displayNone");
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                    var visibleItem = $(this).closest(".wrapper").find(".item:visible");
                    if (visibleItem.length > 0) {
                        $(this).closest(".wrapper").find(".item").removeClass("item-hover");
                        $(visibleItem).first().addClass("item-hover");
                    }
                });
            }
        });
        $(element).on("keydown", function (e) {
            if (e.which == 9) {
                if (!$(wrapper).hasClass("displayNone"))
                    $(wrapper).addClass("displayNone");
            }
            else if (e.which == 40) {
                me.opentComboWrapper(parent);
                var items = $(innerWrapper).find('.item:visible');
                if ($(items[items.length - 1]).hasClass("item-hover")) {
                    $(items[items.length - 1]).removeClass('item-hover');
                    $(items[0]).addClass('item-hover');
                    me.centerItFixedHeight($(items[0]), wrapper);
                    return;
                }
                else {
                    for (var i = 0; i < items.length - 1; i++) {
                        if ($(items[i]).hasClass("item-hover")) {
                            $(items[i]).removeClass('item-hover');
                            $(items[i + 1]).addClass('item-hover');
                            me.centerItFixedHeight($(items[i + 1]), wrapper);
                            return;
                        }
                    }
                }

            } else if (e.which == 38) {
                me.opentComboWrapper(parent);
                var items = $(innerWrapper).find('.item:visible');
                if ($(items[0]).hasClass("item-hover")) {
                    $(items[0]).removeClass('item-hover');
                    $(items[items.length - 1]).addClass('item-hover');
                    me.centerItFixedHeight($(items[items.length - 1]), wrapper);
                    return;
                }
                for (var i = 1; i < items.length; i++) {
                    if ($(items[i]).hasClass("item-hover")) {
                        $(items[i]).removeClass('item-hover');
                        $(items[i - 1]).addClass('item-hover');
                        me.centerItFixedHeight($(items[i - 1]), wrapper);
                        return;
                    }
                }
            }
        });
    }


    /**
     * Thực hiện đưa target vào giữa của outer (theo chiều dọc)
     * CreatedBy dtnga (23/12/2020)
     * @param {any} target item cần đưa vào giữa
     * @param {any} outer  thành phần scroll chứa các item
     */
    centerItFixedHeight(target, outer) {
        var out = $(outer);
        var tar = $(target);
        var x = out.height();
        var y = tar.outerHeight(true);
        var z = tar.index();
        out.scrollTop(Math.max(0, (y * z) - (x - y) / 2));
    }

    /**
     * Sự kiện khi thay đổi giá trị input tại comboBox/Dropdown
     * @param {Element} input trường input thay đổi tại combobox
     * CreatedBy dtnga (27/12/2020)
     */
    onChangeComboInputField(input) {
        try {
            if (input) {
                var me = this;
                var inputText = $(input).val();
                var box = $(input).closest(".m-box");
                var comboItem = $(box).find(`.wrapper`);
                if (!inputText) {
                    $(box).data("keyId", null);
                    $(box).find(".item").removeClass("selected");
                    $(box).find(".item .check-icon").addClass("displayNone");
                    var validateAttr = $(box).attr("validate");
                    if (typeof validateAttr !== typeof undefined && validateAttr == "true") {
                        $(box).attr("validate", false);
                    }
                    $(box).closest(".input-box").find(".error-empty").removeClass("displayNone");
                }
                else {
                    var selectedItemId = $(comboItem).find(".item-hover").data("keyId");
                    me.SelectItem(box, selectedItemId);
                    var attr = $(box).attr("loadAfterSelect");
                    if (typeof attr !== typeof undefined && attr !== false && $(comboItem).hasClass("displayNone"))
                        me.loadData(1);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện gen và thêm sản phẩm mới vào giỏ hàng
     * CreatedBy dtnga (01/12/2020)
     * @param {string} productId Id sản phẩm, nếu Id null thì lấy dữ liệu theo tham số thứ 2
     * @param {Object} productObj Object thông tin sản phẩm
     */
    addProductToCart(productId, productObj) {
        var me = this;
        if (!product && !productObj) return;
        if (productId && !productObj) {
            //Lấy thông tin sản phẩm theo Id
            var route = "/api/v1/Products/" + productId;
            var product = new Object();
            $.ajax({
                url: me.host + route,
                method: "GET"
            })
                .done(function (res) {
                    if (res) {
                        product = res;
                    }
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
        else if ((!productId || !productId.trim()) && productObj) {
            product = productObj;
        }
        var productList = $(`.content-body:visible`).find(`.product-list`);
        $(productList).find(`.empty-mark`).addClass("displayNone");
        var index = $(productList).find(`.product-detail`).length + 1;
        var productCode = product["ProductCode"];
        var productName = product["ProductName"];
        var productPrice = convertInt(product["Price"]);
        if (!productPrice)
            productPrice = convertInt(product["CurrentPrice"]);
        var curentAmount = convertInt(product["Amount"]);
        var productDetail = $(`<div class="product-detail">
                                            <div class="product-line">
                                                <div class="product-line-left">
                                                    <button class="button-delete m-icon round-icon delete-icon" title="Xóa"></button>
                                                    <div class="product-box" title="`+ productName + `">
                                                        <div class="product-code blue-text bold">`+ productCode + `</div>
                                                        <div class="product-name"><span>`+ productName + `</span></div>
                                                    </div>
                                                </div>
                                                <div class="product-line-right">
                                                    <div><input class="m-input price" type="text" typeFormat="money" fieldName="CurrentPrice" value="`+ productPrice + `" index="` + index + `"/></div>
                                                    <div> x </div>
                                                    <div class="quantity-box"><input class="m-input quantity" type="number" min="1" max="`+ curentAmount + `" value="1" placeholder="Còn lại ` + curentAmount + ` sản phẩm" title="Còn lại ` + curentAmount + ` sản phẩm" index="` + index + `"/></div>
                                                </div>
                                            </div>
                                            <div class="cost-line">
                                                <div class="cost" value="`+ productPrice + `">` + formatMoney(productPrice) + `</div>
                                            </div>
                                        </div>`);
        productList.append(productDetail);
        $(productDetail).find(`input.price`).val(formatMoney(productPrice));
        me.calcculateTotal();
        // format khi nhập liệu số tiền
        me.autoFormatMoney();
        me.addFocusSupport();
        // Sự kiện khi nhấn nút xóa tại mỗi dòng sản phẩm
        $(`.product-list .product-line button`).on("click", function () {
            me.onClick_deleteProduct(this);
            me.calcculateTotal();
        });
        // sự kiện khi thay đổi giá bán sản phẩm
        $(`.product-list .product-line input[typeFormat="money"]`).on("keyup", function () {
            // Cập nhật tổng tiền sản phẩm
            me.onChangeProductPrice(this);
            // Cập nhật tổng số lượng và số tiền giỏ hàng
            me.calcculateTotal();
        });
        // sự kiện khi thay đổi số lượng sản phẩm
        $(`.product-list .product-line input[type="number"]`).on("input", function () {
            // Cập nhật tổng tiền sản phẩm
            me.onChangeAmount(this);
            // Cập nhật tổng số lượng và số tiền giỏ hàng
            me.calcculateTotal();
        });

    }

     
    /**Thực hiện cập nhật tổng tiền của giỏ hàng khi thay đổi giá sản  phẩm
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
            var productList = $(`.content-body:visible .product-list`);
            var totalQuantity = $(productList).children().length - 1; // trừ empty mark đi
            $(productList).closest(`.shopping-cart`).find(`.total-quantity span`).text(totalQuantity);
            // Nếu trống thì hiển thị empty mark
            if (totalQuantity <= 0) {
                var emptyMark = $(productList).find(`.empty-mark`);
                $(emptyMark).removeClass(`displayNone`);
            }
            // Cập nhật tổng số tiền giỏ hàng
            var products = $(productList).find(`.product-detail`);
            var newTotal = 0;
            $.each(products, function (index, item) {
                var cost = convertInt($(item).find(`.cost`).attr("value"));
                newTotal = newTotal + cost;
            });
            $(productList).closest(`.shopping-cart`).find(`.total-money`).text(formatMoney(newTotal));
            $(productList).closest(`.shopping-cart`).find(`.total-money`).attr("value", newTotal);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     *  Thực hiện cập nhật tổng tiền sản phẩm khi cập nhật số lượng sản phẩm
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

    /**TODO Thực hiện thêm sản phẩm vào giỏ hàng
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
            $(popup).addClass("displayNone");
        });
        $(`.m-popup #btn-cancel-popup`).on("click", function () {
            $(popup).addClass("displayNone");
        });
        $('body').on("keydown", function (e) {
            if (e.which === 27)
                $(popup).addClass("displayNone");
        });
    }

    /**
     *  thực hiện xóa bản ghi được chọn khi click button Xóa
     *  CreatedBy dtnga (23/12/2020)
     * @param {any} buttonDelte
     */
    onClick_btnDelete(buttonDelete) {
        try {
            var me = this;
            var button = $(buttonDelete);
            // Hiện Popup Xóa
            var popup = $(`#popup-delete`);
            var bodyPopupText = $(popup).find(`.popup-body-text`);

            $(popup).removeClass("displayNone");
            me.initEventPopup(popup);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Xóa bản ghi
     * CreatedBy dtnga (23/12/2020)
     * */
    onDeleteSelectedRow() {
        try {
            var me = this;
            var popupDelete = $(`#popup-delete`);
            var parentBody = $(`.content-body:visible`);
            var selectedRows = $(parentBody).find(`table tr.selected`);
            var data = [];
            $.each(selectedRows, function (index, item) {
                data.push($(item).data("keyId"));
            })
            me.route = me.getRoute();
            $.ajax({
                url: me.host + me.route,
                method: "DELETE",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json",
            })
                .done(function (res) {
                    // Ẩn popup
                    $(popupDelete).addClass("displayNone");
                    //Lấy row ngay sau row được chọn và chuyển nó sang trạng thái selected
                    var nextRow = $(selectedRows).last().next();
                    nextRow.addClass("selected");
                    $(nextRow).find(`input[type=checkbox]`).prop("checked", true);
                    // Remove rows được chọn hiện tại
                    $(selectedRows).remove();
                    // Hiển thị toast thông báo thành công
                    me.showToastMesseger("Xóa thành công", "success");
                    if ($(parentBody).find(`table thead input[type="checkbox"]`).is(":checked")) {
                        $(parentBody).find(`table thead input[type="checkbox"]`).prop("checked", false);
                    }
                    me.loadData();
                })
                .fail(function (res) {
                    console.log(res);
                    // Ẩn popup
                    $(popupDelete).addClass("displayNone");
                    // Hiển thị toast thông báo lỗi
                    me.showToastMesseger("Xóa không thành công", "fail");
                })
        }
        catch (e) {

        }
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

    /**
     * Đăng xuất khỏi hệ thống
     * */
    onclick_btnLogout() {
        var me = this;
        $.ajax({
            url: me.host + "/api/v1/Accounts/logout",
            method: "DELETE"
        })
            .done(function (res) {
                location.replace("/view/login.html");
            })
            .fail(function (res) {
                console.log(res);
            })
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
        //Ẩn các box thông báo/ thông tin thêm
        $(`.empty-result`).addClass("displayNone");
        $(`.extra-info`).addClass("displayNone");
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
    onClick_btnAdd(buttonAdd) {
        try {
            var me = this;
            me.formMode = "add";
            if (!buttonAdd) var dialog = $(`.content-body:visible .m-dialog`);
            else var dialog = $(buttonAdd).closest(`.content-body`).find(`.m-dialog`);
            me.showDialog(dialog);
        } catch (e) {
            console.log(e);
        }
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
    onClick_btnSave(buttonSave) {
        try {
            var me = this;
            var button = $(buttonSave);
            var form = $(button).closest(".m-dialog");
            // kiểm tra validate (bắt buộc nhập, email, ...), nếu vẫn còn trường chưa valid thì cảnh báo
            var valid = me.ValidateForm(form);
            if (valid) {
                $(`.m-loading`).removeClass("displayNone");
                // build dữ liệu
                var obj = me.GetDataForm(form);
                // Gọi Api Lưu dữ liệu
                $.ajax({
                    url: me.host + me.getRoute(),
                    method: me.getMethod(),
                    data: JSON.stringify(obj),
                    contentType: "application/json",
                    dataType: "json"
                })
                    .done(function (res) {
                        $(`.m-loading`).addClass("displayNone");
                        $(`.m-dialog:visible`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + "thành công", "success");
                        me.loadData();
                    })
                    .fail(function (res) {
                        console.log(res);
                        $(`.m-dialog:visible`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + "không thành công", "fail");
                    })
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện lưu dữ liệu mới và hiển thị form thêm mới
     * CreatedBy dtnga (24/12/2020)
     * */
    onClick_btnSaveAdd(buttonSave) {
        try {
            var me = this;
            var button = $(buttonSave);
            var form = $(button).closest(".m-dialog");
            // kiểm tra validate (bắt buộc nhập, email, ...), nếu vẫn còn trường chưa valid thì cảnh báo
            var valid = me.ValidateForm(form);
            if (valid) {
                // build dữ liệu
                var obj = me.GetDataForm(form);
                // Gọi Api Lưu dữ liệu
                $.ajax({
                    url: me.host + me.getRoute(),
                    method: me.getMethod(),
                    data: JSON.stringify(obj),
                    contentType: "application/json",
                    dataType: "json"
                })
                    .done(function (res) {
                        $(`.m-loading`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + " thành công", "success");
                        me.loadData();
                        $(form).find(".header-text").text("THÊM");
                        me.formMode = "add";
                        me.clear(form);
                    })
                    .fail(function (res) {
                        console.log(res);
                        $(`.m-dialog:visible`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + "không thành công", "fail");
                    })
            }
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
            var inputs = $(`input, textarea`);
            // focus đến ô nhập liệu đầu tiên
            inputs[0].focus();
            $(inputs).focus(function () {
                $(this).select();
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Kiểm tra input có hợp lệ không 
    * @param {Element} inputField trường input được blur
   * CreatedBy dtnga (08/12/2020)
    */
    onBlur_inputField(inputField) {
        if (inputField) {
            var me = this;
            var input = $(inputField);
            var value = $(input).val();
            $(input).closest(".input-box").find(".error-duplicate").addClass("displayNone");
            $(input).closest(".input-box").find(".error-empty").addClass("displayNone");
            $(input).removeClass("m-input-warning");
            $(input).removeAttr('validate');
            // Check trùng
            var duplicateAttr = $(input).attr("unduplicated");
            if (value.trim() && typeof duplicateAttr !== typeof undefined && duplicateAttr !== false) {
                var oldValue = $(input).attr("value").trim();
                if (value && value.trim() !== oldValue) {
                    var fieldName = $(input).attr("fieldName");
                    $.ajax({
                        url: me.host + me.getRoute() + "/duplication?key=" + fieldName + "&value=" + value,
                        method: "GET"
                    })
                        .done(function (res) {
                            if (res) {
                                // Bị trùng
                                $(input).addClass("m-input-warning");
                                $(input).attr('validate', 'false');
                                $(input).closest(".input-box").find(".error-duplicate").removeClass("displayNone");
                            }
                        })
                        .fail(function (res) {
                            console.log(res);
                        })
                }
            }
            else if ((!value || !value.trim()) && $(input).is(":required")) {
                $(input).addClass("m-input-warning");
                $(input).attr('validate', 'false');
                $(input).attr('title', "Trường này không được để trống");
                $(input).closest(".input-box").find(".error-empty").removeClass("displayNone");
            }
        }
    }

    /** 
     * TODO bị lặp/ Kiểm tra trường bắt buộc nhập trước
     * CreatedBy dtnga(08/12/2020)
     * */
    onFocus_inputField() {
        var input = this;
        var requiedField = $(input).attr("requiredField");
        if (requiedField) {
            var contentBox = $(this).closest(".content-box");
            var requiredInput = $(contentBox).find(`input[fieldName=` + requiedField + `]`);
            var requiredValue = $(requiredInput).val();
            if (!requiredValue) {
                var popup = $(`.popup-notification`);
                var popupBody = $(popup).find(`.popup-body`);
                $(popupBody).children().remove();
                var content = $(`<div class="popup-body-text">Vui lòng chọn thông tin tỉnh/thành trước</div>`);
                popupBody.append(content);
                popup.show();
                me.initEventPopup(popup);
                return;
            }
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
        $(`input[type='email'][required]`).blur(function () {
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
        var dialog = $(`.content-body:visible`).find(`.m-dialog`);
        this.clear(dialog);
        dialog.addClass("displayNone");
    }

    /** Hàm thực hiện đóng form khi người dùng nhấn ESC
     * CreatedBy dtnga (26/11/2020)
     * */
    onClick_ESC() {
        var me = this;
        me.on("keydown", function (e) {
            if (e.which === 27) {
                me.addClass("displayNone");
            }
        });
    }

    /** Thực hiện clear dữ liệu và cảnh báo trên object truyền vào hàm
   * CreatedBy dtnga (17/11/2020) 
   */
    clear(obj) {
        $(obj).find(`input, textarea`).val(null);
        $(obj).find(`input, textarea`).attr("value", '');
        $(obj).find(`input[typeformat="money"]`).val(0); 
        $(obj).find(`input[typeformat="money"]`).attr("value",0);
        $(obj).find(`input[required],input[type="email"]`).removeClass("m-input-warning");
        $(obj).find(`input[required],input[type="email"]`).attr('validate', 'false');
        //clear ngày, select, radio button
        $(obj).find(`input[type="radio"]`).prop('checked', false);
        $(obj).find(`select option`).remove();

        //comboBox/dropdown
        var boxs = $(obj).find(`.m-box`);
        $(boxs).removeClass("m-input-warning");
        $(boxs).data("keyId", null);
        $(boxs).find(`.item`).removeClass("selected");
        $(boxs).find(`.item .check-icon`).addClass("displayNone");
        $(obj).find(`.m-box[validate]`).attr("validate", false);

        // thông báo validate
        $(obj).find(`.error-validate`).addClass("displayNone");
    }

    /**
     * Thực hiện xóa hết dữ liệu của comboBox
     * @param {Element} comboBox
     * CreatedBy dtnga (20/12/2020)
     */
    clearCombobox(comboBox) {
        if (comboBox) {
            $(comboBox).find(`.item`).remove();
            $(comboBox).find(`input`).val('');
            $(comboBox).data("keyId", null);
        }
    }

    /** Hàm thực hiện làm mới dữ liệu
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnRefresh() {
        this.loadData();
    }


    /**
     * Tô màu cho bản ghi được chọn
     * CreatedBy dtnga (21/11/2020)
     * */
    tr_onClick(row) {
        try {
            var me = this;
            if ($(`thead input[type="checkbox"]`).is(":checked")) {
                $(`thead input[type="checkbox"]`).prop("checked", false);
                $(`tbody`).find(`.checkmark`).removeClass("selected");
                $(`tbody tr`).removeClass("selected");
                $(row).addClass("selected");
                $(row).find(`.checkmark`).addClass("selected");
                me.checkSelectedRow();
                return;
            }
            else if ($(row).hasClass("selected")) {
                $(row).removeClass("selected");
                $(row).find(`.checkmark`).removeClass("selected");
                me.checkSelectedRow();
                return;
            }
            else {
                $(row).addClass("selected");
                $(row).find(`.checkmark`).addClass("selected");
                me.checkSelectedRow();
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Hiển thị form Sửa thông tin khi double click vào 1 bản ghi
     * CreatedBy dtnga (21/11/2020)
     * @param {Element} row Row được click
     */
    onDblClick_trow(row) {
        try {
            var me = this;
            me.formMode = "edit";
            //Đổi màu hàng dữ liệu
            var selected = $(row);
            $(selected).closest(`tbody`).find(`tr`).removeClass("selected");
            $(selected).closest(`tbody`).find(`.checkmark`).removeClass("selected");
            $(selected).addClass("selected");
            $(selected).find(`.checkmark`).addClass("selected");
            //Show form cập nhật đơn hàng
            var dialog = $(selected).closest(`.content-body`).find(`.m-dialog`);
            me.showDialog(dialog);
            $(`.m-loading`).removeClass("displayNone");
            // bind dữ liệu hàng được chọn lên form
            var id = $(selected).data('keyId');
            $(dialog).data("keyId", id);
            // Lấy thông tin từ api bằng id tương ứng
            $.ajax({
                url: me.host + me.getRoute() + "/" + id,
                method: "GET"
            })
                .done(function (res) {
                    var data = res;
                    me.BindDatatoForm(data, dialog);
                    $(`.m-loading`).addClass("displayNone");
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    
    /**
     * Thực hiện chọn tất cả bản ghi
    * CreatedBy dtnga (21/11/2020)
     * @param {any} checkbox
     */
    onClickCheckAll(checkbox) {
        try {
            var me = this;
            var checkboxAll = $(checkbox);
            var parentTable = $(checkboxAll).closest(`table`);
            if ($(checkboxAll).is(":checked")) {
                $(parentTable).find(`tbody .checkmark`).addClass("selected");
                $(parentTable).find(`tbody tr`).addClass("selected");
            }
            else {
                $(parentTable).find(`tbody .checkmark`).removeClass("selected");
                $(parentTable).find(`tbody tr`).removeClass("selected");
            }
            me.checkSelectedRow();
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện select tại dòng có checkbox selected
     *CreatedBy dtnga (08/12/2020) 
     **/
    onClickCheckBox() {
        var checkbox = this;
        if ($(this).is(":checked")) {
            $(this).prop("checked", false);
            var trow = $(checkbox).closest(`tr`);
            $(trow).removeClass("selected");
            return;
        }
        var trow = $(checkbox).closest(`tr`);
        $(trow).addClass("selected");
    }

    /**
  * Sự kiện khi click số trang
  * @param {Element} button Button số trang
  * CreatedBy dtnga (26/12/2020)
  */
    onClickPagingNumber(button) {
        try {
            var me = this;
            if (!button)
                button = $(`.content-body:visible .paging-numbber button.selected`);
            var index = convertInt($(button).text().trim());
            me.setPageNumberPosition(index);
            me.loadData(index);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện chuyển đến trang tiếp theo
     * CreatedBy dtnga (26/12/2020)
     */
    onClickNextPage() {
        try {
            var me = this;
            var index = convertInt($(`.content-body:visible .paging-number button.selected`).text().trim()) + 1;
            me.setPageNumberPosition(index);
            me.loadData(index);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * Thực hiện chuyển đến trang trước
     * CreatedBy dtnga (26/12/2020)
     */
    onClickPreviousPage() {
        try {
            var me = this;
            var index = convertInt($(`.content-body:visible .paging-number button.selected`).text().trim()) - 1;
            me.setPageNumberPosition(index);
            me.loadData(index);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
    * Thực hiện chuyển đến trang đầu tiên
    * CreatedBy dtnga (26/12/2020)
    */
    onClickFirstPage() {
        try {
            var me = this;
            me.setPageNumberPosition(1);
            me.loadData(1);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
    * Thực hiện chuyển đến trang cuối cùng
    * CreatedBy dtnga (26/12/2020)
    */
    onClickLastPage() {
        try {
            var me = this;
            var pagingBar = $(`.content-body:visible .paging`);
            var recordTotal = convertInt($(pagingBar).find(`#total`).text().trim());
            var pageSize = convertInt($(pagingBar).find(`.pageSize`).attr("value"));
            var maxIndex = Math.ceil(recordTotal / pageSize); // Số trang lớn nhất có thể lấy theo tổng số bản ghi
            me.setPageNumberPosition(maxIndex);
            me.loadData(maxIndex);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện đặt vị trí số trang được chọn
     * @param {number} indexPage button số thứ tự trang, nếu không truyền vào thì lấy trang đang chọn hiện tại
     * CreatedBy dtnga (26/12/2020)
     */
    setPageNumberPosition(indexPage) {
        try {
            var pagingBar = $(`.content-body:visible .paging`);
            if (!indexPage) indexPage = $(pagingBar).find(`.paging-number button.selected`).text();
            // set lại giá trị các page number
            var pageNumberbuttons = $(pagingBar).find(`.paging-number button`);
            // tìm vị trang bắt đầu và kết thúc
            var range = $(pageNumberbuttons).length - 1;
            var endIndex = Math.ceil((indexPage * 2 + range) / 2); //Số trang cuối hiển thị trên giao diện
            var startIndex = endIndex - range;

            var recordTotal = convertInt($(pagingBar).find(`#total`).text().trim());
            var pageSize = convertInt($(pagingBar).find(`.pageSize`).attr("value"));
            var maxIndex = Math.ceil(recordTotal / pageSize); // Số trang lớn nhất có thể lấy theo tổng số bản ghi
            if (startIndex < 1) {
                startIndex = 1;
                endIndex = range + 1;
            }
            if (endIndex > maxIndex) {
                endIndex = maxIndex;
                startIndex = ((endIndex - range) < 1) ? 1 : endIndex - range;
            }
            // Xóa hết style của các button tại paging
            $(pageNumberbuttons).removeClass("selected");
            $(pagingBar).find(`button`).prop("disabled", false);
            var i = 0;
            $.each(pageNumberbuttons, function (index, button) {
                var nextIndex = startIndex + i++;
                $(button).text(nextIndex);
                if (nextIndex == indexPage) { // trang được chọn
                    $(button).addClass("selected");
                }
                else if (nextIndex > endIndex)
                    $(button).prop("disabled", true);
            });
            // disable các button chuyển trang nếu gặp trang đầu và cuối
            if (indexPage == 1) {
                $(pagingBar).find(`#previous`).prop("disabled", true);
                $(pagingBar).find(`#jumpToFirst`).prop("disabled", true);
                if (endIndex <= 1) {
                    $(pagingBar).find(`#next`).prop("disabled", true);
                    $(pagingBar).find(`#jumpToLast`).prop("disabled", true);
                }
            }
            else if (indexPage == maxIndex) {
                $(pagingBar).find(`#next`).prop("disabled", true);
                $(pagingBar).find(`#jumpToLast`).prop("disabled", true);
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    /**
  * Hiển thị Toast messeger thông báo
  * @param {string} mes Câu thông báo
  * @param {string} state Trạng thái thông báo (success/fail)
  */
    showToastMesseger(mes, state) {
        try {
            var me = this;
            if (mes && state) {
                var toastMes = $(`.m-toast-messeger`);
                $(toastMes).find(`.messeger`).text(mes);
                var iconMes = $(toastMes).find(`.content-icon`);
                var iconExit = $(toastMes).find(`.btn-exit-messeger`);
                if (state.toLowerCase() == "success") {
                    // Hiển thị thông báo thành công
                    $(iconMes).removeClass("fail");
                    $(iconExit).removeClass("fail");
                    $(iconMes).addClass("success");
                    $(iconExit).addClass("success");
                }
                if (state.toLowerCase() == "fail") {
                    // Hiển thị thông báo thất bại
                    $(iconMes).removeClass("success");
                    $(iconExit).removeClass("success");
                    $(iconMes).addClass("fail");
                    $(iconExit).addClass("fail");
                }
                $(toastMes).removeClass("displayNone");
                me.initEventToastMesseger(toastMes);
                //Set timeout, popup tự đóng sau 3s
                setTimeout(function () {
                    $(`.m-toast-messeger`).addClass("displayNone");
                }, 2000);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Sự kiện trên Toast thông báo
     * CreatedBy dtnga (23/12/2020)
     * @param {Element} toastMes ToastMessger
     */
    initEventToastMesseger(toastMes) {
        var toastMessger = $(toastMes);
        $(toastMessger).find(`.btn-exit-messeger`).on("click", function () {
            $(toastMessger).addClass("displayNone");
        });
    }

    /**
     * Hiển thị thông báo
     * @param {any} mes
     */
    showNotificationPopup(mes) {
        try {
            var me = this;
            if (mes) {
                var popup = $(`.popup-notification`);
                $(popup).find(`.popup-body`).text(mes);
                $(popup).removeClass("displayNone");
                // Sự kiện trên popup
                $(popup).find(`.btn-exit`).on("click", function () {
                    $(popup).addClass("displayNone");
                });
                $(popup).find(`#btn-close`).on("click", function () {
                    $(popup).addClass("displayNone");
                });
                $(`body`).on("keydown", function (e) {
                    if (e.which == 27)
                        $(popup).addClass("displayNone");
                });
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    /**
     * Thực hiện hiển thị dialog và khởi tạo các sự kiện liên quan
     * CreatedBy dtnga (26/11/2020)
     * @param {Element} dialog dialog cần hiển thị
     */
    showDialog(dialog) {
        var me = this;
        if (!dialog) dialog = $(`.content-body:visible .m-dialog`);
        me.clear(dialog);
        if (me.formMode == "edit") {
            $(dialog).find(`.header-text.add-header`).addClass("displayNone");
            $(dialog).find(`.header-text.edit-header`).removeClass("displayNone");
            $(dialog).find(`input[type="password"]`).prop("disabled", true);
        }
        else if (me.formMode == "add") {
            $(dialog).find(`.header-text.add-header`).removeClass("displayNone");
            $(dialog).find(`.header-text.edit-header`).addClass("displayNone");
        }
        $(dialog).removeClass("displayNone");
        $(dialog).find(`input, textarea`)[0].focus();
    }

    /**
     * Thực hiện gọi Api qua Ajax
     * @param {any} data
     * CreatedBy dtnga (24/12/2020)
     */
    CallAjax(data) {
        try {
            var response = [];
            var me = this;
            me.route = me.getRoute();
            if (data) {
                $.ajax({
                    url: me.host + me.route,
                    method: me.getMethod(),
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType: "json"
                })
                    .done(function (res) {
                        response = res;
                        $(`.m-dialog:visible`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + "thành công", "success");

                    })
                    .fail(function (res) {
                        console.log(res);
                        $(`.m-dialog:visible`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + "không thành công", "fail");
                    })
            }
            else {
                $.ajax({
                    url: me.host + me.route,
                    method: me.getMethod()
                })
                    .done(function (res) {
                        response = res;
                        $(`.m-dialog:visible`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + " thành công", "success");

                    })
                    .fail(function (res) {
                        console.log(res);
                        $(`.m-dialog:visible`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + " không thành công", "fail");
                    })
            }
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     *  Thực hiện kiểm tra dữ liệu trong form
     * @param {Element} targetForm form cần kiểm tra
     * CreatedBy dtnga (24/12/2020)
     */
    ValidateForm(targetForm) {
        try {
            var form = $(targetForm);
            var invalidInputs = $(form).find(`.m-input[validate="false"], .m-box[validate="false"]`);
            if (invalidInputs && invalidInputs.length > 0) {
                $.each(invalidInputs, function (index, input) {
                    $(input).trigger('blur');
                    if ($(input).hasClass("m-box")) {
                        var parentBox = $(input).closest(".input-box");
                        $(parentBox).find(`.error-empty`).removeClass("displayNone");
                        $(input).addClass("m-input-warning");
                    }


                });
                invalidInputs[0].focus();
                return false;
            }
            else
                return true;
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     *  Lấy dữ liệu từ Form
     * @param {Element} targetForm form cần lấy dữ liệu
     *  CreatedBy dtnga (24/12/2020)
     */
    GetDataForm(targetForm) {
        try {
            var me = this;
            var form = $(targetForm);
            var obj = new Object();
            // Lấy Id bản ghi
            var formFieldName = $(form).attr("fieldName");
            var formKeyId = $(form).data("keyId");
            if (formKeyId)
                obj[formFieldName] = formKeyId;
            var inputs = $(form).find(`input, textarea, .m-box`);
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr('fieldName');
                // Nếu có fieldName mới lấy data
                if (fieldName) {
                    if ($(input).hasClass("m-box")) {
                        var value = $(input).data("keyId");
                    }
                    else
                        var value = $(input).val();
                    // gán dữ liệu vào thuộc tính của obj (json) tương ứng với fieldName
                    if (input.type == "radio") {
                        if (input.checked)
                            obj[fieldName] = value;
                    }
                    else {
                        obj[fieldName] = value;
                    }
                }
            });
            obj["CreatedBy"] = $(targetForm).closest(`body`).find(`.header .username`).text();
            return obj;
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện đổ dữ liệu vào form
     * @param {any} data dữ liệu cần đổ
     * @param {any} targetForm form cần đổ dữ liệu
     * CreatedBy dtnga (24/12/2020)
     */
    BindDatatoForm(data, targetForm) {
        try {
            var me = this;
            var obj = data;
            var form = $(targetForm);
            var inputs = $(form).find(`input, textarea, .m-box`);
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr('fieldName');
                var typeFormat = $(input).attr("typeFormat");
                // Nếu có fieldName mới lấy data
                if (fieldName) {
                    var value = obj[fieldName];
                    if (!value)
                        value = "";
                    if ($(input).hasClass("m-box")) {
                        $(input).data("keyId", value);
                        // Select item có id như trên
                        me.SelectItem(input, value);
                    }
                    else if (input.type == "radio") {
                        if ($(input).attr("radioValue") == value)
                            $(input).prop("checked", true);
                    }
                    else if (input.type == "date") {

                    }
                    else {
                        if (typeof typeFormat !== typeof undefined && typeFormat !== false) {
                            switch (typeFormat) {
                                case "money":
                                    value = formatMoney(value);
                                    break;
                                default:
                            }
                        }
                        $(input).val(value);
                        $(input).attr("value", value);
                    }
                    var validateAttr = $(input).attr("validate");
                    if (value && typeof validateAttr !== undefined && validateAttr == "false") {
                        $(input).attr("validate", true);
                    }
                }

            });
        }
        catch (e) {
            console.log(e);
        }
    }


    /**
    * Thực hiện kiểm tra có hàng dữ liệu nào được chọn hay không, không => disable button Xóa
    * CreatedBy dtnga (24/12/2020)
    * */
    checkSelectedRow() {
        try {
            var currentTable = $(`.content-body:visible table`);
            var selectedRow = $(currentTable).find("tbody tr.selected");
            if (selectedRow.length == 0)
                $(`.content-body:visible`).find(`#btnDelete`).prop("disabled", true);
            else
                $(`.content-body:visible`).find(`#btnDelete`).prop("disabled", false);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
    * Hàm base thực hiện load dữ liệu lên table
    * @param {Element} table Thành phần bảng cần đổ dữ liệu
    * @param {number} pageIndex Số thứ tự trang
    *  Created By dtnga (21/11/2020)
    */
    loadData(pageIndex, targetTable) {
        try {
            var me = this;
            var table = (targetTable) ? $(targetTable) : $(`.content-body:visible`).find(`table`);
            $(table).find(`tbody tr`).remove();
            var currentContent = $(table).closest(`.content-body`);
            var ths = $(table).find('tr th');
            if (!pageIndex)
                // lấy pageIndex hiện tại
                pageIndex = $(currentContent).find(`.paging-number button.selected`).text();
            var pageSize = convertInt($(currentContent).find(`.pageSize`).attr("value"));
            var data = [];
            var total = 0;
            // Lấy data từ Api

            // Lấy tất cả dữ liệu tìm kiếm, bộ lọc
            var filterString = "";
            var SearchValue = $(currentContent).find(`.content-filter input[type="search"]`).val();
            filterString = (!SearchValue) ? (filterString + "&KeySearch=") : (filterString + "&KeySearch=" + SearchValue);

            var filterboxs = $(currentContent).find(`.content-filter .m-box`);
            filterboxs.push($(`.header .m-box`));

            $.each(filterboxs, function (index, item) {
                var filterKey = $(item).attr("fieldName");
                var filterValue = (!$(item).data("keyId")) ? null : $(item).data("keyId");
                if (filterKey && filterValue)
                    filterString = filterString + "&" + filterKey + "=" + filterValue;
                else
                    filterString = filterString + "&" + filterKey + "=";
            });

            $(`.m-loading`).removeClass("displayNone");
            $(`.nodata-mark`).addClass("displayNone");
            me.route = me.getRoute();
            me.objectName = me.getObjectName();
            // Lấy dữ liệu thỏa mãn bộ lọc
            $.ajax({
                url: me.host + me.route + "?page=" + pageIndex + "&size=" + pageSize + filterString,
                method: "GET"
            })
                .done(function (res) {
                    $(`.m-loading`).addClass("displayNone");
                    total = res.Total;
                    if (total < 1) {
                        $(`.nodata-mark`).removeClass("displayNone");
                        return;
                    }
                    data = res.Data;
                    $.each(data, function (index, obj) {
                        var tr = $(`<tr></tr>`);
                        // bind dữ liệu vào tr
                        $.each(ths, function (index, th) {
                            var td = $(`<td></td>`);
                            // lấy fielname th
                            var fieldName = $(th).attr('fieldName');
                            var type = $(th).attr("type");
                            if (type == "Checkbox") {
                                var checkbox = $(`<div><label class="m-checkbox">
                                                <span class="checkmark"></span>
                                      </label></div>`);
                                td.append(checkbox);
                            }
                            else {
                                //lấy giá trị của thuộc tính tương ứng với fieldname trong obj
                                var value = obj[fieldName];
                                if (value) {
                                    // định dạng lại
                                    var formatType = $(th).attr('formatType');
                                    switch (formatType) {
                                        case "money":
                                            value = formatMoney(value);
                                            td.addClass("text-align-right");
                                            break;
                                        case "dd/mm/yyyy":
                                            value = formatDate(value, "dd/mm/yyyy");
                                            td.addClass("text-align-center");
                                            break;
                                        case "hh:mm dd/mm/yyyy":
                                            value = formatDate(value, "hh:mm dd/mm/yyyy");
                                            td.addClass("text-align-center");
                                            break;
                                        case "number":
                                            td.addClass("text-align-center");
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                else {
                                    value = "...";
                                    var formatType = $(th).attr('formatType');
                                    switch (formatType) {
                                        case "money":
                                            td.addClass("text-align-right");
                                            break;
                                        case "dd/mm/yyyy":
                                            td.addClass("text-align-center");
                                            break;
                                        case "hh:mm dd/mm/yyyy":
                                            td.addClass("text-align-center");
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                var span = `<span>` + value + `</span>`;
                                var div = `<div>` + span + `</div>`;
                                // gán vào td -> tr
                                td.append(div);
                            }
                            tr.append(td);
                        })
                        $(table).find(`tbody`).append(tr);
                        //lưu id vào data
                        var keyIdName = me.objectName + 'Id';
                        tr.data('keyId', obj[keyIdName]);
                    })
                    me.checkSelectedRow(); // nếu không có row nào được chọn -> disable button Xóa
                    // Cập nhật paging
                    // Lấy tổng số bản ghi
                    var pagingText = $(currentContent).find(`.paging-left-text`);
                    var totalSpan = $(pagingText).find(`#total`);
                    $(totalSpan).text(total);
                    var range = $(pagingText).find(`#range`);
                    if (total < 2) {
                        $(range).text(total);
                    }
                    else {
                        var startRecordIndex = (pageIndex - 1) * pageSize + 1;
                        var endRecordIndex = startRecordIndex + pageSize;
                        if (endRecordIndex > total) endRecordIndex = total;
                        $(range).text(startRecordIndex + "-" + endRecordIndex);
                    }
                    me.setPageNumberPosition(pageIndex);

                })
                .fail(function (res) {
                    console.warn("Lỗi load dữ liệu");
                    console.log(res);
                })

        }
        catch (e) {
            console.log(e);
        }
    }

}

