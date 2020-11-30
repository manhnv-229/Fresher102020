$(document).ready(function () {
    var employeeJs = new EmployeeJs();

})

class EmployeeJs extends Base {
    constructor() {
        super();
        //  this.initEvent();
    }

    setApiRouter() {
        this.apiRouter = '/api/employees';
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