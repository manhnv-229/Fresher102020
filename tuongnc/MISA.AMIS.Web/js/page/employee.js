$(document).ready(function () {
    new Employee();
})

class Employee extends BaseJS {
    constructor() {
        super();
    }

    setDataUrl() {
        this.apiRouter = "/api/employees";
    }

    setActiveNavBar() {
        $('.navbar-content').find("#employeePage").addClass("active");
    }
}
