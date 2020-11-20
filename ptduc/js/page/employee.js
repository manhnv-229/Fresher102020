$(document).ready(function () {
  var employee = new EmployeeJS();
});

class EmployeeJS extends BaseJS {
  constructor() {
    super();
    this.setLinkAPI("http://api.manhnv.net/api/employees");
    this.loadData();
  }
}
