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
            var customerAreaCode = $(document).find(`.m-box[fieldName="Ward"]`).data("keyCode");
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