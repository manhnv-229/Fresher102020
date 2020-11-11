$(document).ready(function () {
    loadData();
})

function loadData(msg) {   
    $.each(data, function (idex, item){
        var trHtml = $(`<tr>
                    <td>`+ item.employee +`</td>
                    <td>`+ item.name +`</td>
                    <td>`+ item.code +`</td>
                    <td>`+ item.sex +`</td>
                    <td>`+ item.position +`</td>
                    <td>`+ item.Department +`</td>
                    <td>`+ item.Salary +`</td>
                    <td>`+ item.state +`</td>
                    <td>`+ item.hospital +`</td>
                </tr>`);
        $('.grid-content tbody').append(trHtml);
    });
}
data = [
    {
        'employee': 'NV01',
        'name': 'Trần Hoài Nhật',
        'code': '187691578',
        'sex': 'Nam',
        'position': 'Owner',
        'Department': 'CEO',
        'Salary': '2m',
        'state': 'Đang tham gia',
        'hospital': 'LA Hospital',
    },
    {
        'employee': 'NV02',
        'name': 'Trần Hoài Nam',
        'code': '187691578',
        'sex': 'Nam',
        'position': 'Owner',
        'Department': 'CEO',
        'Salary': '2m',
        'state': 'Đang tham gia',
        'hospital': 'LA Hospital',
    },
    {
        'employee': 'NV03',
        'name': 'Nguyễn Thị Kim Anh',
        'code': '187691578',
        'sex': 'Nam',
        'position': 'Owner',
        'Department': 'CEO',
        'Salary': '2m',
        'state': 'Đang tham gia',
        'hospital': 'LA Hospital',
    },
    {
        'employee': 'NV04',
        'name': 'Trần Hoài An',
        'code': '187691578',
        'sex': 'Nam',
        'position': 'Owner',
        'Department': 'CEO',
        'Salary': '2m',
        'state': 'Đang tham gia',
        'hospital': 'LA Hospital',
    },
]