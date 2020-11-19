$(document).ready(function () {
    new CustomersJS();// khởi tạo  
});

class CustomersJS extends BaseJS {
    constructor() {
        super();
       
    }
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
    setApiRouter() {
        this.apiRouter = "/api/customers";
    }
}