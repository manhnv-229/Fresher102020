$(document).ready(function () {
    new EmployeeJS();
    dialogDetail = $(".dialog-add-employee").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 650,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    });
})

/**
 * class quan li cac su kien cho EmployeJS
 * created by: dvquang(12/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {

        super();
    }

    /**
    * ghi de set url cho EmployeeJS
    * createdby: dvquang(13/11/2020)
    * */
    setApiRouter() {
        this.apiRouter = '/api/employees';
    }
}

