$(document).ready(function () {
    new EmployeeJS();
})

class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }
    setApi() {
        this.api = `/api/employees`
    }
}