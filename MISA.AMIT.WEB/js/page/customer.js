$(document).ready(function () {
    new CustomerJS();
    dialogDetail = $(".m-dialog").dialog({
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
 * class quan li cac su kien cho ComtomerJS
 * created by: dvquang(12/11/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        //this.loadData();
        super();

    }
    setApiRouter() {
        this.apiRouter = '/api/customers';
        
    }
}

