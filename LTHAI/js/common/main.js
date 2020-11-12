$(document).ready(function () {
    loadData();
})
/**
 * Load dữ liệu 
 * CreatedBy: LTHAI (11/11/2020)
 * */
function loadData() {
    
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET",
        error: function (error) {
            alert("Can't get data")
        },
        success: function (data) {
            $.each(data, (function (index, employee) {
                let date = employee['DateOfBirth'];
                date = formatDateOfBirth(date);
                let money = employee['Salary'];
                money = formatMoney(money);
                $("#render-data").append(` <tr>
                     <td>${index}</td>
                     <td>${employee['EmployeeCode']}</td>
                     <td>${employee['FullName']}</td>
                     <td class='text-align-center'>${date}</td>
                     <td>${employee['GenderName']}</td>
                     <td>${employee['PositionName']}</td>
                     <td>${employee['QualificationName']}</td>
                     <td class='text-align-right'>${money}</td>
                     <td><span>${employee['WorkStatusName']}</span></td>
                     <td>${employee['IdentityPlace']}</td>
                     </tr>`)
            }))
        }
    })
}
/**
 * Định dạng ngày tháng theo chuẩn ngày/tháng/năm
 * @param {any} date dữ liệu thời gian 
 * CreatedBy: LTHAI (11/11/2020)
 */
function formatDateOfBirth(date) {
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
/**
 * Định dạng tiền (dạng 2500 => 2.500)
 * @param {any} money dữ liệu số tiền
 *  CreatedBy: LTHAI (11/11/2020)
 */
function formatMoney(money) {
    if (money == null || typeof (money) == "string" || Number.isNaN(money)) {
        return "";
    } else {
        return money.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, '$1.');
    }
    
}