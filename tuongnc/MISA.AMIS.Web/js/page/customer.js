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

    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
}
