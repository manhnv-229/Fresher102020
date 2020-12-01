$(document).ready(function () {
    var addOrder = new AddOrder();
})

class AddOrder extends Base {
    constructor() {
        try {
            super();
            this.autoCompleteProduct();
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
                source.push({ label: productName + " / " + productCode, value: productCode });
            })
            $(searchInput).autocomplete({
                source: source,
                autoFocus: true,
                focus: function (event, suggest) {
                    //$(searchInput).val(suggest.item.label);
                    return false;
                },
                select: function (event, suggest) {
                    var value = suggest.item.value;
                    $(searchInput).val(value);
                    //TODO Kiểm tra số lượng còn lại của sản phẩm
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

                    if (!product) {
                        // Đưa ra thông báo sản phẩm không tồn tại
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
                    else if (product["Amount"] <= 0) {
                        // Đưa ra thông báo sản phẩm không tồn tại
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
                    else {
                        // Nếu còn lại >0 tự động gen sản phẩm trong giỏ hàng
                        // Nếu sản phẩm đã có trong giỏ hàng => số lượng + 1 và tăng tổng tiền
                        var existProducts = $(`.product-list .product-detail`);
                        var addNew = 1;
                        if (existProducts) {
                            $.each(existProducts, function (index, item) {
                                var code = $(item).find(`.product-code`).text().trim();
                                if (code == value) {
                                    $(item).find(`.quantity`).val(function (i, oldval) {
                                        return ++oldval;
                                    })
                                    var oldCost = $(item).find(`.cost`).attr("value");
                                    var newCost = parseInt(oldCost, 10) * 2;
                                    $(item).find(`.cost`).text(formatMoney(newCost));
                                    $(item).find(`.cost`).attr("value", newCost);
                                    addNew = 0;
                                    // Cập nhật tổng giá trị giỏ hàng
                                    var oldTotal = parseInt($(`.total-money`).attr("value"), 10);
                                    var newTotal = oldTotal + newCost;
                                    $(`.total-money`).text(formatMoney(newTotal));
                                    $(`.total-money`).attr("value", newTotal);
                                }
                            })
                        }
                        // Nếu chưa tồn tại trong giỏ hàng => thêm mới + cập nhật tổng số lượng và tổng giá trị đơn hàng
                        if (addNew == 1) {

                            var productDetail = $(`<div class="product-detail">
                                            <div class="product-line">
                                                <button class="button-delete m-icon round-icon delete-icon" title="Xóa"></button>
                                                <div class="product-line-left">
                                                    <div class="product-code">`+ value + `</div>
                                                </div>
                                                <div class="product-line-right">
                                                    <div><input class="m-input price" type="text" typeFormat="money" value="`+ parseInt(product["Price"], 10) + `"/></div>
                                                    <div> x </div>
                                                    <div><input class="m-input quantity" type="number" min="0" value="1" /></div>
                                                </div>
                                            </div>
                                            <div class="cost-line">
                                                <div class="cost" value="`+ product["Price"] + `">` + formatMoney(parseInt(product["Price"], 10)) + `</div>
                                            </div>
                                        </div>`);
                            var productList = $(`.product-list`);
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
            });

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