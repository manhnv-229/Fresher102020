$(document).ready(function () {
  new CustomerJS();
});

class CustomerJS extends BaseJS {
  constructor() {
    super()
    this.router = "customers";
    this.loadData();
  }
}