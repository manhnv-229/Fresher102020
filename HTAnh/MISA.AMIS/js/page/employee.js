$(document).ready(function () {
    new EmployeeJS();//khởi tạo
});

class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }
    setApiRouter() {
        this.apiRouter = "/api/employees";
    }
}


