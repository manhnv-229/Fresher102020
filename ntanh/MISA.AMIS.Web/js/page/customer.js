$(document).ready(function () {
    new CustomerJS();
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