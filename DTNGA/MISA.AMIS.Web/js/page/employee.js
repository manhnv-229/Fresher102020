$(document).ready(function () {
    employeejs = new employeejs();
})
class employeejs {
    constructor() {
        try {
            var me = this;
            me.loadData();

        } catch (e) {
            console.log(e);
        }
    }

    loadData() {
        try {
            $('table#tbListEmployee tbody').empty();
            for (var i = 1; i <= 50; i++) {
                var sortId = i.toString();
                var employeeId = "NV";
                if (i < 10) {
                    employeeId += "000" + sortId;
                }
                else if (i < 100)
                    employeeId += "00" + sortId;
                else if (i < 1000)
                    employeeId += "0" + sortId;
                else
                    employeeId += sortId;
                var trData = '<tr>'
                    + '<td style="text-align : left">' + sortId + '</td>'
                    + '<td>' + employeeId + '</td>'
                    + '<td> Đặng Thị Nga </td>'
                    + '<td> 123456789 </td>'
                    + '<td> Nữ </td>'
                    + '<td> Nhân viên </td>'
                    + '<td> Văn phòng Hà Nội </td>'
                    + '<td class="text-align-right"> 5000000 </td>'
                    + '<td> Đang tham gia </td>'
                    + '<td> Bệnh viện đa khoa Hà Đông </td>'
                    + '</tr>';
                $('table#tbListEmployee tbody').append(trData);
            }
            var start = 1;
            var end = 15;
            var total = 59;
            $('.paging-left').val = "Hiển thị " + start + " - " + end + "/" + total + " lao động";


        } catch (e) {
            console.log(e);
        }
    }
}