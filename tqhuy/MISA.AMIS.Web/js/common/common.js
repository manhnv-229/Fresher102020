class Base {
    /** hàm lấy dữ liệu đẩy lên table
     * thHuy 12-11-2020
     * */
    getData() {
        var data = arguments[0];
        var fields = $("[fieldName]");
        $.each(data, function (index, item) {
            var rowtable = $("<tr></tr>");
            $.each(fields, function (i, field) {
                var fieldName = field.getAttribute('fieldName');
                if (fieldName != "index") {
                    rowtable = rowtable.append(`<td>${item[fieldName]}</td>`);
                }
                else {
                    rowtable = rowtable.append(`<td>${index + 1}</td>`);
                }
            });
            $("tbody").append(rowtable);
        });
    }
}