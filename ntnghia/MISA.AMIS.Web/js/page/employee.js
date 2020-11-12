﻿$(document).ready(function () {
    loadData();
});


/**
 * Bắt sự kiện chọn tab trên navbar, tab được chọn chuyển màu xanh
 * Author:Nguyễn Trung Nghĩa(10/11/2020)
 */
var navBar = document.getElementsByClassName("navbar-content")[0];
let navBarChoose = 0;
navBar.children[navBarChoose].style.backgroundColor = "#019160";
navBar.children[navBarChoose].style.color = "#fff";
for (let i = 0; i < navBar.childElementCount; i++) {
    navBar.children[i].addEventListener("click", () => {
        navBar.children[navBarChoose].style.backgroundColor = "transparent";
        navBar.children[navBarChoose].style.color = "#000";
        navBarChoose = i;
        navBar.children[i].style.backgroundColor = "#019160";
        navBar.children[i].style.color = "#fff";
    });
}

/**
 * Bắt sự kiện chọn trang ở footer, trang được chọn chuyển màu xanh
 * Author:Nguyễn Trung Nghĩa(10/11/2020)
 */
var pageBar = document.getElementsByClassName("page-number-container")[0];
let pageBarChoose = 0;
pageBar.children[pageBarChoose].style.backgroundColor = "#019160";
pageBar.children[pageBarChoose].style.color = "#fff";
for (let i = 0; i < pageBar.childElementCount; i++) {
    pageBar.children[i].addEventListener("click", () => {
        pageBar.children[pageBarChoose].style.backgroundColor = "transparent";
        pageBar.children[pageBarChoose].style.color = "#000";
        pageBarChoose = i;
        pageBar.children[i].style.backgroundColor = "#019160";
        pageBar.children[i].style.color = "#fff";
    });
}

/*
 * Load dữ liệu
 * Author: NTNghia (09/11/2020)
 */
function loadData() {
    // Lấy dữ liệu
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET"
    }).done(function (res) {
        var data = res;
        $.each(data, function (index, item) {
            var dateOfBirth = formatDate(item["DateOfBirth"]);

            //Binding dữ liệu lên UI
            var trHTML = $(`<tr class="table-item">
            <td>`+ item["EmployeeCode"] + `</td>
            <td>`+ item["FullName"] + `</td>
            <td>`+ item["GenderName"] + `</td>
            <td>`+ dateOfBirth + `</td>
            <td>`+ item["PhoneNumber"] + `</td>
            <td>`+ item["Email"] + `</td>
            <td>`+ item["PositionName"] + `</td>
            <td>`+ item["DepartmentName"] + `</td>
            <td class="table-item-salary">`+ item["Salary"].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + `</td>
            <td class="table-item-address">`+ item["Address"] + `</td>
            <td>`+ item["WorkStatusName"] + `</td>
                </tr >`);

            $("#tableData tbody").append(trHTML);

        })
    }).fail(function (res) {

    })
}

/**
 * Format dữ liệu ngày tháng sang ngày/tháng/năm
 * CreatedBy: NTNghia (11/11/2020)
 * @param {any} date tham số có kiểu dữ liệu bất kì
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return day + '/' + month + '/' + year;
    }
}
