$(document).ready(function () {
    var employeeJS = new EmployeeJS();
    //employeeJS.loadData();
})
/**
 * class quản lý các sự kiện của trang employee
 * createdby: nttung (10/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
        //this.initEvents();
        //this.hidePagingBar();
    }
    /**
     * Hàm ghi đè cho lớp cha để set url api
     * createdby nttung (10/12/2020)
     * */
    setApiRouter() {
        this.apiRoutor = "/api/employees";
    }
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }

}


