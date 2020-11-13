$(document).ready(function () {
    new CustomersJS();
});

class CustomersJS extends BaseJS {
    constructor() {
        super();
    }
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
}