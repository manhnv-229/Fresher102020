$(document).ready(function () {
    var saler = new Saler();
})


class Saler extends Owner {
    constructor() {
        super();
        var me = this;
        me.userInfo = JSON.parse(sessionStorage.getItem("user"));
        $(`.content-body`).find(`#btn-create-saler`).on("click", function () { me.onClick_btnCreate() });
    }
}