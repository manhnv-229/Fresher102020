$(document).ready(function () {
    new CustomerJs();

})



class CustomerJs extends BaseJs {
    constructor() {
        super();
    }

    setUrl() {
        this.Router = '/api/v1/Employees';
    }
}

