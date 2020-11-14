$(document).ready(function () {
    new Employee();
})

class Employee extends BaseJS {
    constructor() {
        super();
    }

    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }

    setActiveNavBar() {
        $('.navbar-content').find("#employeePage").addClass("active");
    }
}
