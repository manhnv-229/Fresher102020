class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.setActiveNavBar();
        this.loadData();
    }
    //abtract function được overide để set Url cho hàm ajax
    setDataUrl() {

    };
    //setIDNavBar() {

    //}
    setActiveNavBar() {
        $('.navbar-content').find('' + this.getIDNavBar).addClass("active");
    };

    /**
     * Hàm được dùng để in dữ liệu vào băng
     * CreatedBy TuongNC (12/11/2020)
     * */
    loadData() {
        var thead = $('table thead th');
        var fieldNames = [];
        var getDataUrl = this.getDataUrl;

        $.ajax({
            url: getDataUrl,
            method: "GET",
        }).done(function (res) {
            //lấy thông tin các cột dữ liệu và in từng hàng dữ liệu 
            //vòng lặp 1 là vòng lặp dữ liệu trên service
            //vòng lặp ngoài để map dữ liệu thead vs tbody
            $.each(res, function (index, obj) {
                var tr = $(`<tr></tr>`)
                $.each(thead, function (index, item) {
                    var fieldName = $(item).attr('fieldName');
                    var td = $(`<td><div><span></span></div></td>`);
                    td.append(obj[fieldName]);
                    tr.append(td);
                })
                $("table tbody").append(tr);
            })
        })
    };
    //--------------------------------------------

    
}