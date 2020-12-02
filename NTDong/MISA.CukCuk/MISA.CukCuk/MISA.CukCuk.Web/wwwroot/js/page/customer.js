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
    dialogDelete = $(".d-dialog").dialog({
        autoOpen: false,
        fluid: true,
        // height: 400,
        //width: '700px',
        minWidth: 400,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    })
})

/**
 * Tạo lớp Customer quản lí các phương thức của lớp Customer 
 * createdBy : NTDong(12/11/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    setApiRouter() {
        this.apiRouter = "/api/v1/customers";
    }
}