$(document).ready(function () {
    var login = new Login();
})

class Login {
    constructor() {
        var me = this;
        me.initEventLogin();
    }

    /** Khởi tạo các sự kiện trên trang login
     * CreatedBy dtnga (09/12/2020)
     * */
    initEventLogin() {
        var me = this;
        $(`i[objname="jBntShowPass"]`).on("click", me.onClick_showPassIcon);
        $(`#btn-login`).on("click", me.onClick_btnLogin.bind(me));

    }

    /** Thực hiện ẩn/ hiện password
     * CreatedBy dtnga(08/12/2020)
     * */
    onClick_showPassIcon() {
        var btnShowPass = this;
        if ( $(btnShowPass).hasClass("active")) {
            $(btnShowPass).removeClass("active");
            var parent = $(btnShowPass).closest(`.wrap-input`);
            var inputPass = $(parent).find(`input[objname="jPassword"]`);
            $(inputPass).attr("type", "password");
        }
        else {
            $(btnShowPass).addClass("active");
            var parent = $(btnShowPass).closest(`.wrap-input`);
            var inputPass = $(parent).find(`input[objname="jPassword"]`);
            $(inputPass).attr("type", "text");
        }
    }

    /** Kiểm tra và lấy dữ liệu đăng nhập
     * CreatedBy dtnga (09/12/2020)
     * */
    onClick_btnLogin() {
        try {
            var me = this;
            // Lấy thông tin đăng nhập
            var userName = $(`input[name="username"]`).val();
            var password = $(`input[name="pass"]`).val();
            // kiểm tra trống
            if (!userName)
                $(`span[res-key="FormLogin_UserNotEmpty"]`).removeClass("displayNone");
            if (!password)
                $(`span[res-key="FormLogin_PasswordNotEmpty"]`).removeClass("displayNone");

        }
        catch (e) {
            console.log(e);
        }

    }
}