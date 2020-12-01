


$(document).ready(function () {

    new Employee();
}) 

/**
 * khởi tạo lớp employee kế thừa lớp base
 * createby: tquy(15/11/2020)
 * */
class Employee extends Base {
    constructor() {
        super();
    }

    setUrl() {
        this.getUrl = "/api/v1/employees";
    }
}



