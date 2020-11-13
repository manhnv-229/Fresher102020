$(document).ready(function () {
    new CustomerJs();
})


class CustomerJs extends BaseJs{
    constructor() {
        super();
    }
    setUrl() {
        this.getUrl = 'http://api.manhnv.net/api/customers';
    }
}

