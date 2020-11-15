$(document).ready(function () {
    new CustomerJS();
    dialogDetail = $(".m-dialog").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 628,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    });
})
/**
 * Class Quản lý Customer
 * */
class CustomerJS extends BaseJS {
    constructor() {
        super();
        this.name = "sss";
    }
    /**
     *  Lấy địa chỉ api
     *  CreatedBy: NTANH (13/11/2020)
     * */
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
}