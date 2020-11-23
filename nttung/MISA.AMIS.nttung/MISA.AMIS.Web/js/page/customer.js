$(document).ready(function () {
    new CustomerJS();
    //employeeJS.loadData();
})
/**
 * class quản lý các sự kiện của trang employee
 * createdby: nttung (10/11/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        super();
        
        //this.initEvents();
        //this.hidePagingBar();
    }
    /**
     * Hàm load dữ liệu vào bảng
     * createdby nttung (10/12/2020)
     * */
    setApiRouter() {
        this.apiRoutor = "/api/customers";
    }
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }

}