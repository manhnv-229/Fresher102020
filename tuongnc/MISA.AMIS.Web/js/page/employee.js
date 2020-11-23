$(document).ready(function () {
    new Employee();
})

class Employee extends BaseJS {
    constructor() {
        super();
    }

    setData() {
        this.apiRouter = "/api/employees";
        this.page = 'Employee';
    }

    setActiveNavBar() {
        $('.navbar-content').find("#employeePage").addClass("active");
    }
}
