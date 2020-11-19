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
    }
    /**
     *  Lấy url api
     *  CreatedBy: NTANH (18/11/2020)
     * */
    setApiRouter() {
        this.apiRouter = "api/employees";
    }
    
}
