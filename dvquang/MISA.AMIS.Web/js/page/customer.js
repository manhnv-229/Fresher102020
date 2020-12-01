$(document).ready(function () {
    new CustomerJS();
    dialogDetail = $(".m-dialog").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 700,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    });
})

/**
 * Class quản lý các sự kiện cho trang Customer
 * CreatedBy: DVQuang (12/11/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    setApiRouter() {
        this.apiRouter = "/api/customers";
    }
}

