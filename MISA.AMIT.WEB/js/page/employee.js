$(document).ready(function () {
    new EmployeeJS();
})

/**
 * class quan li cac su kien cho EmployeJS
 * created by: dvquang(12/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {

        super();
    }

    /**
    * ghi de set url cho EmployeeJS
    * createdby: dvquang(13/11/2020)
    * */
    setDataUrl() {
        this.getDataUrl = 'http://api.manhnv.net/api/employees';
    }
}

