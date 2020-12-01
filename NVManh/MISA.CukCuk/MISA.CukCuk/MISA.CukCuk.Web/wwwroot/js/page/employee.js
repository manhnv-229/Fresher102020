$(document).ready(function () {
    new EmployeeJS();
    dialogDetail = $(".m-dialog").dialog({
        autoOpen: true,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 800,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    });


})


/** **************************************
 * Class quản lý các sự kiện cho trang Employee
 * CreatedBy: NVMANH (12/11/2020)
 * */
class EmployeeJS extends BaseJS{
    constructor() {
        super();
    }

    setApiRouter() {
        this.apiRouter = "/api/v1/employees";
    }

    beforeLoadDataCustom() {
        try {
            //var me = this;
            //// load dữ liệu cho các combobox:
            //var select = $('select#cbxCustomerGroup');
            //select.empty();
          
            //$('.loading').show();
            //$.ajax({
            //    url: me.host + "/api/customergroups",
            //    method: "GET"
            //}).done(function (res) {
            //    if (res) {
            //        console.log(res);
            //        $.each(res, function (index, obj) {
            //            var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
            //            select.append(option);
            //            console.log(option);
            //        })
            //    }
            //    $('.loading').hide();
            //}).fail(function (res) {
            //    $('.loading').hide();
            //})
        } catch (e) {
            console.log(e);
        }
    }
}
$(function () {
    $("#dtDateOfBirth").datepicker({
        showOn: "button",
        buttonImage: "/content/icon/date-picker.svg",
        buttonImageOnly: true,
        buttonText: "Chọn ngày",
        dateFormat:"dd/mm/yy"
    });
});