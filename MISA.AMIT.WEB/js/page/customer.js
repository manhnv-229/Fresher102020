$(document).ready(function () {
    new CustomerJS();
    dialogDetail = $(".m-dialog").dialog({
        autoOpen: false,
        fluid: true,
        resizale: true,
        modal: true,
        position: ({ my: "center", at: "center", of: "window" }),
        minWidth: 700,

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
    setDataUrl() {
        this.getDataUrl = 'http://api.manhnv.net/api/customers';
        
    }
}

