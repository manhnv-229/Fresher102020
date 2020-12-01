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
    dialogConfirmDelete = $(".dialog-confirm-delete").dialog({
        autoOpen: true,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 400,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    });
})


/** 
 * Class quản lý các sự kiện cho trang Employee
 * CreatedBy: DVQuang (12/11/2020)
 * */
class EmployeeJS extends BaseJS{
    constructor() {
        //this.loadData();
        super();
    }


    setApiRouter() {
        this.apiRouter = "/api/employees";
    }
    

}
