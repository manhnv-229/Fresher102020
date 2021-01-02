$(document).ready(function () {
    var login = new Login();
})

class Login {
    constructor() {
        var me = this;
        me.host = "https://localhost:44394";
        me.route = "/api/v1/Accounts";
        me.initEventLogin();
    }

    /** Khởi tạo các sự kiện trên trang login
     * CreatedBy dtnga (09/12/2020)
     * */
    initEventLogin() {
        var me = this;
        $(`input`).first().focus();
        $(`input`).focus(function () {
            this.select();
        });
        $(`input`).on("keydown", function (e) {
            if (e.which == 13)
                $(`#btn-login`).trigger("click");
        })
        $(`input`).blur(function () {
            if ($(this).val())
                $(this).closest(`.wrap-input`).find(`span.error-info`).addClass("displayNone");
            else
                $(this).closest(`.wrap-input`).find(`span.error-info`).removeClass("displayNone");
        });
        $(`i[objname="jBntShowPass"]`).on("click", me.onClick_showPassIcon);
        $(`#btn-login`).on("click", me.onClick_btnLogin.bind(me));

    }

    /** Thực hiện ẩn/ hiện password
     * CreatedBy dtnga(08/12/2020)
     * */
    onClick_showPassIcon() {
        var btnShowPass = this;
        if ($(btnShowPass).hasClass("active")) {
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
            $(`.text-login-fail`).addClass("displayNone");
            var me = this;
            // Lấy thông tin đăng nhập
            var userName = $(`input[name="username"]`).val();
            var password = $(`input[name="pass"]`).val();
            // kiểm tra trống
            if (!userName)
                $(`span[res-key="FormLogin_UserNotEmpty"]`).removeClass("displayNone");
            if (!password)
                $(`span[res-key="FormLogin_PasswordNotEmpty"]`).removeClass("displayNone");
            if (userName && password) {
                $.ajax({
                    url: me.host + me.route + "?username=" + userName + "&password=" + password,
                    method: "GET"
                })
                    .done(function (res) {
                        if (res) {
                            var data = res.Data;
                            sessionStorage.setItem("user", JSON.stringify(data));
                            if (data["RoleCode"] == "QL") {
                                location.replace("/view/owner.html");

                            }
                            else if (data["RoleCode"] == "NV") {
                                location.replace("/view/saler.html");
                            }
                        }
                        else {
                            $(`.text-login-fail`).removeClass("displayNone");
                        }
                    })
                    .fail(function (res) {
                        console.log(res);

                    })
            }
        }
        catch (e) {
            console.log(e);
        }

    }
}
