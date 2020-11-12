/**
 * Hàm format dữ liệu ngày tháng -> ngày/tháng/năm
 * @param {any} date 
 *Created by: HTAnh
 */
function formatDate(date) {
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

/**
 * hàm định dạng tiền tệ
 * Created by: HTAnh
 */
function formatMoney(money) {
    if (money) return num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1.");
    return "";
    
}