$(document).ready(function () {
    navbarItemSelect();
    footerItemSelect();
});

/**
 * Format dữ liệu giới tính
 * CreatedBy: NTNghia (02/12/2020)
 * @param {any} gender tham số có kiểu dữ liệu bất kì
 */
function formatGender(gender) {
    if (Number.isNaN(gender)) {
        return "";
    } else {
        if (gender == 0)
            return "Nữ";
        else if (gender == 1)
            return "Nam";
        else
            return "Khác";
    }
}

/**
 * Format dữ liệu chức vụ
 * CreatedBy: NTNghia (02/12/2020)
 * @param {any} position
 * @param {any} listPosition
 */
function formatPosition(position, listPosition) {
    var positionName = "";
    listPosition.forEach(function (element) {
        if (String(element['PositionId']) == position)
            positionName = element.PositionName;
    });
    return positionName;
}

/**
 * Format dữ liệu phòng ban
 * CreatedBy: NTNghia (02/12/2020)
 * @param {any} department
 * @param {any} listDepartment
 */
function formatDepartment(department, listDepartment) {
    listDepartment.forEach(function (element) {
        if (String(element['DepartmentId']) == department)
            return element.DepartmentName;
    });
}

/**
 * Format tình trạng tham gia
 * CreatedBy: NTNghia (02/12/2020)
 * @param {any} workStatus tham số có kiểu dữ liệu bất kì
 */
function formatWorkStatus(workStatus) {
    if (Number.isNaN(workStatus)) {
        return "";
    } else {
        if (workStatus == 0)
            return "Đã nghỉ việc";
        else
            return "Đang làm việc";
    }
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

/**
 * Format dữ liệu ngày tháng năm để hiển thị
 * CreatedBy: NTNghia (23/11/2020)
 * @param {any} date tham số có kiểu dữ liệu bất kì
 */
function formatDob(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return year + "-" + month + "-" + day;
    }
}

/**
 * Hàm định dạng hiển thị tiền tệ
 * CreatedBy: NTNghia (11/11/2020)
 * @param {any} money Số tiền
 */
function formatMoney(money) {
    if (money) {
        return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    return "";
}

/**
* Bắt sự kiện chọn tab trên navbar, tab được chọn chuyển màu xanh
* Author:Nguyễn Trung Nghĩa(10/11/2020)
 */
function navbarItemSelect() {
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
}


/**
 * Bắt sự kiện chọn trang ở footer, trang được chọn chuyển màu xanh
 * Author:Nguyễn Trung Nghĩa(10/11/2020)
 */
function footerItemSelect() {
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
}
