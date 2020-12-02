$(document).ready(function(){
	new EmployeeJS();
	dialogDetail = $(".e-dialog").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 700,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    });
    dialogDelete = $(".d-dialog").dialog({
        autoOpen: false,
        fluid: true,
        // height: 400,
        //width: '700px',
        minWidth: 400,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    })
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
	setApiRouter(){
        this.apiRouter = "/api/v1/employees";
    }
}
