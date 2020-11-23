$(document).ready(function(){
    var customerjs = new CustomerJS();
})

class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    /** Override lại base method
    * set aip router
    * CreatedBy dtnga (17/11/2020)
    */
    getApiRouter() {
        this.apiRouter= "/api/customers";
    }
    /** Override lại base method
     * set objectnam
     * CreatedBy dtnga (18/11/2020)
     * */
    getObjectName() {
        this.ObjectName = "Customer";
    }

    loadSelect() {
        var me = this;
        //Lấy list nhóm khách hàng từ api
        $.ajax({
            url: me.Host + "/api/customergroups",
            mothod: "GET",
        }).done(function (res) {
            console.log(res);
            // append tên nhóm khách hàng vào option của select
            var select = $(`#CustomerGroup select`);
            var fieldName = select.attr("fieldName");
            $.each(res, function (index, group) {
                var customerGroupName = group[fieldName];
                var option = $(`<option></option>`);
                option.append(customerGroupName);
                //Lưu id customerGroup vào data
                var key = `CustomerGroupId`;
                option.data(key, group[key]);
                select.append(option);
            });
        }).fail(function (res) {
            console.log(res);
        })
        

    }
}