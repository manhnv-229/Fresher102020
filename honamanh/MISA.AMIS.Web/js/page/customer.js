
$(document).ready(function () {
    var customerJs = new CustomerJs();
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

});

class CustomerJs extends Base {
    constructor() {
        super();
        // this.name = "HoNamAnh";
        //  this.loadData();
        // debugger;
    }
    /**
    * set url lấy dữ liệu
     * CreateBy: HNANH (12/11/2020)
    * */
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
}