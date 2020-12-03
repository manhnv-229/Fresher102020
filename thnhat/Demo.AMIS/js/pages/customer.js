$(document).ready(function () {
    new CustomerJs();

})



class CustomerJs extends BaseJs {
    constructor() {
        super();
    }

    setUrl() {
        this.getUrl = 'https://localhost:44308/api/v1/Customers';
    }
}

