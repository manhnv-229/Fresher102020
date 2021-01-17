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
        me.initEventSaler();
    }

    

    initEventSaler() {
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