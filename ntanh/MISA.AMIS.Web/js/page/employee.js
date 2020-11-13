$(document).ready(function () {
    new EmployeeJS();
})
/**
 * Class quản lý các sự kiện cho trang Employee
 * CreatedBy: NTANH (12/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
        this.setDataUrl();
    }
    /**
     * Lấy url api
     * CreatedBy: NTANH (13/11/2020)
     * */
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }
    
}
