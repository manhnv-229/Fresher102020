
$(document).ready(function () {
   // loadData();
    var customerJs = new CustomerJs();
    customerJs.loadData();
});

class CustomerJs {
    constructor() {

    }
    loadData() {
        $.ajax({
            url: "http://api.manhnv.net/api/employees",
            method: "GET"
        }).done(function (res) {
            debugger;
            var data = res;
            $.each(data, function (index, item) {
              // var address = item['Address'];
                var trHtml = $(`<tr>
                                    <td>`+ item.EmployeeCode + `</td>
                                    <td>`+ item.FullName + `</td>
                                    <td>`+ item['GenderName'] + `</td>
                                    <td>`+ item['DateOfBirth'] + `</td>
                                    <td>`+ item['PhoneNumber'] + `</td>
                                    <td>`+ item['Email'] + `</td>
                                    <td>`+ item['Salary'] + `</td>
                                    <td><div class="fix-width-table align-salary" title= "`+ item['Address']+`">` + item['Address'] + `</div></td>
                                </tr>`);
                $(".content-table tbody").append(trHtml);
            });
        }).fail(function (reject) {

        })
        
        //$.each(customers, function (index, item) {
        //    var trHtml = $(`<tr>
        //                        <td>`+ item.Index + `</td>
        //                        <td>`+ item.Id + `</td>
        //                        <td>`+ item.Name + `</td>
        //                        <td>`+ item.IdBhxh +`</td>
        //                        <td>`+ item.Gioitinh + `</td>
        //                        <td>`+ item.Position + `</td>
        //                        <td>`+ item.Department +`</td>
        //                        <td>`+ item.Salary + `</td>
        //                        <td>`+ item.State + `</td>
        //                        <td>`+ item.Hospital +`</td>
        //                        <td>`+ item.Address +`</td>
        //                    </tr>`);
        //    $('.content-table tbody').append(trHtml);
        //});
    }
    addData() {

    }
    delete() {

    }
}
//hàm có tham số hay không tham số đều phải comment
/**
 * format dữ liệu ngày tháng sang ngày/tháng/năm
 * @param {any} date tham số có dữ liệu bất kỳ
 * CreatedBy: HNANH (11/11/2020)
 */
function formatDate(date) {

}
/**
 * hàm định dạng hiển thị tiền tệ
 * @param {Number} money số tiền, tham số truyền vào làm number
 * CreatedBy: HNANH (11/11/2020)
 */
function formatMoney(money) {

}
//function loadData() {
//    $.each(customers, function (index, item) {
//        var trHtml = $(`<tr>
//                        <td>` + item.Index + `</td>
//                        <td>` + item.Id + `</td>
//                        <td>` + item.Name + `</td>
//                        <td>` + item.IdBhxh + `</td>
//                        <td>` + item.Gioitinh + `</td>
//                        <td>` + item.Position + `</td>
//                        <td>` + item.Department + `</td>
//                        <td>` + item.Salary + `</td>
//                        <td>` + item.State + `</td>
//                        <td>` + item.Hospital + `</td>
//                        <td>` + item.Address + `</td>
//                    </tr>`);

//        $('.content-table tbody').append(trHtml);
//    });
//    alert('loadDataCustomer');
//}

var customers = [
    {
        Index: 1,
        Id: "MF633",
        Name: "Nguyên Văn A",
        IdBhxh: "9876543210",
        Gioitinh: "Nam",
        Position: "Fresher",
        Department: "Văn phòng Hà Nội",
        Salary: 3200000,
        State: "Đang tham gia",
        Hospital: "Bệnh viện Bạch mai",
        Address: "Hà nội"
    },
    {
        Index: 2,
        Id: "MF633",
        Name: "Nguyên Văn B",
        IdBhxh: "9876543210",
        Gioitinh: "Nam",
        Position: "Fresher",
        Department: "Văn phòng Hà Nội",
        Salary: 3200000,
        State: "Đang tham gia",
        Hospital: "Bệnh viện Bạch mai",
        Address: "Hà nội"
    },
    {
        Index: 3,
        Id: "MF633",
        Name: "Nguyên Văn C",
        IdBhxh: "9876543210",
        Gioitinh: "Nam",
        Position: "Fresher",
        Department: "Văn phòng Hà Nội",
        Salary: 3200000,
        State: "Đang tham gia",
        Hospital: "Bệnh viện Bạch mai",
        Address: "Hà nội"
    },
];