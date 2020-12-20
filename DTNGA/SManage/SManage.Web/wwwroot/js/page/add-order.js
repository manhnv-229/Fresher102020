$(document).ready(function () {
    var addOrder = new AddOrder();
})

class AddOrder extends Base {
    constructor() {
        try {
            super();
            this.autoCompleteProduct();
            this.autoCompleteProvince();
            this.initEventOrderAddPage();
            var cbTrans = `#order-add #cb-transportor`;
            this.autoCompleteTransportor(cbTrans);
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Khởi tạo sự kiện cho các thành phần trên trang Order Add
     * CreatedBy dtnga (02/12/2020)
     * */
    initEventOrderAddPage() {
        try {
            var me = this;
            $(`#order-add input[type="search"][fieldName="ProductCode"]`).on("keyup", function (e) {
                if (e.which === 13)
                    $(`#btn-addToShoppingCard`).click();
            });
            $(`#order-add input[type="search"][fieldName="PhoneNumber"]`).on("keyup", function (e) {
                if (e.which == 13) {
                    me.checkCustomer(this);
                }
            })
            //TODO lỗi lặp check trường bắt buộc nhập trước
            $(`#order-add input[type="search"][fieldName="District"]`).focus(me.onFocus_inputField);


        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Custome
     * CreatedBy dtnga (12/12/2020)
     * @param {any} option
     */
    doSomethingWhenItemSelected(option) {
        try {
            var me = this;
            var cbTrans = $(option).closest(`.m-box`);
            me.updateTransportorInfo(cbTrans);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Cập nhật thông tin vận chuyển khi thay đổi giá trị của combobox Transportor
     * CreatedBy dtnga (10/12/2020)
     * @param {Element} comboBoxTrans comboBox đơn vị vận chuyển
     */
    updateTransportorInfo(comboBoxTrans) {
        try {
            var me = this;
            var transportorId = $(comboBoxTrans).data("keyId");
            var shopId= $(`.header .m-box`).data("keyId");
            var customerAreaCode = $(document).find(`input[type="search"][fieldName="Ward"]`).data("keyCode");
            // gọi api tính chi phí vận chuyển + thời gian giao hàng dự kiến
            var fee = formatMoney(15000);
            var expectedDeliveryDate = formatDate("12/12/2020", "dd/mm/yyyy");
            $.ajax({
                url: me.Host + me.Route + "?transportorId=" + transportorId + "?shopId=" + shopId + "?customerAreaCode=" + customerAreaCode,
                method: "GET"
            })
                .done(function (res) {
                    var data = res.Data;
                    fee = formatMoney(data.Fee);
                    expectedDeliveryDate = formatDate(data.ExpectedDeliveryDate, "dd/mm/yyyy");
                })
                .fail(function (res) {
                    console.log(res);
                })
            // bind dữ liệu và hiển thị thông tin vận chuyển
            var contentBox = $(comboBoxTrans).closest(`.content-box`);
            var feeField = $(contentBox).find(`input[fieldName="Fee"]`);
            $(feeField).val(fee);
            $(feeField).removeClass("m-input-warning");
            var extraInfo = $(contentBox).find(`.extra-info`);
            $(extraInfo).find(`span`).text(expectedDeliveryDate);
            $(extraInfo).removeClass("displayNone");
        } catch (e) {
            console.log(e);
        }

    }

    /** Thực hiện bind dữ liệu gợi ý cho trường Tìm kiếm
     * OverrideBy dtnga (30/11/2020)
     * */
    autoCompleteProduct() {
        try {
            var me = this;
            // Thiết lập dữ liệu gợi ý cho trường tìm kiếm ( ProductName + ProductCode )
            var searchInput = $(`#order-add input[type="search"][fieldName="ProductCode"]`);
            //Lấy danh sách sản phẩm hiện có
            var productList = listProduct;
            // Tạo source autocomplete
            var source = [];
            $.each(productList, function (index, product) {
                var productName = product["ProductName"];
                var productCode = product["ProductCode"];
                var productType = product["Type"];
                var productColor = product["Color"];
                var typeAndColor = '';
                if (!productType && productColor)
                    typeAndColor = productColor;
                else if (productType && !productColor)
                    typeAndColor = productType;
                else if (productType && productColor)
                    typeAndColor = productType + " - " + productColor;

                var productPrice = product["Price"];
                if (!productPrice)
                    productPrice = '';
                var currentPrice = product["CurrentPrice"];
                if (!currentPrice)
                    currentPrice = '';

                source.push({
                    label: productName,
                    value: productCode,
                    code: productCode,
                    type: typeAndColor,
                    price: productPrice,
                    currentPrice: currentPrice
                });
            })

            // set autocomplete
            $(searchInput).autocomplete({
                source: source,
                autoFocus: true,
                focus: function (event, suggest) {
                    $(searchInput).val(suggest.item.label);
                    return false;
                },
                select: function (event, suggest) {
                    var value = suggest.item.value;
                    $(searchInput).val(value);
                    var product = listProduct.find(p => p["ProductCode"] == value);
                    // Hoặc lấy qua API bằng ProductCode
                    //$.ajax({
                    //    url: "" + "/" + productCode,
                    //    method: "GET",
                    //}).done(function (data) {
                    //  var product= data;
                    //}).fail(function (res) {
                    //    console.log(res);
                    //});

                    // Đưa ra thông báo sản phẩm không tồn tại
                    if (!product) {
                        var popup = $(`.popup-notification`);
                        var popupBody = $(popup).find(`.popup-body`);
                        $(popupBody).children().remove();
                        var content = $(`<div class="popup-body-text">Sản phẩm <span> ` + productCode + ` </span> không tồn tại. Vui lòng kiểm tra và nhập lại</div>`);
                        popupBody.append(content);
                        popup.show();
                        me.initEventPopup(popup);
                        return;
                    }
                    // Đưa ra thông báo sản phẩm hết hàng
                    else if (product["Amount"] <= 0) {
                        var popup = $(`.popup-notification`);
                        var popupBody = $(popup).find(`.popup-body`);
                        $(popupBody).children().remove();
                        var content = $(`<div class="popup-body-text">Sản phẩm mã <span> ` + value + ` </span> hiện đã hết. Vui lòng kiểm tra và nhập lại</div>`);
                        popupBody.append(content);
                        popup.show();
                        me.initEventPopup(popup);
                        return;
                    }
                    // Nếu còn lại >0 tự động gen sản phẩm trong giỏ hàng
                    // Nếu sản phẩm đã có trong giỏ hàng => số lượng + 1 và tăng tổng tiền
                    else {
                        var existProducts = $(`.product-list .product-detail`);
                        var addNew = 1;
                        if (existProducts) {
                            $.each(existProducts, function (index, item) {
                                var code = $(item).find(`.product-code`).text().trim();
                                if (code == value) {
                                    addNew = 0;
                                    // Cập nhật số lượng sản phẩm
                                    var quantity = $(item).find(`.quantity`);
                                    var oldQuantity = parseInt($(quantity).val(), 10);
                                    var newQuantity = ++oldQuantity;
                                    $(quantity).val(newQuantity);

                                    // Cập nhật tổng số tiền sản phẩm
                                    var productPrice = convertInt(product["CurrentPrice"]);
                                    var oldCost = convertInt($(item).find(`.cost`).attr("value"));
                                    var newCost = productPrice + oldCost;
                                    $(item).find(`.cost`).text(formatMoney(newCost));
                                    $(item).find(`.cost`).attr("value", newCost);

                                    // Cập nhật tổng giá trị giỏ hàng
                                    var oldTotal = convertInt($(`.total-money`).attr("value"));
                                    var newTotal = oldTotal + productPrice;
                                    $(`.total-money`).text(formatMoney(newTotal));
                                    $(`.total-money`).attr("value", newTotal);
                                }
                            })
                        }
                        // Nếu chưa tồn tại trong giỏ hàng => thêm mới + cập nhật tổng số lượng và tổng giá trị đơn hàng
                        if (addNew == 1) {
                            // Ẩn Empty mark 
                            var emptyMark = $(`.product-list .empty-mark`);
                            $(emptyMark).addClass(`displayNone`);
                            me.addProductToCart(product);

                        }
                    }
                    return false;
                }
            })
                .data("ui-autocomplete")._renderItem = function (ul, item) {
                    //TODO custome autocomplete item
                    return $("<li>")
                        .data("ui-autocomplete-item", item)
                        .append("<div>" +
                            item.label + "<br>" +
                            "Mã sản phẩm" + item.code + "<br>" +
                            "Phân loại: " + item.type + "<br>" +
                            "Giá bán lẻ: " + item.price + "<br>" +
                            "Giá khuyến mại: " + item.currentPrice +
                            "</div>")
                        .appendTo(ul);
                };
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện kiểm tra khách hàng đã có thông tin trên hệ thống hay chưa
     * CreatedBy dtnga (02/12/2020)
     * @param {string} tel Số điện thoại
     */
    checkCustomer(tel) {
        try {
            var me = this;
            // Lấy thông tin số điện thoại
            var phoneNumber = $(tel).val();
            //TODO Lấy thông tin khách hàng bằng số điện thoại qua API
            var customer = listCustomer.find(c => phoneNumber == c["PhoneNumber"]);

            // Nếu có thông tin => tự động bind dữ liệu vào box-info
            if (customer) {
                $(`.empty-result`).addClass("displayNone");
                me.autoBindCustomer(customer);
                $(`.box-info`).removeClass("displayNone");
                $(tel).val('');
            }
            // Nếu chưa có thông tin => Hiển thị thông báo Chưa có dữ liệu
            else {
                $(tel).focus();
                $(`.empty-result`).removeClass("displayNone");
                $(`.box-info input`).val("");
                $(`.box-info`).removeClass("displayNone");
                $(`.box-info input[type=text]:first`).focus();
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    /**
     * Thực hiện gen và thêm sản phẩm mới vào giỏ hàng
     * CreatedBy dtnga (01/12/2020)
     * @param {object} product
     */
    addProductToCart(product) {
        if (!product) {
            alert("Không có thông tin sản phẩm. Vui lòng kiểm tra lại");
            return;
        }
        var me = this;
        var productList = $(`#order-add .product-list`);
        var index = $(productList).find(`.product-detail`).length + 1;
        var productCode = product["ProductCode"];
        var defaultPrice = convertInt(product["Price"]);
        var productPrice = convertInt(product["CurrentPrice"]);
        var curentAmount = convertInt(product["Amount"]);
        var productDetail = $(`<div class="product-detail">
                                            <div class="product-line">
                                                <div class="product-line-left">
                                                    <button class="button-delete m-icon round-icon delete-icon" title="Xóa"></button>
                                                    <div class="product-code">`+ productCode + `</div>
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
        // Cập nhật tổng số lượng sản phẩm
        var totalQuantity = $(`.shopping-cart .total-quantity span`);
        var oldQuantity = convertInt($(totalQuantity).text());
        $(totalQuantity).text(++oldQuantity);
        // Cập nhật tổng giá trị giỏ hàng
        var totalMoney = $(`.shopping-cart .total-money`);
        var oldTotal = convertInt(totalMoney.attr("value"));
        var newTotal = oldTotal + productPrice;
        totalMoney.text(formatMoney(newTotal));
        totalMoney.attr("value", newTotal);
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

}