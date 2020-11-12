/// <reference path="../common/common.js" />


$(document).ready(function () {
    getdata();

    $("#show-dialog").click(function () {
        $("#dialog").show();
    });

    $('td').click(function () {
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        console.log(row)
        alert('Row: ' + row + ', Column: ' + col);
    });

    $(".page-table").click(function () {
        $(this).addClass("page-selected");
        $(this).siblings().removeClass("page-selected");
        
    })

    $(".btn-cancel").click(function () {
        $("#dialog").hide();
    })
}) 

/** hàm gọi api trả về dữ liệu rồi đẩy lên table
 * tqhuy 12/11/2020
 * */
function getdata() {
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET",
        dataType: "JSON",
        success: function (reponse) {
            var base = new Base();
            base.getData(reponse);
        },
        error: function (err) {
            alert("Có lỗi! Không thể load được dữ liệu!");
        }
    });
}

