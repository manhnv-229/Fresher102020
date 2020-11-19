$(document).ready(function(){
    var customerjs = new CustomerJS();
})

class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    /** Override lại base method
    * set aip router
    * CreatedBy dtnga (17/11/2020)
    */
    getApiRouter() {
        this.apiRouter= "/api/customers";
    }
    /** Override lại base method
     * set objectnam
     * CreatedBy dtnga (18/11/2020)
     * */
    getObjectName() {
        this.ObjectName = "Customer";
    }
}