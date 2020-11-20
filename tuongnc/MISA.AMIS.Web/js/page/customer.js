$(document).ready(function () {
    var customer = new Customer();
})

class Customer extends BaseJS {
    
    constructor() {
        super();
    }

    setActiveNavBar() {
        $('.navbar-content').find("#customerPage").addClass("active");
    }

    setData() {
        this.apiRouter = "/api/customers";
        this.page = 'Customer';
    }
}
