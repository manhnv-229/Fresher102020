$(document).ready(function () {
    var employeeJs = new EmployeeJs();
    //dialog chi tiết khách hàng
    dialogDetail = $(".m-dialog").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 800,
        resizable: true,
        modal: true,
        position: ({ my: "center", at: "center", of: window }),
    });

    //dialog cảnh báo khi thực hiện các hành động xóa dữ liệu
    dialogWarning = $(".show-pop-up-warning").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 400,
        resizable: true,
        modal: true,
        position: ({ my: "center", at: "center", of: window }),
    });
})

class EmployeeJs extends Base {
    constructor() {
        super();
        //  this.initEvent();
    }

    setApiRouter() {
        this.apiRouter = '/api/v1/employees';
    }
    setObjName() {
        this.objName = "Employee";
    }
    /**
     * set url lấy dữ liệu
     * CreateBy: HNANH (12/11/2020)
     * */

    

    //initEvent() {
    //    //debugger;
    //    $(".btn-add-labor").click(this.btnAddOnClick);
    //    $(".btn-cancel").click(this.btnCancelOnClick);
    //  //  $(".button-bottom-bar").click(this.btnChangePageOnClick);
    //    $(".button-bottom-bar").focus(this.btnChangePageOnClick);
    //}
    //btnAddOnClick() {
    //    $(".dialog-model").show();
    //    $(".dialog-content").show();
    //}
    //btnCancelOnClick() {
    //    $(".dialog-model").hide();
    //    $(".dialog-content").hide();
    //}
    //btnChangePageOnClick() {
    //    $(this).siblings().removeClass("button-change-page-select");
    //    $(this).addClass("button-change-page-select");
    //}
}