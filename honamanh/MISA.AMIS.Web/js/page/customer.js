
$(document).ready(function () {
   // loadData();
    var customerJs = new CustomerJs();
 //   customerJs.loadData();
});

class CustomerJs extends Base {
    constructor() {
        super();
        // this.name = "HoNamAnh";
        //  this.loadData();
        // debugger;
    }
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
}