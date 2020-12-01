$(document).ready(function () {
    var addOrder = new AddOrder();
})

class AddOrder extends Base {
    constructor() {
        try {
            super();
            this.autoCompleteProduct();
            
            //Thông tin người nhận
            this.autoCompleteCustomer();
        }
        catch (e) {
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
            var searchInput = $(`input[fieldName="ProductCode"]`);
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

                source.push({
                    label: productName ,
                    value: productCode,
                    code: productCode,
                    type: typeAndColor,
                    price: productPrice
                });
            })
            // set autocomplete
            $(searchInput).autocomplete({
                source: source,
                autoFocus: true,
                focus: function (event, suggest) {
                    //$(searchInput).val(suggest.item.label);
                    return false;
                },
                select: function (event, suggest) {
                    var value = suggest.item.value;
                    $(searchInput).val('');
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
                        var content = $(`<div class="popup-body-text">Sản phẩm mã <span> ` + productCode + ` </span> không tồn tại. Vui lòng kiểm tra và nhập lại</div>`);
                        popupBody.append(content);
                        popup.show();
                        $(`.popup-notification #btn-exit-popup`).on("click", function () {
                            popup.hide();
                        });
                        $(`.popup-notification #btn-close`).on("click", function () {
                            popup.hide();
                        });
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
                        $(`.popup-notification #btn-exit-popup`).on("click", function () {
                            popup.hide();
                        });
                        $(`.popup-notification #btn-close`).on("click", function () {
                            popup.hide();
                        });
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
                                    // Cập nhật số lượng sản phẩm
                                    var quantity = $(item).find(`.quantity`);
                                    var oldQuantity= parseInt($(quantity).val(), 10);
                                    var newQuantity = ++oldQuantity;
                                    $(quantity).val(newQuantity);
                                    // Cập nhật tổng số tiền sản phẩm
                                    var productPrice = parseInt(product["Price"], 10);
                                    var oldCost = parseInt($(item).find(`.cost`).attr("value"), 10);
                                    var newCost = productPrice + oldCost;
                                    $(item).find(`.cost`).text(formatMoney(newCost));
                                    $(item).find(`.cost`).attr("value", newCost);
                                    addNew = 0;
                                    // Cập nhật tổng giá trị giỏ hàng
                                    var oldTotal = parseInt($(`.total-money`).attr("value"), 10);
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

                            var productDetail = $(`<div class="product-detail">
                                            <div class="product-line">
                                                <div class="product-line-left">
                                                    <button class="button-delete m-icon round-icon delete-icon" title="Xóa"></button>
                                                    <div class="product-code">`+ value + `</div>
                                                </div>
                                                <div class="product-line-right">
                                                    <div><input class="m-input price" type="text" typeFormat="money" fieldName="CurrentPrice" value="`+ parseInt(product["Price"], 10) + `"/></div>
                                                    <div> x </div>
                                                    <div><input class="m-input quantity" type="number" min="0" value="1" /></div>
                                                </div>
                                            </div>
                                            <div class="cost-line">
                                                <div class="cost" value="`+ product["Price"] + `">` + formatMoney(parseInt(product["Price"], 10)) + `</div>
                                            </div>
                                        </div>`);
                            var productList = $(`.product-list`);
                            me.autoFormatMoney();
                            productList.append(productDetail);
                            // Cập nhật tổng số lượng sản phẩm
                            var totalQuantity = $(`.total-quantity span`);
                            var oldQuantity = parseInt($(totalQuantity).text(), 10);
                            $(totalQuantity).text(++oldQuantity);
                            // Cập nhật tổng giá trị giỏ hàng
                            var oldTotal = parseInt($(`.total-money`).attr("value"), 10);
                            var newTotal = oldTotal + parseInt(product["Price"], 10);
                            $(`.total-money`).text(formatMoney(newTotal));
                            $(`.total-money`).attr("value", newTotal);
                            // format khi nhập liệu số tiền
                            me.autoFormatMoney();
                            // Sự kiện khi nhấn nút xóa tại mỗi dòng sản phẩm
                            $(`.product-line button`).on("click", me.onClick_deleteProduct);
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
                    "Phân loại: " + item.type + "<br>"+
                    "Giá bán: " + item.price + 
                        "</div>")
                    .appendTo(ul);
            };
        }
        catch (e) {
            console.log(e);
        }
    }


    /**TODO Thực hiện check thông tin khách hàng và tự động điền
     * CreatedBy dtnga (30/11/2020)
     * */
    autoCompleteCustomer() {
        // Sau khi nhập số điện thoại => Check khách đã tồn tại chưa

        // Nếu đã tồn tại => Tự động binding dữ liệu ( địa chỉ khách đặt gần đây nhất)

        // Nếu chưa có thì nhập chay
    }

}