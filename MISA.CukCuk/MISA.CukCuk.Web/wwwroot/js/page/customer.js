

$(document).ready(function () {

    new Customer();      
})

/**
 * khởi tạo lớp customer kế thừa lớp base
 * createby: tqhuy(15/11/2020)
 * */
class Customer extends Base {
    constructor() {
        super();
    }

    setUrl() {
        this.getUrl = "/api/v1/customers";
    }
}



