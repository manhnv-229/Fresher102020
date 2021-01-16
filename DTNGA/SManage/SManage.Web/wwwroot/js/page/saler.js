$(document).ready(function () {
    var saler = new Saler();
})


class Saler extends Owner {
    constructor() {
        super();
        var me = this;
        $(`.m-loading`).removeClass("displayNone");
        me.userInfo = JSON.parse(sessionStorage.getItem("user"));
        me.loadAccount();
        me.loadComboBoxCustome();
        me.initEvent();
    }

    /** Thực hiện load thông tin cửa hàng do user làm chủ
     * CreatedBy dtnga (27/11/2020)
     * */
    loadComboBoxCustome() {
        var me=this;
        // danh sách cửa hàng
        //lấy danh sách cửa hàng theo UserId từ API
        var userId = me.userInfo["UserId"];
        var route = "/api/v1/Users/" + userId + "/shops";
        $.ajax({
            url: me.host + route,
            method: "GET"
        }).done(function (res) {
            var shops = res.Data;
            var comboBoxShop = $(`#cb-Shop`);
            me.createComboBox(shops, comboBoxShop);
            var firstItem = $(comboBoxShop).find(".item")[0];
            $(firstItem).trigger("click");
        })
            .fail(function (res) {
                console.log(res);
            })
    }

    initEvent() {
        var me = this;
        // Logout
        $(`#btnLogout`).on("click", me.onclick_btnLogout.bind(me));
        // sự kiện khi blur các trường input
        $(`input`).blur(function () {
            me.onBlur_inputField(this);
        });
        // Select toàn bộ text khi focus field nhập liệu
        $(`input, textarea`).focus(function () {
            $(this).select();
        });
        // format khi nhập liệu số tiền
        me.autoFormatMoney();
        // Sự kiện tự động thêm sản phẩm vào giỏ khi click nút Thêm vào giỏ
        $(`#btn-addToShoppingCard`).on("click", me.onClick_addToShoppingCard.bind(me));
        // Sự kiện trên trang Add Order:
        $(`#order-add`).find(`.content-box[name="product"]`).find(`input[type="search"]`).on("search", function (e) {
            if ($(this).val())
                me.checkProduct(this);

        });
        $(`.content-body`).find(`input[type="search"][fieldName="PhoneNumber"]`).on("keyup", function (e) {
            if (e.which == 13 && $(this).val() && $(this).val().trim()) {
                me.checkCustomer(this);
            }
        });

    }
}