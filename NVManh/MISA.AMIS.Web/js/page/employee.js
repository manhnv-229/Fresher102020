$(document).ready(function () {
    new EmployeeJS();
})


/** **************************************
 * Class quản lý các sự kiện cho trang Employee
 * CreatedBy: NVMANH (12/11/2020)
 * */
class EmployeeJS extends BaseJS{
    constructor() {
        //this.loadData();
        super();
    }


    setApiRouter() {
        this.apiRouter = "/api/employees";
    }


    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }
    /** ------------------------------
    * Load dữ liệu
    * CreatedBy: NVMANH (11/11/2020)
    * */
    //loadData() {
    //    // Lấy dữ liệu về:
    //    $.ajax({
    //        url: "http://api.manhnv.net/api/employees",
    //        method: "GET",
    //    }).done(function (res) {
    //        var data = res;
    //        $.each(data, function (index, item) {
    //            var dateOfBirth = item["DateOfBirth"];
    //            var salary = item.Salary;
    //            salary = formatMoney(salary);
    //            dateOfBirth = formatDate(dateOfBirth);
    //            var checkbox = `<input type="checkbox"/>`;
    //            if (item.Gender > 0) {
    //                var checkbox = `<input type="checkbox" checked/>`;
    //            }
    //            var tr = $(`<tr>
    //                    <td><div><span>`+ item.EmployeeCode + `</span></div></td>
    //                    <td><div><span>`+ item['FullName'] + `</span></div></td>
    //                    <td><div class="text-align-center">`+ checkbox + `</div></td>
    //                    <td><div><span>`+ dateOfBirth + `</span></div></td>
    //                    <td><div><span>`+ item['PhoneNumber'] + `</span></div></td>
    //                    <td><div><span>`+ item['Email'] + `</span></div></td>
    //                    <td><div><span>`+ item['PositionName'] + `</span></div></td>
    //                    <td><div><span>`+ item['DepartmentName'] + `</span></div></td>
    //                    <td><div class="text-align-right"><span>`+ salary + `</span></div></td>
    //                    <td><div style="max-width:250px" title="`+ item['Address'] + `"><span>` + item['Address'] + `</span></div></td>
    //                    <td><div><span>`+ item['WorkStatusName'] + `</span></div></td>
    //                </tr>`);
    //            $('table tbody').append(tr);
    //        })
    //    }).fail(function (res) {

    //    })
    //}

    /** ------------------------------
    * Thêm mới dữ liệu
    * CreatedBy: NVMANH (11/11/2020)
    * */
    add() {

    }

    /** ------------------------------
    * Sửa dữ liệu
    * CreatedBy: NVMANH (11/11/2020)
    * */
    edit() {

    }

    /** ------------------------------
    * Xóa dữ liệu
    * CreatedBy: NVMANH (11/11/2020)
    * */
    delete() {

    }

}
