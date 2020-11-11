$(document).ready(function () {
    // loadData();
    var employeeJs = new EmployeeJs();
    employeeJs.loadData();
})
//loadData(2);
//function loadData(msg) {
//    alert(msg);
//}
//function loadData(a) {
//    alert("loadData");
//}
//function loadData(b) {
//    alert("loadData");
//}
//function loadData() {
//    alert("loadData");
//}
//function loadData() {
//$.ajax({
//    url: "http://api.manhnv.net/api/employees",
//    method: "GET",

//}).done(function (res) {
//    var data = res;
//    debugger;
//}).fail(function (reject) {
//});
//var trHtml = $(`<tr>
//                <td>100</td>
//                <td>MF633</td>
//                <td>Nguyên Văn A</td>
//                <td>0123456789</td>
//                <td>Nam</td>
//                <td>Fresher</td>
//                <td>Văn phòng Hà Nội</td>
//                <td>3000000</td>
//                <td>Đang tham gia</td>
//                <td>Bệnh viện Thường Tín</td>
//            </tr>`);

//$.each(employees, function (index, item) {
//    // debugger;
//    var trHtml = $(`<tr>
//                <td>`+ item.Index + `</td>
//                <td>`+ item.Id + `</td>
//                <td>`+ item.Name + `</td>
//                <td>`+ item.IdBhxh + `</td>
//                <td>`+ item.Gioitinh + `</td>
//                <td>`+ item.Position + `</td>
//                <td>`+ item.Department + `</td>
//                <td>`+ item.Salary + `</td>
//                <td>`+ item.State + `</td>
//                <td>`+ item.Hospital +`</td>
//            </tr>`);
//    $('.content-table tbody').append(trHtml);
//});
//for (var i = 0; i < 1000; i++) {
//    var trHtml = $(`<tr>
//                <td>100</td>
//                <td>MF633</td>
//                <td>Nguyên Văn A</td>
//                <td>0123456789</td>
//                <td>Nam</td>
//                <td>Fresher</td>
//                <td>Văn phòng Hà Nội</td>
//                <td>3000000</td>
//                <td>Đang tham gia</td>
//                <td>Bệnh viện Thường Tín</td>
//            </tr>`);
//    $('.content-table tbody').append(trHtml);
//    $('.content-table tbody').prepend(trHtml);
//}
//}
class EmployeeJs {
    constructor() {
        this.loadData(); // phải có this để gọi đến function nội bộ bên trong class, 
        // debugger;
        //loadData();  //nếu ko có this thì nó sẽ gọi đến 1 hàm loadData ở bên ngoài
    }
    loadData() {
        $.ajax({
            url: "http://api.manhnv.net/api/employees",
            method: "GET"
        }).done(function (res) {
            var data = res;
            $.each(data, function (index, item) {
                // debugger;
                var date = item['DateOfBirth'];
                date = formatDate(date);
                var salary = item['Salary'];
                salary = formatMoney(salary);

                var checkbox = `<input type="checkbox"/>`;
                var gender = item["Gender"];
                if (gender > 2) {
                    checkbox = `<input type="checkbox" checked/>`;
                }
                    var trHtml = $(`<tr>
                                    <td>`+ item['EmployeeCode'] + `</td>
                                    <td>`+ item['FullName'] + `</td>
                                    <td class="align-center">`+ checkbox + `</td>
                                    <td class="align-center">`+ date + `</td>
                                    <td>`+ item['PhoneNumber'] + `</td>
                                    <td>`+ item['Email'] + `</td>
                                    <td>`+ item['PositionName'] + `</td>
                                    <td>`+ item['DepartmentName'] + `</td>
                                    <td class="align-right">`+ salary + `</td>
                                    <td>`+ item['Address'] + `</td>
                                    <td>`+ item['WorkStatusName'] + `</td>
                                </tr>`);
                $(".content-table tbody").append(trHtml);
            });
        }).fail(function (reject) {

        })
        //$.each(employees, function (index, item) {
        //    // debugger;
        //    var trHtml = $(`<tr>
        //            <td>`+ item.Index + `</td>
        //            <td>`+ item.Id + `</td>
        //            <td>`+ item.Name + `</td>
        //            <td>`+ item.IdBhxh + `</td>
        //            <td>`+ item.Gioitinh + `</td>
        //            <td>`+ item.Position + `</td>
        //            <td>`+ item.Department + `</td>
        //            <td>`+ item.Salary + `</td>
        //            <td>`+ item.State + `</td>
        //            <td>`+ item.Hospital + `</td>
        //        </tr>`);
        //    $('.content-table tbody').append(trHtml);
        //});
    }
}
/**
 * hàm format ngày tháng về dạng này tháng năm
 * @param {any} date tham số truyền vào là mọi kiểu date, string, number
 * CreateBy: HNANH (12/11/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    return day + '/' + month + '/' + year;
}
/**
 * hàm thay đổi định dạng tiền, chia theo hàng nghìn
 * @param {Number} money tham số truyền vào dạng số
 * CreateBy: HNANH <12/11/2020>
 */
function formatMoney(money) {
    var salary = money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return salary;
}
var employees = [
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
        Hospital: "Bệnh viện Bạch mai"
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
        Hospital: "Bệnh viện Bạch mai"
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
        Hospital: "Bệnh viện Bạch mai"
    },
];
