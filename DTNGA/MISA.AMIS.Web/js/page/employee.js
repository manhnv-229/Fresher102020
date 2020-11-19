$(document).ready(function () {
    var employeejs = new EmployeeJS();
})
/**Xử lý các sự kiện liên quan Employee
 * ModifiedBy dtnga (12/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }

    getApiRouter() {
        this.apiRouter = "/api/customers";
    }


}