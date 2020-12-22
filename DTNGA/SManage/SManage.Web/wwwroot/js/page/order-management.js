$(document).ready(function () {
    
    var orderManagement = new OrderManagement();
})

class OrderManagement extends Base {
    constructor() {
        super();
        var me = this;
        this.loadAccount();
        this.loadShop();
        me.loadData();
        me.initEvent();
    }

    /** Thực hiện lấy thông tin người dùng sau khi đăng nhập
     * CreatedBy dtnga (26/11/2020)
     * */
    loadAccount() {
        //lấy thông tin người dùng từ API
        try {
            var me = this;
            me.Route = "/api/v1/Accounts";
            $.ajax({
                url: me.Host + me.Route + "/" + me.AccountId,
                method: "GET"
            })
                .done(function (res) {
                    var account = res.Data;
                    var user = account["User"];
                    var fullName = user["FullName"];
                    $(`.header .username`).text(fullName);
                    $(`.header .username`).data("keyId", user["UserId"]);
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
        catch (e) {
            console.log(e);
        }
        
    }

    /** Thực hiện load thông tin cửa hàng do user làm chủ
     * CreatedBy dtnga (27/11/2020)
     * */
    loadShop() {
        try {
            var me = this;
            //lấy danh sách cửa hàng theo UserId từ API
            me.Route = "/api/v1/Shops/user";
            debugger
            me.UserId = $(`.header .username`).data("keyId");
            $.ajax({
                url: me.Host + me.Route +"/"+ me.UserId,
                method: "GET"
            }).done(function (res) {
                var shops = res.Data;
                var comboBoxShop = $(`#cb-Shop`);
                me.createComboBox(shops, comboBoxShop);
            })
                .fail(function (res) {
                    console.log(res);
                })
        }
        catch (e) {
            console.log(e);
        }
    }
}