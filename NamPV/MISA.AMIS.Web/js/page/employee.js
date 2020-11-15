$(document).ready(function () {
    new EmployeeJS();
})

class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }
    setDataUrl() {
        this.getDataUrl = `http://api.manhnv.net/api/employees`
    }
}