$(document).ready(function () {
  var customer = new CustomerJS();
});

class CustomerJS extends BaseJS {
  constructor() {
    super()
    this.setLinkAPI("http://api.manhnv.net/api/customers");
    this.loadData();
  }
}
