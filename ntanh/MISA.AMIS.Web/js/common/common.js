/**--------------------------------------------------
 * Fortmat dữ liệu ngày tháng năm sang ngày/tháng/năm
 * @param {any} date có kiểu dữ liệu bất kỳ
 * @param {string} type có kiểu dữ liệu string
 * CreatedBy: NTANH (12/11/2020)
 */

function formatDate(date, type) {
    var date = new Date(date);
    if (Number.isNaN(date)) {
        return "";
    }
    else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        switch (type) {
            case "table":
                var DOB = day + '/' + month + '/' + year;
                break;
            case "dialog":
                var DOB = year + '-' + month + '-' + day;
                break;
            default:
                var DOB = "";
        }
        return DOB;
    }
}
/**------------------------------
 * Hàm định dạng hiển thị tiền tệ
 * @param {Number} money Số tiền
 * CreatedBy: NTANH (12/11/2020)
 */
function formatMoney(money) {
    if (money) {
        return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return "";
}
/**
 * Hàm định dạng hiển thị giới tính
 * @param {number} genderId
 * CreatedBy: NTANH (19/11/2020)
 */
function formatGender(genderId) {
    if (genderId == 0) {
        return "Nữ";
    }
    else if (genderId == 1) {
        return "Nam"
    }
    else return "Không xác định";
}

function formatPosition(positionId) {
    if (positionId == "3e39129b-279f-623f-88ea-778aee59fea3") {
        return "Giám đốc";
    }
    else {
        return "Nhân viên";
    }
}

function formatDepartment(departmentId) {
    if (departmentId == "3f8e6896-4c7d-15f5-a018-75d8bd200d7c") {
        return "Phòng đào tạo";
    }
    else if (departmentId == "45ac3d26-18f2-18a9-3031-644313fbb055") {
        return "Phòng fresher";
    }
    else if (departmentId == "7c4f14d8-66fb-14ae-198f-6354f958f4c0") {
        return "Phòng họp";
    }
    else return "";
}

function formatWorkStatus(workStatusId) {
    if (workStatusId == 0) {
        return "Đã nghỉ việc";
    }
    else if (workStatusId == 1) {
        return "Đang làm việc";
    }
    else if (workStatusId == 2) {
        return "Đang thử việc";
    }
    else return "";
}
