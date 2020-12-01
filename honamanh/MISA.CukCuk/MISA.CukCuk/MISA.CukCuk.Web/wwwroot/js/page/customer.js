
$(document).ready(function () {
    var customerJs = new CustomerJs();

    //dialog chi tiết khách hàng
    dialogDetail = $(".m-dialog").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 800,
        resizable: true,
        modal: true,
        position: ({ my: "center", at: "center", of: window }),
    });

    //dialog cảnh báo khi thực hiện các hành động xóa dữ liệu
    dialogWarning = $(".show-pop-up-warning").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 400,
        resizable: true,
        modal: true,
        position: ({ my: "center", at: "center", of: window }),
    });

    //sự kiện để ẩn context menu
    $('.menu-show').click(function () {
        $('.menu-show').hide();
    });
    $(document).click(function () {
        $('.menu-show').hide();
    });

    // sự kiện click vào button x để tắt thông báo
    $(".btn-close-messenger").click(function () {
        $(".show-toast-messenger").css("visibility", "hidden");
    })

});

class CustomerJs extends Base {
    constructor() {
        super();
    }
    setApiRouter() {
        this.apiRouter = '/api/v1/customers';
    }
    initEvent() {
        super.initEvent(); //các sự kiện của cha vẫn được thực hiện, tránh bị ghi đè hoàn toàn

        //các sự kiện con được thực hiện ở đây

    }

}