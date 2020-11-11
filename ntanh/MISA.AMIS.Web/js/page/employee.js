$(document).ready(function () {
    loadData();
})

function loadData() {
    //lay du lieu ve
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET"
    }).done(function (res) {
        var data = res;
        debugger;
    }).fail(function (res) {

    })
    //binding du lieu
}