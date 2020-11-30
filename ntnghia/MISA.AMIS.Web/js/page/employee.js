$(document).ready(function () {
    new EmployeeJS();
});

/**
 * Class quản lí các sự kiện cho trang Employee
 * CreatedBy: NTNghia (12/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }

    setApiRouter() {
        this.apiRouter = "/api/employees";
    }
}




