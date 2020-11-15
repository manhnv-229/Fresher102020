$(document).ready(function(){
	new EmployeeJS();
})

/**
 * Class quan li cac su kien cho trang employee
 * createdBy : NTDong(12/11/2020)
 */
class EmployeeJS extends BaseJS{
	constructor(){
		// this.loadData();
		super();
	}
	setDataUrl(){
		this.getDataUrl = "http://api.manhnv.net/api/employees";
	}
}
