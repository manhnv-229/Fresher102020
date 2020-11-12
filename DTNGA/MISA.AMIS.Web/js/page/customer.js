$(document).ready(function(){
    var customerjs = new CustomerJS();
})

class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    getUrl() {
        return "http://api.manhnv.net/api/customers";
    }
}