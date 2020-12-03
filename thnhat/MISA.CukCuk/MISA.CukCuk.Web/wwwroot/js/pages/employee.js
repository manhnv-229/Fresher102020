$(document).ready(function () {
    new CustomerJs();

})



class CustomerJs extends BaseJs {
    constructor() {
        super();
    }

    setUrl() {
        this.getUrl = '/api/v1/Customers';
    }
}

