$(document).ready(function () {
    var employeeJs = new EmployeeJs();

})

class EmployeeJs extends Base {
    constructor() {
        super();
    }
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }
}