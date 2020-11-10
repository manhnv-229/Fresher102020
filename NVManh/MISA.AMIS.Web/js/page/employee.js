$(document).ready(function () {
    loadData();
})


function loadData() {
    // Lấy dữ liệu về:
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET",
    }).done(function (res) {
        var data = res;
        debugger;
    }).fail(function (res) {

    })
    // binding dữ liệu lên table:

}