$(document).ready(function () {
    new CustomerJS();
});

/**
 * Class quản lí các sự kiện cho trang Employee
 * CreatedBy: NTNghia (12/11/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }

}




