$(document).ready(function () {
    new CustomerJS();
})

class CustomerJS extends BaseJS {
    constructor() {
        super();
    }
    setApi() {
        this.api = `/api/v1/customers`
    }
}