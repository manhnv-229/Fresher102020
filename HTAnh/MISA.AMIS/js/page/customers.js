$(document).ready(function () {
    new CustomersJS();// khởi tạo  
});

class CustomersJS extends BaseJS {
    constructor() {
        super();
       
    }
   
    setApiRouter() {
        this.apiRouter = "/api/customers";
    }
}