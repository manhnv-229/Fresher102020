//function loadData(){
//    alert('loadData common');
//}

//hàm có tham số hay không tham số đều phải comment
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
    if (money) {
        var salary = money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        return salary;
    }
    else {
        return "";
    }
}