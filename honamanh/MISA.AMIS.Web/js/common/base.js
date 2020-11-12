class Base {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
    }
    setDataUrl() {

    }
    /**Load dữ liệu
     * CreatedBy: HNANH (12/11/2020)
     * */
    loadData() {
        try {
            //lấy thông tin các cột dữ liệu
            var ths = $("table thead th");
            var fieldName = []; /*những biến khi khai báo mà ko sử dụng sẽ tốn bộ nhớ, và sẽ được hiển thị mờ*/
            $.each(ths, function (index, item) {

            });

            var getDataUrl = this.getDataUrl;
            //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
            $.ajax({
                url: getDataUrl,
                method: "GET",
                async: false,
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $.each(ths, function (index, th) {
                        var td = $(`<td></td>`);
                        //var fieldName = $(item).attr("fieldName");
                        //td.append(fieldName);
                        //   tr= $(tr).append(td);
                        var fieldName = $(th).attr("fieldName");
                        var value = obj[fieldName];
                        var formatType = $(th).attr("formatType");
                        switch (formatType) {
                            case "ddmmyyyy":
                                value = formatDate(value);
                                td.addClass("align-center");
                                break;
                            case "money":
                                value = formatMoney(value);
                                td.addClass("align-right");
                                break;
                            case "address":
                                td.addClass("fix-width-table align-salary");
                                $(".fix-width-table").attr("title", value);
                            default:
                        }
                        $(td).append(value);
                        $(tr).append(td);
                    });
                    $("table tbody").append(tr);
                });
            }).fail(function (reject) {

            })
        } catch (e) {
            console.log(e);

        }

    }
}