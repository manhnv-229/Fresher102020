$(document).ready(function () {
    new EmployeeJS();

    dialogDetail = $(".m-dialog").dialog({
        autoOpen: false,
        fluid: true,
        minWidth: 700,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    });
})

/**
 * Class quản lý các sự kiện cho trang nhân viên:
 * Author: TVHa (14/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }

    setApiRouter() {
        this.apiRouter = 'api/employees';
    }
}